import React from 'react';

function SidebarItem({ type, icon }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('type', type);
  };

  return (
    <div className="sidebar-item" draggable onDragStart={handleDragStart}>
      {icon}
      {type}
    </div>
  );
}

export default SidebarItem;
