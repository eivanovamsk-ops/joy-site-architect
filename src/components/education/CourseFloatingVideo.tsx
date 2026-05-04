import { useEffect, useRef, useState } from "react";
import { X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseFloatingVideoProps {
  src: string;
  label?: string;
}

export function CourseFloatingVideo({ src, label = "Видео о курсе" }: CourseFloatingVideoProps) {
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  return (
    <div
      className={cn(
        "fixed bottom-20 lg:bottom-6 right-4 z-50 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="relative w-[125px] md:w-[238px] rounded-xl overflow-hidden shadow-2xl border border-[#333] bg-[#1A1A1A]">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 rounded-full p-1 transition-colors"
          aria-label="Закрыть"
        >
          <X className="h-3.5 w-3.5 text-white" />
        </button>

        {!playing ? (
          <div className="relative cursor-pointer group" onClick={handlePlay}>
            <video src={src} className="w-full" preload="none" muted playsInline />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Play className="h-6 w-6 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-8">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">{label}</span>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            className="w-full"
            controls
            playsInline
          />
        )}
      </div>
    </div>
  );
}
