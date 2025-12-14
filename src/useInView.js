// useInView.js
import { useEffect, useState, useRef } from "react";

export function useInView(options) {
  const ref = useRef();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}
