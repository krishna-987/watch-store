import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorite = (item) => {
    if (!favorites.find((f) => f.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFromFavorite = (id) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((f) => f.id === id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorite, removeFromFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}