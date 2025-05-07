import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debouncePromise<TArgs, TResult>(
  fn: (args: TArgs) => TResult,
  delay: number,
): (args: TArgs) => Promise<TResult> {
  let timer: ReturnType<typeof setTimeout>;
  let resolver: (value: TResult) => void;

  return (args: TArgs) =>
    new Promise<TResult>((resolve) => {
      clearTimeout(timer);
      resolver = resolve;
      timer = setTimeout(() => {
        const result = fn(args);
        resolver(result);
      }, delay);
    });
}
