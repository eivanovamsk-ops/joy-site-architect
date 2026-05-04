import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

const videos = Array.from({ length: 10 }, (_, i) => `/videos/bundle/video-${i + 1}.mp4`);

const VideoCard = ({ src }: { src: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div
      className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden cursor-pointer group"
      onClick={toggle}
    >
      <video
        ref={ref}
        src={src}
        className="w-full h-full object-cover"
        playsInline
        muted
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="bg-primary/90 rounded-full p-3">
            <Play className="h-6 w-6 text-primary-foreground fill-primary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export const BundleVideoCarousel = () => (
  <div className="mb-16">
    <h2 className="text-2xl font-bold mb-6 text-foreground">Видео</h2>
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent className="-ml-3">
        {videos.map((v, i) => (
          <CarouselItem key={i} className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
            <VideoCard src={v} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 hidden md:flex" />
      <CarouselNext className="-right-4 hidden md:flex" />
    </Carousel>
  </div>
);
