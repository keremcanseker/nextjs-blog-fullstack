"use client";
import type { Metadata } from "next";
import { inter } from "./styles/fonts";
import { useEffect } from "react";
import { NextuiProvider } from "./providers";
import "./styles/globals.css";
import { useThemeStore } from "./utils/ThemeStore";
import clsx from "clsx";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();

  return (
    <html lang="en">
      <body className={`${inter.className} main_wrapper  ${theme}`}>
        <NextuiProvider>{children}</NextuiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
