import { useEffect } from 'react';

export function useDebounce(func, deps = [], waitTime = 250) {
  useEffect(() => {
    const t = setTimeout(() => {
      func.apply(undefined, deps);
    }, waitTime);
    return () => clearTimeout(t);
  }, deps);
}
