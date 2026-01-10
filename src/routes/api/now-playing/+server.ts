import { json, type RequestHandler } from '@sveltejs/kit';
import placeholder from "$lib/assets/nocover.png"
import type { TrackInfo } from '$lib';
import { LASTFM_API_KEY, LASTFM_USERNAME } from "$env/static/private"

type T_iTunesResponse = {
    artistName: string;
    collectionName: string;
    trackName: string;
    trackViewUrl: string;
    artworkUrl100: string;
};
type TDeezerResponse = {
    data: {
        title: string,
        link: string,
        artist: {
            name: string
        },
        album: {
            title: string,
            cover_xl?: string
            cover_big?: string
            cover_medium?: string
        }
    }[]
}

const CACHE_TTL = 20_000;
let lastFetchTime = 0;
let cachedTrack: TrackInfo = null;

const normalize = (str: string): string => {
    return str
        .normalize('NFD')
        .replace(/[\u2010-\u2015−⸺⸻﹘－]/g, "-")
        .replace(/[〜〰～]/g, "~")
        .replace(/[‘’‚‛`´]/g, "'")
        .replace(/[“”„‟‹›«»]/g, '"')
        .replace(/[❨﴾〈《（]/g, "(")
        .replace(/[❩﴿〉》）]/g, ")")
        .replace(/[〔［【〚「{]/g, "[")
        .replace(/[〕］】〛」}]/g, "]")
        .replace(/[•∙●◦▪⦁]/g, "*")
        .replace(/\s+/g, ' ')
        .trim();
};

const extractName = (str: string): [string, string | undefined] => {
    const norm = normalize(str.replace(/^\d+(?:\.|:) ?/, ""))
    // stuff that gets here is probably a regular video with the title "artist name - song name"
    let maybeArtistName = norm.replace(/[[(].+?[\])]/g, "").match(/^(.+?)\s-\s/)?.[1]
    if (maybeArtistName) maybeArtistName = maybeArtistName
        .replace(/\sfeat\.?/gi, ",")
        .replace(/\s&/g, ",")
        .replace(/\s\+/g, ",")
        .replace(/\svs\.?/gi, ",")
        .split(",")[0]

    return [normalize(str)
        .replace(/\(.+?\)/g, "")
        .replace(/\[.+?\]/g, "")
        .replace(/-.+?-/g, "")
        .replace(/^.+?\s-\s/, "")
        .replace(/\s+/, " ")
        .replace(/(?:official )?(?:lyrics|music video)/gi, "")
        .trim(), maybeArtistName]
}

const similarityScore = (str1: string, str2: string): number => {
    const norm1 = str1.replace(/[[\]()!@#$^&*{}"'?,.<>;:/\\-]/g, "").replace(/\s+/g, ' ')
    const norm2 = str2.replace(/[[\]()!@#$^&*{}"'?,.<>;:/\\-]/g, "").replace(/\s+/g, ' ')
    if (norm1 === norm2) return 1;

    const words1 = [...new Set(norm1.split(' ').filter(w => w.length > 2 && w !== "remix"))];
    const words2 = [...new Set(norm2.split(' ').filter(w => w.length > 2 && w !== "remix"))];
    if (words1.length === 0 || words2.length === 0) return 0;

    const commonWords = words1.filter(word => words2.includes(word));
    const similarity = commonWords.length / Math.max(words1.length, words2.length);
    return similarity;
};

function findBestMatch(partialTrack: Exclude<Exclude<TrackInfo, null>, false>, response: T_iTunesResponse[], stricter = false): T_iTunesResponse | null {
    if (!response || response.length === 0) {
        return null;
    }

    const searchArtist = normalize(partialTrack.artistName).toLowerCase();
    const searchTrack = normalize(partialTrack.songName).toLowerCase();
    const searchAlbum = normalize(partialTrack.albumName).toLowerCase();

    const curveballs = [] as [number, T_iTunesResponse][]
    for (const result of response) {
        const resultArtist = normalize(result.artistName).toLowerCase();
        const resultTrack = normalize(result.trackName).toLowerCase();
        const resultAlbum = normalize(result.collectionName).toLowerCase();

        const artistMatch = similarityScore(searchArtist, resultArtist) >= (stricter ? 0.6 : 0.5) || resultArtist.includes(searchArtist);
        const trackMatch = similarityScore(searchTrack, resultTrack) >= (stricter ? 0.7 : 0.6);
        const albumMatch = searchAlbum && resultAlbum ?
            similarityScore(searchAlbum, resultAlbum) >= 0.5 : false;

        if (artistMatch && (trackMatch || albumMatch)) {
            return result;
        }

        const resultArtistAndTrack = normalize(`${result.artistName} ${result.trackName}`).toLowerCase()
        const moreNormalizedSearchTrack = searchTrack
            .replace(/([^\s])([([])/g, "$1 $2")
            .replace(/[([]/g, "")
            .replace(/[)\]]/g, " ")
            .replace(/([.,:;])[^\s]/g, "$1 ")
            .replace(/\s+/g, ' ')
        const score = similarityScore(resultArtistAndTrack, moreNormalizedSearchTrack)
        if (score >= Math.min((stricter ? 0.65 : 0.5) + response.length * 0.03, (stricter ? 0.75 : 0.85))) {
            curveballs.push([score, result])
        }
    }

    if (curveballs.length) {
        return curveballs.sort((a, b) => b[0] - a[0])[0][1]
    }
    return null;
}

const selectBestMatch = (candidates: T_iTunesResponse[], partialTrack: Exclude<Exclude<TrackInfo, null>, false>, hasAlbum: boolean): T_iTunesResponse | null => {
    const exactMatches = candidates.filter(
        res => res.trackName.toLowerCase() === partialTrack.songName.toLowerCase()
    )
    const exactMatchesWithArtist = exactMatches.filter(res =>
        similarityScore(res.artistName, partialTrack.artistName) >= 0.7
    )
    if (exactMatchesWithArtist.length === 1) {
        return exactMatchesWithArtist[0]
    } else {
        return findBestMatch(partialTrack, candidates, hasAlbum)
    }
}

const mapDeezerToItunes = (deezerTracks: TDeezerResponse['data']): T_iTunesResponse[] => {
    return deezerTracks.map(t => ({
        artistName: t.artist.name,
        collectionName: t.album.title,
        trackName: t.title,
        trackViewUrl: t.link,
        artworkUrl100: t.album.cover_xl || t.album.cover_big || t.album.cover_medium || ""
    }))
}

export const GET: RequestHandler = async () => {
    const now = Date.now();

    if (cachedTrack !== null && now - lastFetchTime < CACHE_TTL) {
        return json({ track: cachedTrack });
    }

    try {
        const lastfmData = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&limit=1&format=json`
        ).then(r => r.json());

        const lastFmTrack = lastfmData.recenttracks?.track?.[0];
        if (!lastFmTrack || lastFmTrack["@attr"]?.nowplaying !== "true") {
            cachedTrack = false;
            lastFetchTime = now;
            return json({ track: false });
        }

        const coverArt = lastFmTrack.image?.at(-1)["#text"] || placeholder
        const partialTrack: TrackInfo = {
            songName: lastFmTrack.name,
            artistName: lastFmTrack.artist["#text"],
            albumName: lastFmTrack.album["#text"] === lastFmTrack.name ? "" : lastFmTrack.album["#text"],
            cover: coverArt?.includes("2a96cbd8b46e442fc41c2b86b821562f") ? placeholder : coverArt,
        };

        const performSearch = async (searchTerm: string) => {
            const encodedTerm = encodeURIComponent(normalize(searchTerm));
            const [itunesRes, deezerRes] = await Promise.all([
                fetch(`https://itunes.apple.com/search?entity=song&term=${encodedTerm}`).then(r => r.json()).catch(() => ({})),
                fetch(`https://api.deezer.com/search?q=${encodedTerm}`).then(r => r.json()).catch(() => ({}))
            ]);

            const itunesCandidates = (itunesRes.results || []) as T_iTunesResponse[];
            const deezerCandidates = mapDeezerToItunes((deezerRes as TDeezerResponse).data || []);

            const hasAlbum = !!lastFmTrack.album["#text"];
            const itunesMatch = selectBestMatch(itunesCandidates, partialTrack, hasAlbum);
            const deezerMatch = selectBestMatch(deezerCandidates, partialTrack, hasAlbum);

            return { itunesMatch, deezerMatch };
        };

        const initialQuery = `${partialTrack.artistName} ${partialTrack.songName.replace(/\(feat\..+?\)$/, "")}`;
        let matches = await performSearch(initialQuery);
        if (!matches.itunesMatch && !matches.deezerMatch) {
            const [extractedName, possiblyArtist] = extractName(partialTrack.songName);
            if (extractedName) {
                const extractedQuery = possiblyArtist ? `${possiblyArtist} ${extractedName}` : extractedName;
                matches = await performSearch(extractedQuery);
            }
        }

        const track = matches.deezerMatch || matches.itunesMatch;
        if (!track) {
            cachedTrack = { ...partialTrack, link: undefined };
            lastFetchTime = now;
            return json({ track: cachedTrack });
        }

        const albumName = track.collectionName.replace(/ - (?:Single|EP)$/, "")
        const finalTrack: TrackInfo = {
            songName: track.trackName,
            artistName: track.artistName,
            albumName: albumName === track.trackName ? "" : albumName,
            cover: partialTrack.cover
                && partialTrack.cover !== placeholder
                && !partialTrack.cover.includes("2a96cbd8b46e442fc41c2b86b821562f")
                ? partialTrack.cover
                : track.artworkUrl100,
            link: track.trackViewUrl
        };

        cachedTrack = finalTrack;
        lastFetchTime = now;

        return json({ track: finalTrack });

    } catch (e) {
        console.error(e);
        return json({ track: null })
    }
};
