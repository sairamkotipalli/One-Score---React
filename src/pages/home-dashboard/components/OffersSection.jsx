import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OffersSection = ({ offers }) => {
  return (
    <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Featured Offers</h2>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {offers?.map((offer) => (
          <div
            key={offer?.id}
            className="relative rounded-xl overflow-hidden cursor-pointer group hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={offer?.image}
                alt={offer?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {offer?.badge && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-warning/90 rounded-md">
                  <span className="text-xs font-semibold text-warning-foreground">{offer?.badge}</span>
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-sm font-semibold text-white mb-1">{offer?.title}</h3>
              <p className="text-xs text-white/80 mb-2">{offer?.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">{offer?.validUntil}</span>
                <div className="flex items-center gap-1 text-white">
                  <span className="text-xs font-medium">Apply Now</span>
                  <Icon name="ArrowRight" size={14} color="currentColor" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersSection;