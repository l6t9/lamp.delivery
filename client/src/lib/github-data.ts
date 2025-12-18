import { Github, Code2, Zap, Palette, Heart } from "lucide-react";

export type Project = {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  icon: any;
};

export const projects: Project[] = [
  {
    id: 1,
    name: "Raincord",
    description: "A fresh client for Android and iOS, made to be lightweight and fast.",
    language: "TypeScript",
    stars: 124,
    forks: 15,
    url: "https://raincord.dev",
    icon: Zap,
  },
  {
    id: 2,
    name: "LumiBot",
    description: "A Discord bot that sends you cute minky pictures.\n\nHere's a random minky 🐱",
    language: "JavaScript",
    stars: 3,
    forks: 1,
    url: "https://github.com/LampDelivery/LumiBot",
    icon: Heart,
  },
];
