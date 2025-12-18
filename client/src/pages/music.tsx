import { motion } from "framer-motion";
import { Music as MusicIcon, Disc3, Play, Pause, Volume2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import { VertexBackground } from "@/components/vertex-background";

interface Artist {
  name: string;
  genre: string;
  description: string;
  color: string;
  imageUrl: string;
}

interface Track {
  title: string;
  artist: string;
  duration: string;
  previewUrl?: string;
  youtubeUrl?: string;
  loaded?: boolean;
}

const favoriteArtists: Artist[] = [
  {
    name: "Blood Cultures",
    genre: "Indie Pop / Alternative",
    description: "Dreamy and experimental indie pop with ethereal vocals and innovative production.",
    color: "from-pink-500/20 to-red-500/20",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  },
  {
    name: "Ado",
    genre: "Vocaloid / Pop",
    description: "Japanese music producer and vocalist known for powerful emotional performances and creative storytelling through music.",
    color: "from-purple-500/20 to-blue-500/20",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
  }
];

const initialPlaylistTracks: Track[] = [
  { title: "Kissing in the Rain", artist: "Blood Cultures", duration: "3:42" },
  { title: "Readymade", artist: "Ado", duration: "4:21" },
  { title: "Heaven", artist: "Blood Cultures", duration: "3:58" },
  { title: "Ateya", artist: "Ado", duration: "3:15" },
  { title: "Ultraviolet", artist: "Blood Cultures", duration: "4:05" },
  { title: "Gira Gira", artist: "Ado", duration: "3:33" }
];

export default function Music() {
  const [artists, setArtists] = useState(favoriteArtists);
  const [loading, setLoading] = useState(true);
  const [playlistTracks, setPlaylistTracks] = useState(initialPlaylistTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracksLoaded, setTracksLoaded] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistNames = ["Blood Cultures", "Ado"];
        const fetchedArtists = await Promise.all(
          artistNames.map(async (name) => {
            try {
              const response = await fetch(`/api/artists/${encodeURIComponent(name)}`);
              if (response.ok) {
                const data = await response.json();
                return {
                  ...favoriteArtists.find(a => a.name === name) || { name, genre: "", description: "", color: "" },
                  imageUrl: data.imageUrl || favoriteArtists.find(a => a.name === name)?.imageUrl,
                };
              }
            } catch (error) {
              console.error(`Error fetching ${name}:`, error);
            }
            return favoriteArtists.find(a => a.name === name);
          })
        );
        setArtists(fetchedArtists.filter(Boolean) as Artist[]);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracksWithUrls = await Promise.all(
          initialPlaylistTracks.map(async (track) => {
            try {
              const response = await fetch(
                `/api/search-track?title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}`
              );
              if (response.ok) {
                const data = await response.json();
                return {
                  ...track,
                  previewUrl: data.previewUrl,
                  youtubeUrl: data.youtubeUrl,
                  loaded: true,
                };
              }
            } catch (error) {
              console.error(`Error fetching preview for ${track.title}:`, error);
            }
            return { ...track, loaded: true };
          })
        );
        setPlaylistTracks(tracksWithUrls);
        setTracksLoaded(true);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      if (currentTrackIndex !== null && currentTrackIndex < playlistTracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentTrackIndex, playlistTracks.length]);

  const handlePlayTrack = (index: number) => {
    const track = playlistTracks[index];
    
    if (!track.previewUrl) {
      // If no preview, open YouTube Music
      if (track.youtubeUrl) {
        window.open(track.youtubeUrl, '_blank');
      }
      return;
    }

    if (currentTrackIndex === index && isPlaying) {
      // Pause if already playing
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // Play the track
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentTrackIndex(index);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <VertexBackground />
      <div className="relative z-10">
        <Navbar />

        {/* Hidden Audio Player */}
        <audio ref={audioRef} crossOrigin="anonymous" />

        <main className="container mx-auto px-4 sm:px-6 pt-32 pb-16 max-w-4xl space-y-16">
          {/* Hero Section */}
          <section className="relative text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-xl">
                  <MusicIcon className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                My Music
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Music
              </p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full space-y-4 hover:border-primary/50 transition-colors duration-300">
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
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Playlist Preview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 sm:p-12 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Playlist Preview</h3>
                <p className="text-muted-foreground">Favorite tracks from these amazing artists</p>
              </div>
              
              <div className="space-y-3">
                {playlistTracks.map((track, index) => (
                  <motion.div
                    key={`${track.artist}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group/track flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors duration-200"
                  >
                    <button
                      onClick={() => handlePlayTrack(index)}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-colors duration-200"
                      title={track.previewUrl ? "Play preview" : "Listen on YouTube Music"}
                    >
                      {currentTrackIndex === index && isPlaying ? (
                        <Pause className="w-5 h-5 text-primary fill-primary" />
                      ) : (
                        <Play className="w-5 h-5 text-primary fill-primary" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{track.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                        {!track.previewUrl && track.youtubeUrl && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary whitespace-nowrap">YouTube Music</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {track.previewUrl && currentTrackIndex === index && isPlaying && (
                        <div className="flex gap-1">
                          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "100ms" }}></div>
                          <div className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground flex-shrink-0">{track.duration}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {!tracksLoaded && (
                <p className="text-sm text-muted-foreground text-center">Loading track previews...</p>
              )}
            </div>
          </motion.section>
        </main>

        <footer className="py-12 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LampDelivery</p>
        </footer>
      </div>
    </div>
  );
}
