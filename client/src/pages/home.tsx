import { motion } from "framer-motion";
import { Github, ExternalLink, Lightbulb, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGitHubUser } from "@/hooks/use-github-user";
import { VertexBackground } from "@/components/vertex-background";

export default function Home() {
  const { user, loading } = useGitHubUser("LampDelivery");

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <VertexBackground />
      <div className="relative z-10">
      <main className="container mx-auto px-4 sm:px-6 pt-32 pb-16 max-w-4xl space-y-24">
        {/* Hero Section */}
        <section className="relative text-center space-y-8">
          {/* Avatar */}
          {!loading && user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse"></div>
                <img
                  src={user.avatar_url}
                  alt="lamp"
                  className="relative w-full h-full rounded-full object-cover border-4 border-background shadow-xl"
                />
              </div>
            </motion.div>
          )}

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight gradient-text">
                LampDelivery
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-medium hover-text-glow cursor-default">
                heya nerds
              </p>
            </div>

            <p className="text-lg text-muted-foreground/80 max-w-lg mx-auto leading-relaxed hover-text-glow cursor-default">
              I make stuff on the web. Mostly open source, sometimes useful.
              Developer for <span className="text-primary font-semibold hover-text-underline">Raincord</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-8 font-bold shadow-lg shadow-primary/20">
                <a href="#projects">View Projects</a>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <a href="https://github.com/LampDelivery" target="_blank" rel="noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <a href="https://youtube.com/@LampDelivery" target="_blank" rel="noreferrer">
                    <Youtube className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured Project: Raincord */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center justify-between overflow-hidden">
            <div className="space-y-6 flex-1 text-center">
              <div className="space-y-2">
                <div className="text-primary font-mono text-sm tracking-wider uppercase">Featured Project</div>
                <h2 className="text-3xl sm:text-4xl font-black">Raincord</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A fresh client for Android and iOS, made to be lightweight and fast.
                </p>
              </div>
              <Button variant="secondary" className="rounded-full font-semibold" asChild>
                <a href="https://raincord.dev" target="_blank" rel="noreferrer">
                  Visit Website <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
            <div className="w-full max-w-xs md:max-w-sm shrink-0">
               <img
                src="https://raw.githubusercontent.com/LampDelivery/raincord/refs/heads/main/3Y98uQPr.png"
                alt="Kettu and raincord"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-xl"
              />
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
