import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const applyDarkMode = (value) => {
  if (value === "dark") {
    document.body.classList.add("dark");
    document.documentElement.setAttribute("data-color-mode", "dark");
  } else {
    document.body.classList.remove("dark");
    document.documentElement.setAttribute("data-color-mode", "light");
  }
};

const themeStore = create(
  persist(
    (set) => ({
      mode: "light",
      setMode: (value) => {
        applyDarkMode(value);
        set({ mode: value });
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        return (state) => {
          applyDarkMode(state.mode);
        };
      },
    }
  )
);

export default themeStore;
