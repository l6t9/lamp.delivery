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
      <Card className="h-full flex flex-col bg-card/40 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 group">
        <CardHeader className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex gap-3 text-muted-foreground">
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
          <div>
            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
              {project.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {project.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grow space-y-4">
          <Badge variant="secondary" className="font-mono text-xs font-medium">
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
