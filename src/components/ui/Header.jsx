import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const mobileRef = useRef(null);

  const navLinks = [
    { path: "/home-dashboard", label: "Home", icon: "Home" },
    { path: "/my-loans", label: "My Loans", icon: "CreditCard" },
    { path: "/insights", label: "Insights", icon: "TrendingUp" },
    { path: "/offers", label: "Offers", icon: "Gift" },
  ];
  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Click outside - close mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC - close menus
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/home-dashboard" className="flex items-center gap-3" aria-label="Go to home">
          <img
            src="https://www.onescore.app/images/icons/logo.png"
            alt="OneScore Logo"
            className="w-16 h-8 object-contain"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-1 text-sm transition ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <Icon name={item.icon} size={18} color="currentColor" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            aria-expanded={notifOpen}
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="p-2 rounded-lg hover:bg-muted transition focus:outline-none focus:ring-2 focus:ring-offset-1"
            type="button"
          >
            <Icon name="Bell" size={20} />
          </button>

          <button
            aria-label="Profile"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="p-2 rounded-lg hover:bg-muted transition focus:outline-none focus:ring-2 focus:ring-offset-1"
            type="button"
          >
            <Icon name="User" size={20} color="var(--color-primary)" />
          </button>

          {/* Mobile Menu toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition focus:outline-none focus:ring-2 focus:ring-offset-1"
            onClick={() => {
              setMobileOpen((v) => !v);
              setNotifOpen(false);
              setProfileOpen(false);
            }}
            type="button"
          >
            <Icon name="Menu" size={22} />
          </button>
        </div>
      </div>
      
      {mobileOpen && (
        <div
          ref={mobileRef}
          className="md:hidden bg-card border-t border-border px-5 py-3 flex flex-col gap-2"
          role="menu"
          aria-label="Mobile navigation"
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 rounded-md text-sm ${isActive ? "text-primary font-semibold" : "text-foreground"}`
              }
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;