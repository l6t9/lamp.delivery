import { motion } from "framer-motion";
import { Music as MusicIcon, Disc3 } from "lucide-react";
import Navbar from "@/components/navbar";
import { VertexBackground } from "@/components/vertex-background";

interface Artist {
  name: string;
  genre: string;
  description: string;
  color: string;
}

const favoriteArtists: Artist[] = [
  {
    name: "Blood Cultures",
    genre: "Indie Pop / Alternative",
    description: "Dreamy and experimental indie pop with ethereal vocals and innovative production.",
    color: "from-pink-500/20 to-red-500/20"
  },
  {
    name: "Ado",
    genre: "Vocaloid / Pop",
    description: "Japanese music producer and vocalist known for powerful emotional performances and creative storytelling through music.",
    color: "from-purple-500/20 to-blue-500/20"
  }
];

export default function Music() {
  return (
    <div className="min-h-screen bg-background font-sans relative">
      <VertexBackground />
      <div className="relative z-10">
        <Navbar />

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
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse"></div>
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
                Music that moves me. Favorite artists and sounds that inspire my creative work.
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
              {favoriteArtists.map((artist, index) => (
                <motion.div
                  key={artist.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${artist.color} rounded-2xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500`}></div>
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 h-full space-y-4 hover:border-primary/50 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <MusicIcon className="w-6 h-6 text-white" />
                      </div>
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

          {/* Listening Habits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 sm:p-12 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Why I Love Music</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Music is a big part of my creative process. Whether it's the experimental soundscapes of Blood Cultures or the emotional depth of Ado's work, I find inspiration in diverse genres and styles.
                </p>
                <p>
                  These artists push boundaries and create unique sonic experiences that remind me why creativity matters. Their willingness to experiment influences how I approach my own projects.
                </p>
              </div>
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
