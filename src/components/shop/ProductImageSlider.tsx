import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, Play } from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  src: string;
}

interface ProductImageSliderProps {
  images: string[];
  name: string;
  isNew?: boolean;
  isSale?: boolean;
  video?: string;
  videoPosition?: number;
}

const ProductImageSlider = ({ images, name, isNew, isSale, video, videoPosition = -1 }: ProductImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Build media array: insert video at videoPosition if specified, otherwise append
  const media: MediaItem[] = (() => {
    const imageItems: MediaItem[] = images.map((src) => ({ type: "image", src }));
    if (!video) return imageItems;
    const videoItem: MediaItem = { type: "video", src: video };
    if (videoPosition >= 0 && videoPosition <= imageItems.length) {
      imageItems.splice(videoPosition, 0, videoItem);
      return imageItems;
    }
    return [...imageItems, videoItem];
  })();

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + media.length) % media.length);
  }, [media.length]);

  if (media.length === 0) return null;

  const current = media[activeIndex];

  return (
    <>
      <div className="min-w-0">
        <div className="relative">
          {/* Main Media */}
          <div
            className="aspect-square bg-muted/30 rounded-2xl overflow-hidden border border-border cursor-zoom-in group"
            onClick={() => setLightboxOpen(true)}
          >
            {current.type === "image" ? (
              <img
                src={current.src}
                alt={`${name} — фото ${activeIndex + 1}`}
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <video
                src={current.src}
                className="w-full h-full object-contain p-4"
                controls
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {current.type === "image" && (
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-5 w-5 text-foreground" />
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {isNew && <Badge className="bg-primary text-primary-foreground">NEW</Badge>}
            {isSale && <Badge className="bg-accent text-accent-foreground">SALE</Badge>}
          </div>

          {/* Nav Arrows */}
          {media.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-background transition-colors"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-background transition-colors"
                aria-label="Следующее фото"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {media.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {media.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-colors relative ${
                  i === activeIndex ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`${name} — миниатюра ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Play className="h-5 w-5 text-primary fill-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none [&>button]:hidden">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {current.type === "image" ? (
              <img
                src={current.src}
                alt={`${name} — увеличенное фото ${activeIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={current.src}
                className="max-w-full max-h-full"
                controls
                autoPlay
                playsInline
              />
            )}

            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {media.length > 1 && (
              <>
                <button
                  onClick={() => goTo(activeIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={() => goTo(activeIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {media.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductImageSlider;
