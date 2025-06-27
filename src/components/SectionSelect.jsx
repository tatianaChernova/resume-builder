import React, { useState, useRef, useEffect } from "react";

const options = [
  { value: "experience", label: "Опыт" },
  { value: "education", label: "Образование" },
  { value: "skills", label: "Навыки" },
  { value: "certificates", label: "Сертификаты" },
  { value: "about", label: "О себе" },
];

export default function SectionSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Закрываем селект при клике вне
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

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
      {/* Кнопка выбора */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
        style={{
          padding: "10px 15px",
          borderRadius: 8,
          border: "1px solid #3569b0",
          backgroundColor: "#fff",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : "Выберите секцию"}</span>
        {/* Стрелочка */}
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

      {/* Выпадающее меню */}
      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)", // сдвиг вниз
            left: 0,
            right: 0,
            margin: 0,
            padding: "8px 0",
            listStyle: "none",
            backgroundColor: "#fff",
            border: "1px solid #3569b0",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
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
