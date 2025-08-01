import { colors } from "@/styles/theme";

const TechTag = ({ label, accentColor, isHovered }) => {
  return (
    <span
      className="text-xs px-2 py-1 rounded-full transition-all duration-300 hover:scale-105 font-medium"
      style={{
        background: isHovered 
          ? `linear-gradient(135deg, ${accentColor}20 0%, ${colors.surface}60 100%)`
          : `${colors.surface}80`,
        backdropFilter: "blur(10px)",
        border: `1px solid ${isHovered ? `${accentColor}30` : `${colors.overlay}40`}`,
        color: isHovered ? accentColor : colors.text,
        boxShadow: isHovered ? `0 4px 12px -2px ${accentColor}20` : 'none'
      }}
    >
      {label}
    </span>
  );
};

export default TechTag;
