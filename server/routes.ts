import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

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
      
      res.json({
        name: artistName,
        imageUrl: null,
        spotifyUrl: null,
        followers: 0,
        genres: [],
      });
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

      const youtubeSearchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`;
      
      res.json({
        name: title,
        artist: artist,
        previewUrl: null,
        spotifyUrl: null,
        youtubeUrl: youtubeSearchUrl,
        albumArt: null,
        duration: 0,
      });
    } catch (error) {
      console.error("Error searching track:", error);
      res.status(500).json({ error: "Failed to search for track" });
    }
  });

  return httpServer;
}
