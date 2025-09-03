'use client';

import { useContext } from 'react';
import { FavoritesContext } from '../../app/Contexts';
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton"; // Composant client séparé

export default function RestaurantHeader({ name, id }) {
  const { favorites, handleAddFavorite } = useContext(FavoritesContext);
  const isLiked = !!favorites[id]; // Calcule isLiked localement

  function handleClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    handleAddFavorite(!isLiked, id);
  }

  return (
    <div className="restaurantHeader">
      <h2 className="restaurantName">{name}</h2>
      <FavoriteButton restaurantId={restaurant.id} initialIsLiked={isLiked} />
    </div>
  );
}