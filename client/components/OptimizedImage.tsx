import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  optimizeImage,
  generateResponsiveImages,
} from "@/lib/performance-utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  format?: "webp" | "avif" | "jpg" | "png";
  loading?: "lazy" | "eager";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onError?: () => void;
  showLoadingSpinner?: boolean;
  blurhash?: string;
  responsive?: boolean;
  aspectRatio?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder,
  priority = false,
  sizes = "100vw",
  quality = 80,
  format = "webp",
  loading = "lazy",
  objectFit = "cover",
  onLoad,
  onError,
  showLoadingSpinner = true,
  blurhash,
  responsive = true,
  aspectRatio,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === "eager") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  // Handle image load
  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Generate optimized src
  const optimizedSrc = optimizeImage(src, width, height, format);

  // Generate responsive sources
  const responsiveSources = responsive
    ? generateResponsiveImages(src, [320, 640, 768, 1024, 1280, 1536])
    : [];

  // Create placeholder
  const defaultPlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width || 400}' height='${height || 300}'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E`;

  const placeholderSrc = placeholder || defaultPlaceholder;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio && "aspect-square",
        className,
      )}
      style={{
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      {/* Loading State */}
      {!imageLoaded && !imageError && showLoadingSpinner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-muted"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
          />
        </motion.div>
      )}

      {/* Blurhash placeholder */}
      {blurhash && !imageLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${blurhash})`,
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <>
          {responsive && responsiveSources.length > 0 ? (
            <picture>
              {responsiveSources.map((source, index) => (
                <source
                  key={index}
                  srcSet={source.src}
                  media={source.media}
                  type={`image/${format}`}
                />
              ))}
              <motion.img
                ref={imgRef}
                src={optimizedSrc}
                alt={alt}
                loading={loading}
                className={cn(
                  "absolute inset-0 w-full h-full transition-opacity duration-500",
                  {
                    "opacity-0": !imageLoaded,
                    "opacity-100": imageLoaded,
                  },
                )}
                style={{ objectFit }}
                onLoad={handleLoad}
                onError={handleError}
                sizes={sizes}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            </picture>
          ) : (
            <motion.img
              ref={imgRef}
              src={optimizedSrc}
              alt={alt}
              loading={loading}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-500",
                {
                  "opacity-0": !imageLoaded,
                  "opacity-100": imageLoaded,
                },
              )}
              style={{ objectFit }}
              onLoad={handleLoad}
              onError={handleError}
              width={width}
              height={height}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </>
      )}

      {/* Placeholder - shown while loading */}
      {!imageLoaded && !imageError && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full opacity-50"
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

// Progressive enhancement component
interface ProgressiveImageProps extends OptimizedImageProps {
  lowQualitySrc?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  lowQualitySrc,
  ...props
}) => {
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Low quality image loads first */}
      {lowQualitySrc && !highQualityLoaded && (
        <OptimizedImage
          {...props}
          src={lowQualitySrc}
          priority={true}
          quality={10}
          className={cn(props.className, "blur-sm")}
        />
      )}

      {/* High quality image */}
      <OptimizedImage
        {...props}
        onLoad={() => {
          setHighQualityLoaded(true);
          props.onLoad?.();
        }}
        className={cn(
          props.className,
          lowQualitySrc && !highQualityLoaded && "absolute inset-0",
        )}
      />
    </div>
  );
};

// Background image component with optimization
interface OptimizedBackgroundProps {
  src: string;
  children: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  priority?: boolean;
  parallax?: boolean;
}

export const OptimizedBackground: React.FC<OptimizedBackgroundProps> = ({
  src,
  children,
  className = "",
  overlay = true,
  overlayOpacity = 0.5,
  priority = false,
  parallax = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background Image */}
      <OptimizedImage
        src={src}
        alt=""
        className={cn(
          "absolute inset-0 w-full h-full",
          parallax && "transform-gpu will-change-transform",
        )}
        objectFit="cover"
        priority={priority}
        onLoad={() => setImageLoaded(true)}
        showLoadingSpinner={false}
      />

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default OptimizedImage;
