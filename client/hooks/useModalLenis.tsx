import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useModalLenis(isOpen: boolean, containerSelector: string) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Clean up if modal is closed
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Wait for modal to be rendered
    const initLenis = () => {
      const wrapper = document.querySelector(containerSelector);
      const content = wrapper?.querySelector(".modal-inner");

      if (wrapper && content) {
        // Initialize Lenis for modal content
        lenisRef.current = new Lenis({
          wrapper: wrapper as HTMLElement,
          content: content as HTMLElement,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        });

        // Animation frame loop
        function raf(time: number) {
          lenisRef.current?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    };

    // Delay initialization to ensure modal is in DOM
    const timeoutId = setTimeout(initLenis, 100);

    return () => {
      clearTimeout(timeoutId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isOpen, containerSelector]);

  const scrollTo = (target: string | number, options?: any) => {
    lenisRef.current?.scrollTo(target, options);
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const start = () => {
    lenisRef.current?.start();
  };

  return { scrollTo, stop, start, lenis: lenisRef.current };
}
