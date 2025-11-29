"use client";

import { create } from "zustand";

interface InitialStreamStore {
  title: string;
  description: string;
  category: string;
  thumbnail?: File;
  isPublic: boolean;
}

interface StreamStore extends InitialStreamStore {
  setStreamInfo: (streamValues: InitialStreamStore) => void;
  canStream: boolean;
  setCanStream: (isStream: boolean) => void;
}

const useStreamStore = create<StreamStore>((set) => ({
  title: "",
  description: "",
  category: "",
  thumbnail: undefined,
  isPublic: true,
  canStream: false,
  setStreamInfo: (streamValues: InitialStreamStore) =>
    set({
      title: streamValues.title,
      description: streamValues.description,
      category: streamValues.category,
      thumbnail: streamValues.thumbnail,
      isPublic: streamValues.isPublic,
    }),
  setCanStream: (isStream: boolean) => set({ canStream: isStream }),
}));

export default useStreamStore;
