import { colors } from "@/styles/theme";

const JourneySection = ({
  title,
  content,
  isActive,
  accentColor = colors.lavender,
}) => {
  return (
    <div
      className="transition-opacity duration-700"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>
        {title}
      </h2>
      <p style={{ color: colors.text }}>{content}</p>
    </div>
  );
};

export default JourneySection;
