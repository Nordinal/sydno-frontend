import { create } from "zustand";
import { sydnoServiceFormData } from "SydnoService/service";
import { IReceivedAdvert } from "@/app/advert/[advert_id]/IAdvertListItemReady";

export interface IAdvertModel {
  getAdvert: (id: number | string) => Promise<IReceivedAdvert | false>;
  addToFavourite: (id: number | string) => Promise<boolean>;
  deleteFromFavourite: (id: number | string) => Promise<boolean>;
}

export const useAdvert = create<IAdvertModel>(() => ({
  getAdvert: async (id) => {
    try {
      const data = await sydnoServiceFormData.get("/api/adverts/" + id);
      return data.data;
    } catch {
      return false;
    }
  },
  addToFavourite: async (id) => {
    try {
      const data = await sydnoServiceFormData.get(
        `/api/adverts/${id}/favorite`
      );
      return data.statusText === "OK";
    } catch {
      return false;
    }
  },
  deleteFromFavourite: async (id) => {
    try {
      const data = await sydnoServiceFormData.get(
        `/api/adverts/${id}/unfavorite`
      );
      return data.statusText === "OK";
    } catch {
      return false;
    }
  },
}));
