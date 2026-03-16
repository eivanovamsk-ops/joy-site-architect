import { HelpCircle } from "lucide-react";

declare global {
  interface Window {
    jivo_api?: { open: () => void };
  }
}

const JivoChatButton = () => {
  const handleClick = () => {
    if (window.jivo_api) {
      window.jivo_api.open();
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Открыть чат поддержки"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
    >
      <HelpCircle className="h-6 w-6" />
    </button>
  );
};

export default JivoChatButton;
