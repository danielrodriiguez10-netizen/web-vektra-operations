import type { CSSProperties } from "react";

// Retraso escalonado para elementos [data-reveal] de una lista: style={revealDelay(i)}
export function revealDelay(index: number, step = 80): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}
