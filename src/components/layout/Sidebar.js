"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Home, User, Mail } from "lucide-react";
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

      <div className={styles.footer} style={{ color: colors.subtext }}>
        © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Sidebar;
