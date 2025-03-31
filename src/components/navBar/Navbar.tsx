import React, { useState, useEffect } from "react";

const NavbarComponent: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-4 py-3 p-5">
      <a className="navbar-brand fw-bold lead" href="/">
        StudentManager
      </a>
      <div className="d-flex ms-auto align-items-center gap-3">
        {theme === "light" ? (
          <i className="bi bi-moon cursor-pointer fs-3" onClick={toggleTheme} />
        ) : (
          <i className="bi bi-sun cursor-pointer fs-3" onClick={toggleTheme} />
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
