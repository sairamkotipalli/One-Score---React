import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ShareWithFriends = () => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const shareOptions = [
    { id: 1, name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366' },
    { id: 4, name: 'Copy Link', icon: 'Link', color: 'var(--color-primary)' }
  ];

  const handleShare = (platform) => {
    const shareText = 'Check out OneScore - Monitor your credit score and improve your financial health!';
    const shareUrl = 'https://onescore.app';

    switch (platform) {
      case 'WhatsApp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'Copy Link':
        navigator.clipboard?.writeText(shareUrl);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
    setShowShareOptions(false);
  };

  return (
    <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-5 border border-secondary/20 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
          <Icon name="Users" size={24} color="var(--color-secondary)" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">Share with Friends</h3>
          <p className="text-xs text-muted-foreground">Help your friends improve their credit score</p>
        </div>
      </div>
      <p className="text-sm text-foreground/80 mb-4">
        Invite your friends to OneScore and help them take control of their financial health. Share the app and earn rewards!
      </p>
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="w-full py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/90 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Icon name="Share2" size={18} color="currentColor" />
        Share Now
      </button>
      {showShareOptions && (
        <div className="mt-4 grid grid-cols-2 gap-3 animate-fade-in">
          {shareOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => handleShare(option?.name)}
              className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors duration-200"
            >
              <Icon name={option?.icon} size={20} color={option?.color} />
              <span className="text-sm font-medium text-foreground">{option?.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareWithFriends;