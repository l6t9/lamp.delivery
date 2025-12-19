import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/github-data";

export function ProjectCard({ project, index }: { project: Project; index: number }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col bg-card/40 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl -z-10 group-hover:blur-2xl transition-all duration-500 pointer-events-none rounded-lg"></div>
        <CardHeader className="space-y-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg font-bold hover-text-underline group-hover:text-primary transition-colors cursor-default">
                {project.name}
              </CardTitle>
              <CardDescription className="mt-1 hover-text-glow cursor-default">
                {project.description}
              </CardDescription>
            </div>
            <div className="flex gap-3 text-muted-foreground flex-shrink-0 hover-text-glow cursor-default">
              <div className="flex items-center gap-1 text-xs font-medium">
                <Star className="w-3 h-3" />
                {project.stars}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium">
                <GitFork className="w-3 h-3" />
                {project.forks}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grow space-y-4">
          <Badge variant="secondary" className="font-mono text-xs font-medium hover-text-glow cursor-default">
            {project.language}
          </Badge>
          {project.id === 2 && (
            <div className="flex justify-center pt-2">
              <img
                src="https://minky.materii.dev"
                alt="Random minky"
                className="rounded-lg shadow-md max-w-xs w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant="outline"
            className="w-full text-sm group-hover:border-primary/50 group-hover:text-primary transition-colors"
          >
            <a href={project.url} target="_blank" rel="noreferrer">
              View <ExternalLink className="ml-2 w-3.5 h-3.5" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
