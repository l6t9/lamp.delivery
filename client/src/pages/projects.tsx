import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/github-data";
import { VertexBackground } from "@/components/vertex-background";

export default function Projects() {
  return (
    <div className="min-h-screen bg-background font-sans relative">
      <VertexBackground />
      <div className="relative z-10">
        <main className="container mx-auto px-4 sm:px-6 pt-32 pb-16 max-w-4xl space-y-24">
          {/* Hero Section */}
          <section className="relative text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                My Projects
              </h1>
              <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
                A collection of cool things I've built
              </p>
            </motion.div>
          </section>

          {/* Projects Grid */}
          <section className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} index={index} />
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
