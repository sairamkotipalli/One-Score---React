import React from 'react';
import Icon from '../../../components/AppIcon';

const LatestUpdates = ({ updates = [] }) => {
  const getIconForType = (type) => {
    const iconMap = {
      score_increase: 'TrendingUp',
      new_account: 'CreditCard',
      payment: 'CheckCircle',
      inquiry: 'Search',
      alert: 'AlertCircle'
    };
    return iconMap[type] || 'Bell';
  };

  const getColorForType = (type) => {
    const colorMap = {
      score_increase: 'var(--color-success)',
      new_account: 'var(--color-primary)',
      payment: 'var(--color-success)',
      inquiry: 'var(--color-warning)',
      alert: 'var(--color-error)'
    };
    return colorMap[type] || 'var(--color-muted-foreground)';
  };

  // when there are more than 3 updates, allow scrolling
  const isScrollable = (updates?.length || 0) > 3;

  return (
    <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Latest Updates</h2>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>

      {/* Scroll container: conditional classes */}
      <div
        role="list"
        aria-label="Latest account updates"
        className={
          // `space-y-4` keeps vertical spacing; when scrollable we add max-height & overflow
          `space-y-4 ${isScrollable ? 'max-h-56 overflow-y-auto pr-2' : ''}`
        }
        style={{
          // small safety: make background for icon container translucent using 15 hex suffix
          // this is only applied where inline style is needed elsewhere
        }}
      >
        {updates?.map((update) => (
          <div key={update?.id} role="listitem" className="flex gap-3">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                // faint background using 15 hex to mimic 10-15% opacity if CSS vars are full hex
                backgroundColor: `${getColorForType(update?.type)}15`
              }}
            >
              <Icon
                name={getIconForType(update?.type)}
                size={20}
                color={getColorForType(update?.type)}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-1">
                {update?.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {update?.description}
              </p>
              <span className="text-xs text-muted-foreground mt-1 inline-block">
                {update?.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestUpdates;
