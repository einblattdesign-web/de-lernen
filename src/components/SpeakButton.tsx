"use client";

// Plays German pronunciation via the browser's built-in speech synthesis
// (Web Speech API) so we don't need an external TTS service or API key.
export default function SpeakButton({ text, className }: { text: string; className?: string }) {
  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label="発音を聞く"
      title="発音を聞く"
      className={
        className ??
        "inline-flex items-center justify-center rounded-full w-8 h-8 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950"
      }
    >
      🔊
    </button>
  );
}
