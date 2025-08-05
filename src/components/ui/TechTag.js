import { colors } from "@/styles/theme";

const TechTag = ({ label, accentColor, isHovered }) => {
  return (
    <span
      className="text-xs px-2 py-1 rounded-full font-medium"
      style={{
        background: isHovered 
          ? `linear-gradient(135deg, ${accentColor}20 0%, ${colors.surface}60 100%)`
          : `${colors.surface}80`,
        backdropFilter: "blur(10px)",
        border: `1px solid ${isHovered ? `${accentColor}30` : `${colors.overlay}40`}`,
        color: isHovered ? accentColor : colors.text,
        boxShadow: isHovered ? `0 4px 12px -2px ${accentColor}20` : 'none',
        transform: 'translateZ(0)', // GPU acceleration
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'background, border, color, box-shadow'
      }}
    >
      {label}
    </span>
  );
};

export default TechTag;
