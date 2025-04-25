import { colors } from "@/styles/theme";

const TechTag = ({ label }) => {
  return (
    <span
      className="text-xs px-2 py-1 rounded"
      style={{ backgroundColor: colors.overlay, color: colors.text }}
    >
      {label}
    </span>
  );
};

export default TechTag;
