import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SectionSelect from "./components/SectionSelect";
import FontSelect from "./components/FontSelect";
import SectionList from "./components/SectionList";
import ResumePreview from "./components/ResumePreview";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

export default function App() {
  const [sections, setSections] = useState([]);
  const [newType, setNewType] = useState("experience");
  const [theme, setTheme] = useState({
    color: "#007bff", // по умолчанию синий
    fontFamily: "Arial, sans-serif",
  });

  const addSection = () => {
    const id = Date.now();
    setSections([
      ...sections,
      { id, type: newType, data: {}, order: sections.length },
    ]);
  };

  const updateSection = (id, data) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, data } : s)));
  };

  const deleteSection = (id) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const moveSection = (dragIndex, hoverIndex) => {
    const newSections = [...sections];
    const [dragged] = newSections.splice(dragIndex, 1);
    newSections.splice(hoverIndex, 0, dragged);
    setSections(newSections);
  };

  const previewRef = useRef();

  const handleDownloadPDF = () => {
    const element = previewRef.current;

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", padding: "20px" }}>
        {/* Левый блок: редактор */}
        <div style={{ width: "40%", paddingRight: "20px" }}>
          <h2>Редактор</h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
              alignItems: "center",
            }}
          >
            <SectionSelect value={newType} onChange={setNewType} />

            <button
              onClick={addSection}
              style={{
                padding: "12px 15px",
                backgroundColor: "#3569b0",
                color: "white",
                border: "1px solid #3569b0",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#10375b")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3569b0")
              }
            >
              Добавить секцию
            </button>
            <button
              onClick={handleDownloadPDF}
              style={{
                padding: "12px 15px",
                backgroundColor: "#fff",
                border: "1px solid #3569b0",
                color: "#3569b0",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Скачать как PDF
            </button>
          </div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <label>Цвет:</label>
            <input
              type="color"
              value={theme.color}
              onChange={(e) => setTheme({ ...theme, color: e.target.value })}
              style={{
                width: "30px",
                height: "30px",
                padding: 0,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                verticalAlign: "middle",
              }}
            />

            <label>Шрифт:</label>
            <FontSelect
              value={theme.fontFamily}
              onChange={(font) => setTheme({ ...theme, fontFamily: font })}
            />
          </div>
          <SectionList
            sections={sections}
            onUpdate={updateSection}
            onDelete={deleteSection}
            onMove={moveSection}
          />
        </div>

        {/* Правый блок: превью */}
        <div style={{ width: "60%" }}>
          <div style={{ flex: 1 }} ref={previewRef}>
            <ResumePreview sections={sections} theme={theme} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
