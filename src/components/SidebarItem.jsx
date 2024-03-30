import React from 'react';
import "../App.css"
function SidebarItem({ type }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('type', type);
  };

  return (
    <div className="sidebar-item" draggable onDragStart={handleDragStart}>
      {type}
    </div>
  );
}

export default SidebarItem;
