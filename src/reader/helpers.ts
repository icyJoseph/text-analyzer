export function debounce<Args>(
  callback: (...args: Args[]) => void,
  wait = 200
): () => void {
  let timeout: number;
  return (...args: Args[]) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => callback(...args), wait);
  };
}
