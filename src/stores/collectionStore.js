import { create } from "zustand";
import api from "../api/http";

const collectionStore = create((set, get) => ({
  collection: null,
  loading: false,
  error: null,
  getCollection: async (id) => {
    set({ loading: true });
    try {
      const { data } = await api.get(`collection/${id}`);
      get().setCollection(data);
    } catch (error) {
      set({ error, loading: false });
    }
  },
  setCollection: (collection) => {
    set({ collection });
  },
}));

export default collectionStore;
