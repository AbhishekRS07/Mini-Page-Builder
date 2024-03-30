import React, { useState } from 'react';

function ConfigModal({ isOpen, onClose, onSave, x, y }) {
  const [config, setConfig] = useState({
    title: '',
    x: x,
    y: y,
    fontSize: '',
    fontWeight: ''
  });

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Configure Element</h2>
          <label>
            Title:
            <input type="text" name="title" value={config.title} onChange={handleChange} />
          </label>
          <label>
            X Coordinate:
            <input type="text" name="x" value={config.x} onChange={handleChange} />
          </label>
          <label>
            Y Coordinate:
            <input type="text" name="y" value={config.y} onChange={handleChange} />
          </label>
          <label>
            Font Size (px):
            <input type="text" name="fontSize" value={config.fontSize} onChange={handleChange} />
          </label>
          <label>
            Font Weight:
            <input type="text" name="fontWeight" value={config.fontWeight} onChange={handleChange} />
          </label>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    )
  );
}

export default ConfigModal;
