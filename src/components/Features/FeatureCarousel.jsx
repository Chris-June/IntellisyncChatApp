import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const SCROLL_INTERVAL = 5000; // 5 seconds per slide

const FeatureCarousel = ({ features, itemsPerPage = 3, renderFeature, onFeatureClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Calculate total pages
  const totalPages = Math.ceil(features.length / itemsPerPage);

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [totalPages, isAutoScrolling]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  // Navigation handlers
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setIsAutoScrolling(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoScrolling(false);
  };

  // Get current page items
  const getCurrentItems = () => {
    const start = currentIndex * itemsPerPage;
    return features.slice(start, start + itemsPerPage);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {getCurrentItems().map((item, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {renderFeature ? renderFeature(item) : (
                  <div className="p-6 bg-card rounded-lg shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl" role="img" aria-label={item.title}>
                        {item.icon}
                      </span>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => onFeatureClick && onFeatureClick(item.title)}
                    >
                      Learn More
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary w-4'
                : 'bg-primary/30'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoScrolling(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;
