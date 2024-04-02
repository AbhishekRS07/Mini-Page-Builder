import React, { useState, useEffect } from "react";
import "./App.css";
import SidebarItem from "./components/SidebarItem";
import PageElement from "./components/PageElement";
import ConfigModal from "./components/ConfigModal";
import { FaFont, FaKeyboard, FaMouse } from "react-icons/fa";

function App() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [newElementAdded, setNewElementAdded] = useState(false);

  useEffect(() => {
    const savedElements = JSON.parse(localStorage.getItem("elements"));
    if (savedElements) {
      setElements(savedElements);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("elements", JSON.stringify(elements));
  }, [elements]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const { offsetX, offsetY } = e.nativeEvent;
  
    let newElement;
    switch (type) {
      case "Label":
        newElement = {
          id: Date.now(),
          x: offsetX,
          y: offsetY,
          type: "Label",
          title: "Label",
          style: {
            fontSize: '16px',  // Initial font size
            fontWeight: 'normal',  // Initial font weight
            // Add other initial style properties as needed
          },
        };
        break;
      case "Input":
        newElement = {
          id: Date.now(),
          x: offsetX,
          y: offsetY,
          type: "Input",
          title: "Input",
          style: {
           
          },
        };
        break;
      case "Button":
        newElement = {
          id: Date.now(),
          x: offsetX,
          y: offsetY,
          type: "Button",
          title: "Button",
          style: {
         
          },
        };
        break;
      default:
        break;
    }
  
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
    setNewElementAdded(true); 
  };
  

  const handleElementSelect = (id) => {
    setSelectedElement(id);
  };

  const handleConfigSave = (config) => {
    const { title, x, y, fontSize, fontWeight } = config;

    const updatedElements = elements.map((element) => {
      if (element.id === selectedElement) {
        return {
          ...element,
          title,
          x,
          y,
          style: {
            ...element.style,
            fontSize: fontSize ? `${fontSize}px` : undefined,
            fontWeight,
          },
        };
      }
      return element;
    });

    setElements(updatedElements);
    setNewElementAdded(false); // Reset the flag when the config is saved

    localStorage.setItem("elements", JSON.stringify(updatedElements));
  };

  const handleElementDelete = () => {
    const updatedElements = elements.filter(
      (element) => element.id !== selectedElement
    );
    setElements(updatedElements);
    setSelectedElement(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Delete" && selectedElement !== null) {
      handleElementDelete();
    } else if (e.key === "Enter" && selectedElement !== null) {
      setConfigModalOpen(true);
    }
  };
  const handleExport = () => {
    const json = JSON.stringify(elements, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "page_config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (newElementAdded) {
      setConfigModalOpen(true); 
    }
  }, [newElementAdded,elements]);

  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="sidebar">
        <h2 style={{ color: "whitesmoke" }}>BLOCKS</h2>
        <SidebarItem type="Label" icon={<FaFont />} />
        <SidebarItem type="Input" icon={<FaKeyboard />} />
        <SidebarItem type="Button" icon={<FaMouse />} />
        <button className="export" onClick={handleExport}>
          Export Page
        </button>
      </div>
      <div
        className="page"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => setConfigModalOpen(false)} 
      >
        {elements.map((element) => (
          <PageElement
            key={element.id}
            id={element.id}
            x={element.x}
            y={element.y}
            type={element.type}
            title={element.title}
            style={element.style}
            onSelect={handleElementSelect}
          />
        ))}
      </div>
      <ConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        onSave={handleConfigSave}
        x={mousePosition.x}
        y={mousePosition.y}
      />
    </div>
  );
}

export default App;
