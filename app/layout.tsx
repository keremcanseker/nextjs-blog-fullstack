"use client";

import { inter } from "./styles/fonts";
import { NextuiProvider } from "./providers";
import "./styles/globals.css";
import { useThemeStore } from "./utils/ThemeStore";
import { ToastContainerComponent } from "./components/Toaster";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();

  return (
    <html lang="en">
      <body className={`${inter.className} main_wrapper  ${theme}`}>
        <NextuiProvider>
          <ToastContainerComponent />
          {children}
        </NextuiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
