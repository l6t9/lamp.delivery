import { motion } from "framer-motion";
import { Music as MusicIcon, Disc3, Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";
import { VertexBackground } from "@/components/vertex-background";

interface Track {
  title: string;
  duration: string;
  youtubeUrl: string;
  artist?: string;
  albumArt?: string;
}

interface Artist {
  name: string;
  genre: string;
  description: string;
  color: string;
  imageUrl: string;
  songs: Track[];
}

const favoriteArtists: Artist[] = [
  {
    name: "Blood Cultures",
    genre: "Indie Pop / Alternative",
    description: "All-time favorite, extremely underrated",
    color: "from-pink-500/20 to-red-500/20",
    imageUrl: "/images/blood-cultures.jpg",
    songs: [
      {
        title: "Where The City Can't See",
        duration: "3:42",
        youtubeUrl: "https://music.youtube.com/watch?v=ZePJiplAjok&si=t83G0Tt0P9O9Mtxa",
        artist: "Blood Cultures"
      },
      {
        title: "Overlord",
        duration: "3:58",
        youtubeUrl: "https://music.youtube.com/watch?v=93wOPJ6eTR4&si=gRuXv6Ml1bsjKKQx",
        artist: "Blood Cultures"
      },
      {
        title: "Coastal",
        duration: "4:05",
        youtubeUrl: "https://music.youtube.com/watch?v=dbaCZuXb-FQ&si=TH9jvW8jOFTGtZEh",
        artist: "Blood Cultures"
      }
    ]
  },
  {
    name: "Ado",
    genre: "Vocaloid / Pop",
    description: "Amazing voice",
    color: "from-purple-500/20 to-blue-500/20",
    imageUrl: "/images/ado.jpg",
    songs: [
      {
        title: "God-ish",
        duration: "4:21",
        youtubeUrl: "https://music.youtube.com/watch?v=eVpDNd7Ckzo&si=X3a5awGpWgXg82Dg",
        artist: "Ado"
      },
      {
        title: "All Night Radio",
        duration: "3:15",
        youtubeUrl: "https://music.youtube.com/watch?v=1BDOJCKKiEE&si=xstmc30Py9laEDSa",
        artist: "Ado"
      },
      {
        title: "Gira Gira",
        duration: "3:33",
        youtubeUrl: "https://music.youtube.com/watch?v=Dt0CYNAYfNY&si=qBsNW4Kx9P4qAgSJ",
        artist: "Ado"
      }
    ]
  }
];

export default function Music() {
  const [artists] = useState(favoriteArtists);

  const handlePlayTrack = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <VertexBackground />
      <div className="relative z-10">
        <main className="container mx-auto px-4 sm:px-6 pt-32 pb-16 max-w-4xl space-y-16">
          {/* Hero Section */}
          <section className="relative text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                My Music
              </h1>
            </motion.div>
          </section>

          {/* Featured Artists */}
          <section className="space-y-8">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Disc3 className="w-5 h-5" />
                <span className="font-mono text-sm tracking-wider uppercase">Favorite Artists</span>
              </div>
              <h2 className="text-3xl font-bold">Artists I Love</h2>
            </div>

            <div className="space-y-8">
              {artists.map((artist, artistIndex) => (
                <motion.div
                  key={artist.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: artistIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl -z-10 group-hover:blur-2xl transition-all duration-500 pointer-events-none rounded-2xl"></div>
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 space-y-6 hover:border-primary/50 transition-colors duration-300">
                    {/* Artist Header */}
                    <div className="flex items-center gap-3">
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Cpath d='M50 30c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zM50 55c10 0 15 3 15 8v7H35v-7c0-5 5-8 15-8z' fill='%23999'/%3E%3C/svg%3E";
                        }}
                      />
                      <div>
                        <h3 className="text-xl font-bold">{artist.name}</h3>
                        <p className="text-sm text-primary font-mono">{artist.genre}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {artist.description}
                    </p>

                    {/* Songs List */}
                    <div className="space-y-3 pt-4 border-t border-border/30">
                      <h4 className="text-sm font-semibold text-primary/70 uppercase tracking-wide">Favorite Songs</h4>
                      <div className="space-y-2">
                        {artist.songs.map((song, songIndex) => (
                          <motion.div
                            key={`${artist.name}-${songIndex}`}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: songIndex * 0.05 }}
                            viewport={{ once: true }}
                            className="group/track flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors duration-200"
                          >
                            {song.albumArt && (
                              <img
                                src={song.albumArt}
                                alt={song.title}
                                className="flex-shrink-0 w-10 h-10 rounded object-cover"
                              />
                            )}
                            <button
                              onClick={() => handlePlayTrack(song.youtubeUrl)}
                              className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors duration-200"
                              title="Listen on YouTube Music"
                            >
                              <Play className="w-4 h-4 text-primary fill-primary" />
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">{song.title}</p>
                            </div>
                            <p className="text-xs text-muted-foreground flex-shrink-0">{song.duration}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <footer className="py-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LampDelivery</p>
        </footer>
      </div>
    </div>
  );
}
