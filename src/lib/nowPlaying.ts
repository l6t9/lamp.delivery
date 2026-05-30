import placeholder from './assets/placeholder.png';

export type TrackInfo =
    | {
        songName: string;
        artistName: string;
        albumName: string;
        cover: string;
        link?: string;
        isNowPlaying?: boolean;
        playedAt?: string;
        from?: number;
        to?: number | null;
        duration?: number;
    }
    | false
    | null;

type ItunesResponse = {
    artistName: string;
    collectionName: string;
    trackName: string;
    trackViewUrl: string;
    artworkUrl100: string;
};

type DeezerResponse = {
    data: {
        title: string;
        link: string;
        artist: { name: string };
        album: {
            title: string;
            cover_xl?: string;
            cover_big?: string;
            cover_medium?: string;
        };
    }[];
};

const CACHE_TTL = 20_000;
let lastFetchTime = 0;
let cachedTrack: TrackInfo = null;

const normalize = (value: string): string =>
    value
        .normalize('NFD')
        .replace(/[\u2010-\u2015−⸺⸻﹘－]/g, '-')
        .replace(/[〜〰～]/g, '~')
        .replace(/[‘’‚‛`´]/g, "'")
        .replace(/[“”„‟‹›«»]/g, '"')
        .replace(/[❨﴾〈《（]/g, '(')
        .replace(/[❩﴿〉》）]/g, ')')
        .replace(/[〔［【〚「{]/g, '[')
        .replace(/[〕］】〛」}]/g, ']')
        .replace(/[•∙●◦▪⦁]/g, '*')
        .replace(/\s+/g, ' ')
        .trim();

const extractName = (value: string): [string, string | undefined] => {
    const normalized = normalize(value.replace(/^\d+(?:\.|:) ?/, ''));
    let maybeArtistName = normalized.replace(/[[(].+?[\])]/g, '').match(/^(.+?)\s-\s/)?.[1];

    if (maybeArtistName) {
        maybeArtistName = maybeArtistName
            .replace(/\sfeat\.?/gi, ',')
            .replace(/\s&/g, ',')
            .replace(/\s\+/g, ',')
            .replace(/\svs\.?/gi, ',')
            .split(',')[0];
    }

    return [
        normalize(value)
            .replace(/\(.+?\)/g, '')
            .replace(/\[.+?\]/g, '')
            .replace(/-.+?-/, '')
            .replace(/^.+?\s-\s/, '')
            .replace(/\s+/, ' ')
            .replace(/(?:official )?(?:lyrics|music video)/gi, '')
            .trim(),
        maybeArtistName
    ];
};

const similarityScore = (first: string, second: string): number => {
    const normalizedFirst = first.replace(/[[\]()!@#$^&*{}"'?,.<>;:/\\-]/g, '').replace(/\s+/g, ' ');
    const normalizedSecond = second.replace(/[[\]()!@#$^&*{}"'?,.<>;:/\\-]/g, '').replace(/\s+/g, ' ');

    if (normalizedFirst === normalizedSecond) {
        return 1;
    }

    const wordsFirst = [...new Set(normalizedFirst.split(' ').filter((word) => word.length > 2 && word !== 'remix'))];
    const wordsSecond = [...new Set(normalizedSecond.split(' ').filter((word) => word.length > 2 && word !== 'remix'))];

    if (wordsFirst.length === 0 || wordsSecond.length === 0) {
        return 0;
    }

    const commonWords = wordsFirst.filter((word) => wordsSecond.includes(word));
    return commonWords.length / Math.max(wordsFirst.length, wordsSecond.length);
};

function findBestMatch(
    partialTrack: Exclude<Exclude<TrackInfo, null>, false>,
    response: ItunesResponse[],
    stricter = false
): ItunesResponse | null {
    if (!response || response.length === 0) {
        return null;
    }

    const searchArtist = normalize(partialTrack.artistName).toLowerCase();
    const searchTrack = normalize(partialTrack.songName).toLowerCase();
    const searchAlbum = normalize(partialTrack.albumName).toLowerCase();

    const curveballs: [number, ItunesResponse][] = [];

    for (const result of response) {
        const resultArtist = normalize(result.artistName).toLowerCase();
        const resultTrack = normalize(result.trackName).toLowerCase();
        const resultAlbum = normalize(result.collectionName).toLowerCase();

        const artistMatch = similarityScore(searchArtist, resultArtist) >= (stricter ? 0.6 : 0.5) || resultArtist.includes(searchArtist);
        const trackMatch = similarityScore(searchTrack, resultTrack) >= (stricter ? 0.7 : 0.6);
        const albumMatch = searchAlbum && resultAlbum ? similarityScore(searchAlbum, resultAlbum) >= 0.5 : false;

        if (artistMatch && (trackMatch || albumMatch)) {
            return result;
        }

        const resultArtistAndTrack = normalize(`${result.artistName} ${result.trackName}`).toLowerCase();
        const moreNormalizedSearchTrack = searchTrack
            .replace(/([^\s])([([])/g, '$1 $2')
            .replace(/[([]/g, '')
            .replace(/[)\]]/g, ' ')
            .replace(/([.,:;])[^\s]/g, '$1 ')
            .replace(/\s+/g, ' ');

        const score = similarityScore(resultArtistAndTrack, moreNormalizedSearchTrack);

        if (score >= Math.min((stricter ? 0.65 : 0.5) + response.length * 0.03, stricter ? 0.75 : 0.85)) {
            curveballs.push([score, result]);
        }
    }

    if (curveballs.length) {
        return curveballs.sort((first, second) => second[0] - first[0])[0][1];
    }

    return null;
}

const selectBestMatch = (
    candidates: ItunesResponse[],
    partialTrack: Exclude<Exclude<TrackInfo, null>, false>,
    hasAlbum: boolean
): ItunesResponse | null => {
    const exactMatches = candidates.filter((result) => result.trackName.toLowerCase() === partialTrack.songName.toLowerCase());
    const exactMatchesWithArtist = exactMatches.filter((result) => similarityScore(result.artistName, partialTrack.artistName) >= 0.7);

    if (exactMatchesWithArtist.length === 1) {
        return exactMatchesWithArtist[0];
    }

    return findBestMatch(partialTrack, candidates, hasAlbum);
};

const mapDeezerToItunes = (tracks: DeezerResponse['data']): ItunesResponse[] =>
    tracks.map((track) => ({
        artistName: track.artist.name,
        collectionName: track.album.title,
        trackName: track.title,
        trackViewUrl: track.link,
        artworkUrl100: track.album.cover_xl || track.album.cover_big || track.album.cover_medium || ''
    }));

export async function getNowPlaying(): Promise<TrackInfo> {
    const apiKey = import.meta.env.LASTFM_API_KEY || process.env.LASTFM_API_KEY;
    const username = import.meta.env.LASTFM_USERNAME || process.env.LASTFM_USERNAME;

    if (!apiKey || !username) {
        return null;
    }

    const now = Date.now();

    if (cachedTrack !== null && now - lastFetchTime < CACHE_TTL) {
        return cachedTrack;
    }

    try {
        const lastfmData = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&limit=1&format=json`
        ).then((response) => response.json());

        const lastFmTrack = lastfmData.recenttracks?.track?.[0];

        if (!lastFmTrack) {
            cachedTrack = false;
            lastFetchTime = now;
            return false;
        }

        const coverArt = lastFmTrack.image?.at(-1)?.['#text'] || placeholder.src;
        const partialTrackBase = {
            songName: lastFmTrack.name,
            artistName: lastFmTrack.artist['#text'],
            albumName: lastFmTrack.album['#text'] === lastFmTrack.name ? '' : lastFmTrack.album['#text'],
            cover: coverArt?.includes('2a96cbd8b46e442fc41c2b86b821562f') ? placeholder.src : coverArt
        };

        const isNowPlaying = lastFmTrack['@attr']?.nowplaying === 'true';

        // timestamps (seconds)
        const fromTs = lastFmTrack.date?.uts ? parseInt(lastFmTrack.date.uts, 10) : Math.floor(Date.now() / 1000);
        let durationSec: number | undefined = undefined;
        let endTime: number | null = null;

        if (isNowPlaying) {
            try {
                const infoParams = new URLSearchParams({
                    method: 'track.getInfo',
                    track: partialTrackBase.songName,
                    artist: partialTrackBase.artistName,
                    api_key: apiKey,
                    format: 'json'
                });

                const infoRes = await fetch(`https://ws.audioscrobbler.com/2.0/?${infoParams}`).then(r => r.json()).catch(() => null);

                if (infoRes?.track?.duration) {
                    const ms = parseInt(infoRes.track.duration, 10);
                    if (!Number.isNaN(ms) && ms > 0) {
                        durationSec = Math.floor(ms / 1000);
                        endTime = fromTs + durationSec;
                    }
                }
            } catch (e) {
                // ignore and proceed without duration
            }
        }

        const performSearch = async (searchTerm: string) => {
            const encodedTerm = encodeURIComponent(normalize(searchTerm));

            const [itunesRes, deezerRes] = await Promise.all([
                fetch(`https://itunes.apple.com/search?entity=song&term=${encodedTerm}`).then((response) => response.json()).catch(() => ({})),
                fetch(`https://api.deezer.com/search?q=${encodedTerm}`).then((response) => response.json()).catch(() => ({}))
            ]);

            const itunesCandidates = (itunesRes.results || []) as ItunesResponse[];
            const deezerCandidates = mapDeezerToItunes((deezerRes as DeezerResponse).data || []);

            const hasAlbum = !!lastFmTrack.album['#text'];
            const itunesMatch = selectBestMatch(itunesCandidates, partialTrackBase as any, hasAlbum);
            const deezerMatch = selectBestMatch(deezerCandidates, partialTrackBase as any, hasAlbum);

            return { itunesMatch, deezerMatch };
        };

        const initialQuery = `${partialTrackBase.artistName} ${partialTrackBase.songName.replace(/\(feat\..+?\)$/, '')}`;
        let matches = await performSearch(initialQuery);

        if (!matches.itunesMatch && !matches.deezerMatch) {
            const [extractedName, possiblyArtist] = extractName(partialTrackBase.songName);

            if (extractedName) {
                const extractedQuery = possiblyArtist ? `${possiblyArtist} ${extractedName}` : extractedName;
                matches = await performSearch(extractedQuery);
            }
        }

        const track = matches.deezerMatch || matches.itunesMatch;

        if (!track) {
            const fallback: TrackInfo = { ...partialTrackBase, link: undefined, isNowPlaying, from: fromTs, to: endTime, duration: durationSec };
            cachedTrack = fallback;
            lastFetchTime = now;
            return fallback;
        }

        const albumName = track.collectionName.replace(/ - (?:Single|EP)$/, '');
        const finalTrack: TrackInfo = {
            songName: track.trackName,
            artistName: track.artistName,
            albumName: albumName === track.trackName ? '' : albumName,
            cover:
                partialTrackBase.cover &&
                    partialTrackBase.cover !== placeholder.src &&
                    !partialTrackBase.cover.includes('2a96cbd8b46e442fc41c2b86b821562f')
                    ? partialTrackBase.cover
                    : track.artworkUrl100,
            link: track.trackViewUrl,
            isNowPlaying
        };

        // include time info if available
        finalTrack.from = fromTs;
        finalTrack.duration = durationSec ?? finalTrack.duration;
        finalTrack.to = endTime;

        // include played time if available
        if (lastFmTrack.date?.uts) {
            finalTrack.playedAt = new Date(parseInt(lastFmTrack.date.uts, 10) * 1000).toISOString();
        }

        cachedTrack = finalTrack;
        lastFetchTime = now;

        return finalTrack;
    } catch (error) {
        console.error(error);
        return null;
    }
}