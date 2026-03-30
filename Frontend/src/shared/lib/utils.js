import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет CSS классы с поддержкой Tailwind
 * @param {...any} inputs - Классы для объединения
 * @returns {string} Объединенная строка классов
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}