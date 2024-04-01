import React, { useState, useEffect } from 'react';

function PageElement({ id, x, y, type, title, style, onSelect }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      onSelect(id);
      setSelected(!selected); 
    };
    
    const element = document.getElementById(id);
    element.addEventListener('click', handleClick);
    
    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, [id, onSelect, selected]);

  const handleDelete = () => {
    onSelect(null);
  };

  return (
    <div
      id={id}
      className={`page-element ${selected ? 'selected' : ''}`}
      
      style={{ position: 'absolute', top: `${y}px`, left: `${x}px`, ...(style || {}) }}
    >
     
      {type === 'Label' && <span style={{ fontSize: style?.fontSize, fontWeight: style?.fontWeight }}>{title}</span>}
      {type === 'Input' && <input type="text" />}
      {type === 'Button' && <button>{title}</button>}
      <button className="delete-btn" onClick={handleDelete}>
        X
      </button>
   
    </div>
  );
}

export default PageElement;
