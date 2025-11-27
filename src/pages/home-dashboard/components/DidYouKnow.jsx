import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DidYouKnow = ({ tips }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [tips?.length]);

  const currentTip = tips?.[currentTipIndex];

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-5 border border-primary/20 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground mb-2">Did You Know?</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{currentTip?.text}</p>
          
          <div className="flex items-center gap-2 mt-3">
            {tips?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTipIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentTipIndex ? 'w-6 bg-primary' : 'w-1.5 bg-primary/30'
                }`}
                aria-label={`Go to tip ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidYouKnow;