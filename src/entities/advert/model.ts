import { create } from "zustand";
import { IAdvertListItem } from "./types/main";
import { sydnoServiceJson } from "SydnoService/service";

export interface IAdvertModel {
  getAdvert: (id: number) => Promise<IAdvertListItem | false>;
}

export const useAdvert = create<IAdvertModel>(() => ({
  getAdvert: async (id: number) => {
    try {
      const data = await sydnoServiceJson.get("/api/adverts/" + id);
      return data.data;
    } catch {
      return false;
    }
  },
}));
