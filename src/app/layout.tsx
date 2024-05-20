"use client";
import { UIProvider } from "@/components/UIProvider";
import { ToastContainerComponent } from "@/components/Toaster";
import { inter } from "@/app/styles/fonts";
import { useTheme } from "@/lib/hooks/useTheme";
import "@/app/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <html lang="en">
      <body className={`${inter.className} main_wrapper ${theme}`}>
        <ToastContainerComponent />
        <UIProvider>{children}</UIProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/froala-editor@latest/js/froala_editor.pkgd.min.js"
          type="text/javascript"
        />
      </body>
    </html>
  );
};

export default RootLayout;
