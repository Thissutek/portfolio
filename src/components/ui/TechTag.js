import { tokens, fonts } from "@/styles/theme";

const TechTag = ({ label, accentColor, isHovered }) => {
  const accent = accentColor || tokens.accentSoft;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs"
      style={{
        background: isHovered
          ? `linear-gradient(135deg, ${accent}22 0%, rgba(49,50,68,0.6) 100%)`
          : "rgba(49,50,68,0.6)",
        border: `1px solid ${isHovered ? `${accent}44` : "rgba(180,190,254,0.10)"}`,
        color: isHovered ? accent : tokens.fg,
        fontFamily: fonts.mono,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {label}
    </span>
  );
};

export default TechTag;
