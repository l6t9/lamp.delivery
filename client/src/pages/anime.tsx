import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import callOfTheNightLogo from "@assets/call-of-the-night-618cb591d7631-2970114519_1766124893755.png";
import newImage1 from "@assets/season-2-episode-8-preview-images-v0-bvmevp0o74kf1_1766125745691.jpg";
import newImage2 from "@assets/episode-11-preview-images-synopsis-v0-v4dxbdd9lbof1_1766125745697.jpg";
import carouselImage1 from "@assets/episode-11-preview-images-synopsis-v0-ot3p2dd9lbof1_1766125793160.jpg";
import carouselImage2 from "@assets/episode-11-preview-images-synopsis-v0-geu38bd9lbof1_1766125793172.jpg";
import carouselImage3 from "@assets/episode-11-preview-images-synopsis-v0-074mdzc9lbof1_1766125793181.jpg";
import carouselImage4 from "@assets/episode-11-preview-images-synopsis-v0-piyaqpe9lbof1_1766125793188.jpg";
import carouselImage5 from "@assets/episode-11-preview-images-synopsis-v0-1vig2nc9lbof1_1766125793195.jpg";
import { VertexBackground } from "@/components/vertex-background";

const carouselImages = [
  carouselImage1,
  carouselImage2,
  carouselImage3,
  carouselImage4,
  carouselImage5,
];

export default function Anime() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="bg-background font-sans relative">
      <VertexBackground />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-black gradient-text mb-4">
            Favorite Anime
          </h1>
          <p className="text-muted-foreground mb-6">This show is peak, watch it</p>
          <div className="flex items-center justify-center">
            <img
              src={callOfTheNightLogo}
              alt="Call of the Night"
              className="h-32 sm:h-40 object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Manga Panel Grid */}
        <div className="max-w-4xl w-full space-y-8">
          {/* Panel 1 - Top Row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-xl hover-elevate">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={newImage1}
                  alt="Anime panel 1"
                  className="w-full h-full object-cover"
                />
                {/* Manga border effect */}
                <div className="absolute inset-0 border-4 border-foreground/20 pointer-events-none rounded-lg"></div>
              </div>
            </div>
          </motion.div>

          {/* Panel 2 - Bottom Row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-xl hover-elevate">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={newImage2}
                  alt="Anime panel 2"
                  className="w-full h-full object-cover"
                />
                {/* Manga border effect */}
                <div className="absolute inset-0 border-4 border-foreground/20 pointer-events-none rounded-lg"></div>
              </div>
            </div>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative group mt-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-xl hover-elevate">
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={carouselImages[currentIndex]}
                  alt={`Carousel image ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Manga border effect */}
                <div className="absolute inset-0 border-4 border-foreground/20 pointer-events-none rounded-lg"></div>

                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={prevSlide}
                    className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    data-testid="button-carousel-prev"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={nextSlide}
                    className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    data-testid="button-carousel-next"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-primary w-6"
                          : "bg-foreground/30 hover:bg-foreground/50"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                      data-testid={`button-carousel-indicator-${index}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
