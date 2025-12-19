import { motion } from "framer-motion";
import callOfTheNightLogo from "@assets/call-of-the-night-618cb591d7631-2970114519_1766124893755.png";
import animeImage1 from "@assets/Screenshot_20251109_040929_Instagram_1766124809033.jpg";
import animeImage2 from "@assets/Screenshot_20251109_040915_Instagram_1766124809045.jpg";
import { VertexBackground } from "@/components/vertex-background";

export default function Anime() {
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
          <div className="flex items-center justify-center mb-6">
            <img
              src={callOfTheNightLogo}
              alt="Call of the Night"
              className="h-16 sm:h-20 object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black gradient-text mb-2">
            Anime Gallery
          </h1>
          <p className="text-muted-foreground">A collection of beautiful moments</p>
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
                  src={animeImage1}
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
                  src={animeImage2}
                  alt="Anime panel 2"
                  className="w-full h-full object-cover"
                />
                {/* Manga border effect */}
                <div className="absolute inset-0 border-4 border-foreground/20 pointer-events-none rounded-lg"></div>
              </div>
            </div>
          </motion.div>

          {/* Manga Panel Grid Layout - Alternative 2-column for larger screens */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-xl hover-elevate">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={animeImage1}
                    alt="Anime panel 1 grid"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-4 border-foreground/20 pointer-events-none rounded-lg"></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-xl hover-elevate">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={animeImage2}
                    alt="Anime panel 2 grid"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-4 border-foreground/20 pointer-events-none rounded-lg"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
