import { create } from "zustand";
import api from "../api/http";
import Cookies from "js-cookie";
import { persist, createJSONStorage } from "zustand/middleware";

const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      logout: async () => {
        set({ loading: true });
        try {
          await api.delete("users/logout");
          Cookies.remove("token");
          set({ user: null, loading: false });
        } catch (error) {
          set({ error, loading: false });
        }
      },
      getUser: async () => {
        set({ loading: true });
        try {
          const { data } = await api.get("me");
          set({ user: data, loading: false });
        } catch (error) {
          set({ error, loading: false });
        }
      },
      getUserIfToken: async () => {
        const token = Cookies.get("token");
        if (token) {
          await get().getUser();
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default userStore;
