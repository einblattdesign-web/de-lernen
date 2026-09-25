"use client";

import { useRef, useState } from "react";

// Plays German pronunciation via the browser's built-in speech synthesis
// (Web Speech API) so we don't need an external TTS service or API key.
//
// Two browser quirks this works around:
// 1. Chrome/Safari can silently drop speech if the SpeechSynthesisUtterance
//    object is garbage-collected before it finishes — keeping a ref to it
//    for the lifetime of the utterance prevents that.
// 2. Voices load asynchronously; speaking before any are loaded can be a
//    no-op on some browsers, so we wait for the `voiceschanged` event once
//    if the voice list is still empty.
export default function SpeakButton({ text, className }: { text: string; className?: string }) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [unsupported, setUnsupported] = useState(false);

  const speakNow = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    utterance.onerror = () => setUnsupported(true);
    utteranceRef.current = utterance; // keep alive so it isn't GC'd mid-speech
    window.speechSynthesis.speak(utterance);
  };

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setUnsupported(true);
      return;
    }
    setUnsupported(false);

    if (window.speechSynthesis.getVoices().length === 0) {
      // Voices aren't loaded yet on first use in some browsers; speak as
      // soon as they arrive, with a short fallback in case the event never
      // fires (it doesn't on a few older browsers).
      const onVoicesChanged = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
        speakNow();
      };
      window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
      setTimeout(() => {
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
        speakNow();
      }, 300);
      return;
    }

    speakNow();
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label="発音を聞く"
      title={unsupported ? "この端末では発音の再生に対応していません" : "発音を聞く"}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full w-8 h-8 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950"
      }
    >
      {unsupported ? "🔇" : "🔊"}
    </button>
  );
}
