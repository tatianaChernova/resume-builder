import React from "react";

export default function SectionForm({ type, data, onChange }) {
  const handleChange = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontFamily: "Georgia, serif",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
    transition: "border-color 0.2s ease",
    outline: "none",
    marginBottom: "10px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  };
  const getAISuggestion = (type) => {
    switch (type) {
      case "experience":
        return {
          position: "Frontend-разработчик",
          company: "ООО «Технологии Будущего»",
          period: "2021 – 2023",
          description:
            "Разработка SPA-приложений на React, взаимодействие с REST API, улучшение UX и производительности.",
        };
      case "education":
        return {
          institution: "СПбГУ",
          major: "Прикладная математика",
          period: "2017 – 2021",
        };
      case "skills":
        return {
          skills: "JavaScript, React, HTML, CSS, Git, REST API",
        };
      case "certificates":
        return {
          certificate: "Frontend Developer Certificate – HTML Academy",
        };
      case "about":
        return {
          about:
            "Мотивированный разработчик, увлечённый созданием удобных и современных веб-приложений.",
        };
      default:
        return {};
    }
  };

  if (type === "experience") {
    return (
      <div style={containerStyle}>
        <input
          name="position"
          placeholder="Должность"
          value={data.position || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="company"
          placeholder="Компания"
          value={data.company || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="period"
          placeholder="Период"
          value={data.period || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Описание"
          value={data.description || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => onChange(getAISuggestion(type))}
          style={{
            marginTop: "5px",
            padding: "6px 12px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          AI-подсказка для секции
        </button>
      </div>
    );
  }

  if (type === "education") {
    return (
      <div style={containerStyle}>
        <input
          name="institution"
          placeholder="Учебное заведение"
          value={data.institution || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="major"
          placeholder="Специальность"
          value={data.major || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="period"
          placeholder="Период"
          value={data.period || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => onChange(getAISuggestion(type))}
          style={{
            marginTop: "5px",
            padding: "6px 12px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          AI-подсказка для секции
        </button>
      </div>
    );
  }

  if (type === "skills") {
    return (
      <div style={containerStyle}>
        <textarea
          name="skills"
          placeholder="Список навыков через запятую"
          value={data.skills || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => onChange(getAISuggestion(type))}
          style={{
            marginTop: "5px",
            padding: "6px 12px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          AI-подсказка для секции
        </button>
      </div>
    );
  }

  if (type === "certificates") {
    return (
      <div style={containerStyle}>
        <input
          name="certificate"
          placeholder="Название сертификата"
          value={data.certificate || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => onChange(getAISuggestion(type))}
          style={{
            marginTop: "5px",
            padding: "6px 12px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          AI-подсказка для секции
        </button>
      </div>
    );
  }

  if (type === "about") {
    return (
      <div style={containerStyle}>
        <textarea
          name="about"
          placeholder="О себе"
          value={data.about || ""}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => onChange(getAISuggestion(type))}
          style={{
            marginTop: "5px",
            padding: "6px 12px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          AI-подсказка для секции
        </button>
      </div>
    );
  }

  return null;
}
