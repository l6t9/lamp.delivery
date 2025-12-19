import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve public assets (images, etc)
  const publicPath = path.resolve(__dirname, "..", "public");
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist (but not for API routes)
  app.use("*", (req, res) => {
    // Skip API routes - let them return 404
    if (req.path.startsWith("/api")) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
