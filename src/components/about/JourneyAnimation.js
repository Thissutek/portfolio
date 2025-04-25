import { colors } from "@/styles/theme";

const JourneyAnimation = ({ scrollPosition }) => {
  return (
    <div
      className="fixed inset-0 z-0 opacity-20 pointer-events-none"
      style={{
        background: `linear-gradient(135deg, 
                    ${colors.blue} ${scrollPosition * 0.8}%, 
                    ${colors.lavender} ${scrollPosition * 1.2}%, 
                    ${colors.peach} ${scrollPosition * 1.6}%)`,
        transition: "background 0.1s ease-out",
        // Ensure it starts after the sidebar width
        left: "80px", // This matches the sidebar width of w-20 (20 * 4px = 80px)
      }}
    >
      {/* Animated elements that move with scroll */}
      <div className="absolute w-full h-full overflow-hidden">
        {/* Circle that moves with scroll */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "300px",
            height: "300px",
            backgroundColor: colors.blue,
            left: `${10 + scrollPosition * 0.2}%`,
            top: `${20 + scrollPosition * 0.4}%`,
            opacity: 0.3,
            transform: `scale(${1 + scrollPosition * 0.01})`,
            transition: "all 0.1s ease-out",
          }}
        ></div>

        {/* Square that rotates with scroll */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: colors.peach,
            right: `${15 + scrollPosition * 0.3}%`,
            top: `${50 - scrollPosition * 0.3}%`,
            opacity: 0.2,
            transform: `rotate(${scrollPosition * 3.6}deg)`,
            transition: "all 0.1s ease-out",
          }}
        ></div>

        {/* Triangle that moves in opposite direction */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 0,
            height: 0,
            borderLeft: "100px solid transparent",
            borderRight: "100px solid transparent",
            borderBottom: `200px solid ${colors.lavender}`,
            left: `${70 - scrollPosition * 0.5}%`,
            bottom: `${10 + scrollPosition * 0.5}%`,
            opacity: 0.25,
            transform: `rotate(${scrollPosition * 1.8}deg)`,
            transition: "all 0.1s ease-out",
          }}
        ></div>
      </div>
    </div>
  );
};

export default JourneyAnimation;
