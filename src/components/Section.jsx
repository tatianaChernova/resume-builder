import { useDrag, useDrop } from "react-dnd";
import SectionForm from "./SectionForm";

export default function Section({
  id,
  index,
  type,
  data,
  onUpdate,
  onDelete,
  onMove,
}) {
  const [, ref] = useDrop({
    accept: "section",
    hover(item) {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "section",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  function getRussianLabel(type) {
    switch (type) {
      case "experience":
        return "Опыт";
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
  }
  return (
    <div
      ref={(node) => drag(ref(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: 20,
        marginBottom: 10,
        borderRadius: "8px",
        border: "1px solid #c8c8c8",
        backgroundColor: "#fff",
      }}
    >
      <strong>{getRussianLabel(type)}</strong>
      <button onClick={() => onDelete(id)} style={{ float: "right",border:"none", backgroundColor: "#fff" }}>
        ✕
      </button>
      <SectionForm
        type={type}
        data={data}
        onChange={(newData) => onUpdate(id, newData)}
      />
    </div>
  );
}
