import { useRef, useEffect } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

interface MagneticHoverOptions {
  strength?: number;
  restoreSpeed?: number;
  maxDistance?: number;
}

export const useMagneticHover = ({
  strength = 0.3,
  restoreSpeed = 50,
  maxDistance = 50,
}: MagneticHoverOptions = {}) => {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: restoreSpeed, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < maxDistance) {
        const factor = (maxDistance - distance) / maxDistance;
        x.set(deltaX * strength * factor);
        y.set(deltaY * strength * factor);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, strength, maxDistance]);

  return {
    ref,
    x: xSpring,
    y: ySpring,
  };
};

// Enhanced magnetic effect with rotation
export const useMagneticHoverAdvanced = ({
  strength = 0.2,
  restoreSpeed = 30,
  maxDistance = 80,
}: MagneticHoverOptions = {}) => {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: restoreSpeed, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < maxDistance) {
        const factor = (maxDistance - distance) / maxDistance;

        // Translation
        x.set(deltaX * strength * factor);
        y.set(deltaY * strength * factor);

        // 3D rotation based on mouse position
        const rotationStrength = 0.1;
        rotateY.set((deltaX / rect.width) * 30 * rotationStrength * factor);
        rotateX.set(-(deltaY / rect.height) * 30 * rotationStrength * factor);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      rotateX.set(0);
      rotateY.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, rotateX, rotateY, strength, maxDistance]);

  return {
    ref,
    x: xSpring,
    y: ySpring,
    rotateX: rotateXSpring,
    rotateY: rotateYSpring,
  };
};
