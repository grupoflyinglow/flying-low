"use client";

import { useEffect, useRef, useState } from "react";

type Player = {
  mute(): void;
  playVideo(): void;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
};

type YouTubeAPI = {
  Player: new (element: HTMLElement, options: {
    videoId: string;
    playerVars: Record<string, string | number>;
    events: {
      onReady(event: { target: Player }): void;
      onStateChange(event: { data: number }): void;
      onError(): void;
      onAutoplayBlocked(): void;
    };
  }) => Player;
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeAPI> | undefined;

function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        if (window.YT) resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = undefined;
        script.remove();
        reject(new Error("YouTube is unavailable"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export function HomeVideo({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let player: Player | undefined;

    loadYouTubeAPI().then((api) => {
      if (disposed) return;
      const target = document.createElement("div");
      container.appendChild(target);
      player = new api.Player(target, {
        videoId: "wTtT8zk8pYY",
        playerVars: {
          autoplay: 1, mute: 1, loop: 1, playlist: "wTtT8zk8pYY",
          controls: 0, disablekb: 1, playsinline: 1, rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: ({ target: readyPlayer }) => {
            readyPlayer.mute();
            readyPlayer.playVideo();
          },
          onStateChange: ({ data }) => {
            if (!disposed && data === 1) setPlaying(true);
          },
          onError: () => { if (!disposed) setPlaying(false); },
          onAutoplayBlocked: () => { if (!disposed) setPlaying(false); },
        },
      });
      const iframe = player.getIframe();
      iframe.title = title;
      iframe.tabIndex = -1;
      iframe.setAttribute("aria-hidden", "true");
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
    }).catch(() => {
      // Keep the existing hero photograph when YouTube cannot load.
    });

    return () => {
      disposed = true;
      player?.destroy();
      container.replaceChildren();
    };
  }, [title]);

  return <div ref={containerRef} className={`hero-video ${playing ? "is-ready" : ""}`} aria-hidden="true" />;
}
