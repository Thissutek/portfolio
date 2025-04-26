"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Home, User, Mail, Github, Linkedin } from "lucide-react";
import { colors, styles } from "@/styles/theme";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

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
    <div className={styles.sidebar} style={{ backgroundColor: colors.surface }}>
      <div className={styles.sidebarTitle} style={{ color: colors.lavender }}>
        JY
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
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
  );
};

export default Sidebar;
