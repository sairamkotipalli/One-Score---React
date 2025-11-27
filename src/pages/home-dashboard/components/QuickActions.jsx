import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ actions }) => {
  const navigate = useNavigate();

  const handleActionClick = (action) => {
    if (action?.route) {
      navigate(action?.route);
    }
  };

  return (
    <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-200 group"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: `${action?.color}15` }}>
              <Icon name={action?.icon} size={24} color={action?.color} />
            </div>
            <span className="text-xs font-medium text-foreground text-center">{action?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;