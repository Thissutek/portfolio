"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Home, User, Mail, Github, Linkedin, Menu, X } from "lucide-react";
import { colors, styles } from "@/styles/theme";

const Navbar = () => {
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

  // Navigation items config - All 5 buttons including social links
  const navItems = [
    {
      id: "home",
      icon: <Home size={18} />,
      text: "Home",
      path: "/",
      isInternal: true,
    },
    {
      id: "about",
      icon: <User size={18} />,
      text: "About Me",
      path: "/about",
      isInternal: true,
    },
    {
      id: "contact",
      icon: <Mail size={18} />,
      text: "Contact",
      path: "/contact",
      isInternal: true,
    },
    {
      id: "github",
      icon: <Github size={18} />,
      text: "GitHub",
      path: "https://github.com/Thissutek",
      isInternal: false,
      ariaLabel: "GitHub Profile",
    },
    {
      id: "linkedin",
      icon: <Linkedin size={18} />,
      text: "LinkedIn",
      path: "https://www.linkedin.com/in/jonathan-yau-6a649a207/",
      isInternal: false,
      ariaLabel: "LinkedIn Profile",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: `${colors.surface}95`,
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

      {/* Top Navigation Bar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: `${colors.surface}95`,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${colors.overlay}20`,
          height: '70px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-center h-full">
            
            {/* Desktop Navigation - All 5 buttons */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navItems.map((item) => {
                if (item.isInternal) {
                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: activePage === item.id ? `${colors.lavender}20` : "transparent",
                        color: activePage === item.id ? colors.lavender : colors.text,
                        border: activePage === item.id ? `1px solid ${colors.lavender}40` : "1px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (activePage !== item.id) {
                          e.currentTarget.style.backgroundColor = `${colors.overlay}20`;
                          e.currentTarget.style.borderColor = `${colors.overlay}40`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activePage !== item.id) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "transparent";
                        }
                      }}
                    >
                      {item.icon}
                      <span className="font-medium text-sm lg:text-base">{item.text}</span>
                    </Link>
                  );
                } else {
                  return (
                    <a
                      key={item.id}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                      style={{
                        color: colors.text,
                        border: "1px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.overlay}20`;
                        e.currentTarget.style.borderColor = `${colors.overlay}40`;
                        e.currentTarget.style.color = colors.lavender;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.color = colors.text;
                      }}
                    >
                      {item.icon}
                      <span className="font-medium text-sm lg:text-base">{item.text}</span>
                    </a>
                  );
                }
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          style={{
            backgroundColor: `${colors.surface}98`,
            backdropFilter: "blur(25px)",
            borderBottom: `1px solid ${colors.overlay}20`,
          }}
        >
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item) => {
              if (item.isInternal) {
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: activePage === item.id ? `${colors.lavender}20` : "transparent",
                      color: activePage === item.id ? colors.lavender : colors.text,
                      border: `1px solid ${activePage === item.id ? colors.lavender + "40" : "transparent"}`,
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.text}</span>
                  </Link>
                );
              } else {
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      color: colors.text,
                      border: "1px solid transparent",
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.text}</span>
                  </a>
                );
              }
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
