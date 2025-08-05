"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Home, User, Mail, Github, Linkedin, Menu, X } from "lucide-react";
import { colors, styles } from "@/styles/theme";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Get current active page from path
  const getActivePage = () => {
    if (pathname === "/") return "home";
    if (pathname === "/about") return "about";
    if (pathname === "/contact") return "contact";
    return "home";
  };

  const activePage = getActivePage();

  // Navigation items config
  const navItems = [
    {
      id: "home",
      icon: <Home className={styles.navIcon} size={20} />,
      text: "Home",
      path: "/",
    },
    {
      id: "about",
      icon: <User className={styles.navIcon} size={20} />,
      text: "About",
      path: "/about",
    },
    {
      id: "contact",
      icon: <Mail className={styles.navIcon} size={20} />,
      text: "Contact",
      path: "/contact",
    },
  ];

  // Social media links
  const socialLinks = [
    {
      id: "github",
      icon: <Github size={18} />,
      url: "https://github.com/Thissutek",
      ariaLabel: "GitHub Profile",
    },
    {
      id: "linkedin",
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com/in/jonathan-yau-6a649a207/",
      ariaLabel: "LinkedIn Profile",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: colors.surface,
          color: colors.lavender,
          backdropFilter: "blur(20px)",
          border: `1px solid ${colors.overlay}30`,
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`${styles.sidebar} md:relative fixed left-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ backgroundColor: colors.surface }}
      >
        <div className={styles.sidebarTitle} style={{ color: colors.lavender }}>
          JY
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`${styles.navItem} ${activePage === item.id ? styles.navItemActive : ""}`}
              style={{
                backgroundColor:
                  activePage === item.id ? colors.overlay : "transparent",
                color: activePage === item.id ? colors.lavender : colors.text,
              }}
            >
              {item.icon}
              <span className={styles.navText}>{item.text}</span>
            </Link>
          ))}
        </nav>

        {/* Social media links at the bottom */}
        <div className="mt-auto pt-6 flex justify-center space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="p-1.5 transition-colors duration-200 rounded-lg hover:bg-opacity-20"
              style={{ color: colors.text }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = `${colors.overlay}33`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
