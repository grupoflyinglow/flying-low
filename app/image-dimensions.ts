const imageDimensions: Record<string, { width: number; height: number }> = {
  "/images/flying-low-assum-preto.jpg": { width: 2500, height: 1667 },
  "/images/flying-low-collective.jpg": { width: 800, height: 533 },
  "/images/flying-low-portrait.jpg": { width: 1067, height: 1600 },
  "/images/flying-low-stage-amber.jpg": { width: 2000, height: 1334 },
  "/images/flying-low-stage-blue.jpg": { width: 1500, height: 1000 },
};

export function getImageDimensions(src: string) {
  return imageDimensions[src] ?? { width: 1600, height: 1067 };
}
