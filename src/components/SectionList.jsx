
import Section from "./Section";

export default function SectionList({ sections, onUpdate, onDelete, onMove }) {
  return (
    <div>
      {sections.map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          index={index}
          type={section.type}
          data={section.data}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  );
}
