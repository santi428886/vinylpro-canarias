"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const FAVORITES_KEY = "vinylpro-favorites";
const COMPARE_KEY = "vinylpro-compare";
const MAX_COMPARE = 3;

type CatalogExperienceContextValue = {
  favorites: string[];
  compareList: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  isCompare: (slug: string) => boolean;
  canAddCompare: boolean;
  clearCompare: () => void;
};

const CatalogExperienceContext =
  createContext<CatalogExperienceContextValue | null>(null);

function readStorage(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function CatalogExperienceProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(readStorage(FAVORITES_KEY));
    setCompareList(readStorage(COMPARE_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList));
  }, [compareList, hydrated]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    setCompareList((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      compareList,
      toggleFavorite,
      isFavorite: (slug: string) => favorites.includes(slug),
      toggleCompare,
      isCompare: (slug: string) => compareList.includes(slug),
      canAddCompare: compareList.length < MAX_COMPARE,
      clearCompare: () => setCompareList([]),
    }),
    [favorites, compareList, toggleFavorite, toggleCompare],
  );

  return (
    <CatalogExperienceContext.Provider value={value}>
      {children}
    </CatalogExperienceContext.Provider>
  );
}

export function useCatalogExperience() {
  const ctx = useContext(CatalogExperienceContext);
  if (!ctx) {
    throw new Error(
      "useCatalogExperience must be used within CatalogExperienceProvider",
    );
  }
  return ctx;
}
