import React, { useState, useRef, useEffect } from "react";

const fontOptions = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Roboto', sans-serif", label: "Roboto" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "'Courier New', monospace", label: "Courier New" },
];

export default function FontSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = fontOptions.find((opt) => opt.value === value);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: 220,
        userSelect: "none",
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        color: "#3569b0",
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
        style={{
          padding: "10px 15px",
          borderRadius: 6,
          border: "1px solid #3569b0",
          backgroundColor: "#fff",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontFamily: selectedOption ? selectedOption.value : "Arial, sans-serif",
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : "Выберите шрифт"}</span>
        <svg
          style={{
            width: 16,
            height: 16,
            transition: "transform 0.3s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            fill: "none",
            stroke: "#3569b0",
            strokeWidth: 1.5,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>

      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            margin: 0,
            padding: "8px 0",
            listStyle: "none",
            backgroundColor: "#fff",
            border: "1px solid #3569b0",
            borderRadius: 6,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {fontOptions.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(opt.value);
                  setIsOpen(false);
                }
              }}
              tabIndex={0}
              style={{
                padding: "8px 15px",
                cursor: "pointer",
                backgroundColor: value === opt.value ? "#e7f0ff" : "transparent",
                color: "#3569b0",
                fontFamily: opt.value,
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
