import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

const LASTFM_API_BASE = "https://ws.audioscrobbler.com/2.0";

function getLastfmApiKey(): string | null {
  const apiKey = process.env.LASTFM_API_KEY;
  if (!apiKey) {
    console.warn("Last.fm API key not configured - image fetching will be disabled");
  }
  return apiKey || null;
}

async function getArtistFromLastfm(artistName: string) {
  try {
    const apiKey = getLastfmApiKey();

    // If no API key available, return basic data without images
    if (!apiKey) {
      return {
        name: artistName,
        imageUrl: null,
        spotifyUrl: null,
        followers: 0,
        genres: [],
      };
    }

    const response = await axios.get(LASTFM_API_BASE, {
      params: {
        method: "artist.getinfo",
        artist: artistName,
        api_key: apiKey,
        format: "json",
      },
    });

    if (response.data.error || !response.data.artist) {
      return {
        name: artistName,
        imageUrl: null,
        spotifyUrl: null,
        followers: 0,
        genres: [],
      };
    }

    const artist = response.data.artist;
    const imageUrl =
      artist.image?.find((img: any) => img.size === "large")?.["#text"] ||
      artist.image?.[artist.image.length - 1]?.["#text"] ||
      null;

    return {
      name: artist.name,
      imageUrl: imageUrl,
      spotifyUrl: artist.url || null,
      followers: parseInt(artist.stats?.listeners || "0", 10),
      genres: artist.tags?.tag?.slice(0, 5).map((t: any) => t.name) || [],
    };
  } catch (error) {
    console.error(`Error fetching Last.fm data for ${artistName}:`, error);
    return {
      name: artistName,
      imageUrl: null,
      spotifyUrl: null,
      followers: 0,
      genres: [],
    };
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.get("/api/artists/:name", async (req, res) => {
    try {
      const artistName = decodeURIComponent(req.params.name);
      const artistData = await getArtistFromLastfm(artistName);

      if (!artistData) {
        return res.status(404).json({ error: "Artist not found" });
      }

      res.json(artistData);
    } catch (error) {
      console.error("Error in /api/artists route:", error);
      res.status(500).json({ error: "Failed to fetch artist data" });
    }
  });

  app.get("/api/search-track", async (req, res) => {
    try {
      const { title, artist } = req.query;

      if (!title || !artist) {
        return res.status(400).json({ error: "Title and artist are required" });
      }

      const apiKey = getLastfmApiKey();

      // If no API key available, return basic track data
      if (!apiKey) {
        const youtubeSearchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`;
        return res.json({
          name: title,
          artist: artist,
          previewUrl: null,
          spotifyUrl: null,
          youtubeUrl: youtubeSearchUrl,
          albumArt: null,
          duration: 0,
        });
      }

      const searchResponse = await axios.get(LASTFM_API_BASE, {
        params: {
          method: "track.getinfo",
          artist: artist,
          track: title,
          api_key: apiKey,
          format: "json",
        },
      });

      if (searchResponse.data.error || !searchResponse.data.track) {
        const youtubeSearchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`;
        return res.json({
          name: title,
          artist: artist,
          previewUrl: null,
          spotifyUrl: null,
          youtubeUrl: youtubeSearchUrl,
          albumArt: null,
          duration: 0,
        });
      }

      const track = searchResponse.data.track;
      const imageUrl =
        track.album?.image?.find((img: any) => img.size === "large")?.["#text"] ||
        track.album?.image?.[track.album.image.length - 1]?.["#text"] ||
        null;
      const youtubeSearchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${track.name} ${track.artist?.name || artist}`)}`;

      res.json({
        name: track.name,
        artist: track.artist?.name || artist,
        previewUrl: null,
        spotifyUrl: track.url || null,
        youtubeUrl: youtubeSearchUrl,
        albumArt: imageUrl,
        duration: parseInt(track.duration || "0", 10) / 1000,
      });
    } catch (error) {
      console.error("Error searching track:", error);
      res.status(500).json({ error: "Failed to search for track" });
    }
  });

  return httpServer;
}
