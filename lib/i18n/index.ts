import { en } from "./en";
import { es } from "./es";

export type { Dict } from "./en";
export type Lang = "en" | "es";
export const langs: Lang[] = ["en", "es"];

export function getDictionary(lang: string) {
  return lang === "es" ? es : en;
}
