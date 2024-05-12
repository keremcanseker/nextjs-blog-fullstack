"use client";

import { inter } from "./styles/fonts";
import { NextuiProvider } from "./providers";
import "./styles/globals.css";
import { useThemeStore } from "./utils/ThemeStore";
import { ToastContainerComponent } from "./components/Toaster";
import { useEffect } from "react";
import Script from "next/script";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();
  useEffect(() => {
    const themeFunction = () => {
      if (localStorage.getItem("theme")) {
        console.log("theme is set in localstorage");
        if (localStorage.getItem("theme") === "dark") {
          setTheme("dark");
          return;
        }
        if (localStorage.getItem("theme") === "light") {
          setTheme("light");
          return;
        }
      }
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme: "light" | "dark" = prefersDarkMode ? "dark" : "light";
      if (defaultTheme === "dark") {
        setTheme(defaultTheme);
        localStorage.setItem("theme", defaultTheme);
        return;
      }
    };
    themeFunction();
    // only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} main_wrapper  ${theme}`}>
        <NextuiProvider>
          <ToastContainerComponent />
          {children}
        </NextuiProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/froala-editor@latest/js/froala_editor.pkgd.min.js"
          type="text/javascript"
        />
      </body>
    </html>
  );
};

export default RootLayout;
