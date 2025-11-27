import React, { useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LearningSection = ({ articles, wordOfDay }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef?.current) {
      const scrollAmount = 300;
      scrollContainerRef?.current?.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Learn & Grow</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeft" size={18} color="var(--color-foreground)" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRight" size={18} color="var(--color-foreground)" />
          </button>
        </div>
      </div>
      <div className="mb-4 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="BookOpen" size={18} color="var(--color-accent)" />
          <span className="text-sm font-semibold text-foreground">Word of the Day</span>
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">{wordOfDay?.word}</h3>
        <p className="text-sm text-muted-foreground">{wordOfDay?.definition}</p>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {articles?.map((article) => (
          <div
            key={article?.id}
            className="flex-shrink-0 w-72 bg-muted/30 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={article?.image}
                alt={article?.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-primary/90 rounded-md">
                <span className="text-xs font-medium text-primary-foreground">{article?.category}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">{article?.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{article?.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{article?.readTime}</span>
                <Icon name="ArrowRight" size={16} color="var(--color-primary)" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningSection;