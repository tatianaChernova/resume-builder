import React from "react";

export default function ResumePreview({ sections, theme }) {
  const wrapperStyle = {
    width: "210mm",
    minHeight: "297mm",
    margin: "0 auto",
    padding: "20mm",
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    fontFamily: theme.fontFamily || "Arial, sans-serif",
    boxSizing: "border-box",
  };

  const sectionTitleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "6px",
    borderBottom: `2px solid ${theme.color}`,
    paddingBottom: "4px",
    color: theme.color,
  };

  const sectionContentStyle = {
    marginBottom: "16px",
    fontSize: "14px",
    color: "#444",
  };

  const getTitle = (type) => {
    switch (type) {
      case "experience":
        return "Опыт работы";
      case "education":
        return "Образование";
      case "skills":
        return "Навыки";
      case "certificates":
        return "Сертификаты";
      case "about":
        return "О себе";
      default:
        return "";
    }
  };

  const renderSection = (section, index) => {
    const { type, data } = section;

    return (
      <div key={index} style={sectionContentStyle}>
        {index === 0 && (
          <h2 style={{ marginTop: "0", marginBottom: "30px" }}>Резюме</h2>
        )}

        <div style={sectionTitleStyle}>{getTitle(type)}</div>
        {type === "experience" && (
          <div>
            <strong>{data.position}</strong> {data.company && <span>в</span>}{" "}
            <em>{data.company}</em>
            <br />
            <span>{data.period}</span>
            <p>{data.description}</p>
          </div>
        )}
        {type === "education" && (
          <div>
            <strong>{data.institution}</strong>
            <br />
            <em>{data.major}</em>
            <br />
            <span>{data.period}</span>
          </div>
        )}
        {type === "skills" && (
          <div>
            {data.skills?.split(",").map((skill, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  background: "#e0e0e0",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  margin: "2px",
                  fontSize: "13px",
                }}
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        )}
        {type === "certificates" && <div>{data.certificate}</div>}
        {type === "about" && (
          <div>
            <p>{data.about}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={wrapperStyle}>
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}
