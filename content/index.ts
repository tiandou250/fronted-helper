import { STYLES_A } from "./styles-a";
import { STYLES_B } from "./styles-b";
import { STYLES_C } from "./styles-c";
import type { Style } from "@/lib/types";

export const STYLES: Style[] = [...STYLES_A, ...STYLES_B, ...STYLES_C];

export function getStyle(id: string): Style | undefined {
  return STYLES.find((s) => s.id === id);
}

export function getNeighbors(id: string) {
  const i = STYLES.findIndex((s) => s.id === id);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: STYLES[(i - 1 + STYLES.length) % STYLES.length],
    next: STYLES[(i + 1) % STYLES.length],
  };
}
