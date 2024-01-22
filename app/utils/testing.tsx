"use client";
const systemTheme = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDarkMode ? "dark" : "light";
};

export default systemTheme;
