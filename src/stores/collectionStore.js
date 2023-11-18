import { create } from "zustand";
import api from "../api/http";

const collectionStore = create((set) => ({
  collection: null,
  loading: false,
  error: null,
  getCollection: async (id) => {
    set({ loading: true });
    try {
      const { data } = await api.get(`collection/${id}`);
      set({ collection: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default collectionStore;
