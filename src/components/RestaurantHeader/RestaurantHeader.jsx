"use client";

import PropTypes from "prop-types";
import { useContext } from "react";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton"; // Composant client séparé
import { FavoritesContext } from "../../app/Contexts";

export default function RestaurantHeader({ name, id }) {
	const { favorites } = useContext(FavoritesContext);
	const isLiked = !!favorites[id]; // Calcule isLiked localement

	return (
		<div className="restaurantHeader">
			<h2 className="restaurantName">{name}</h2>
			<FavoriteButton restaurantId={restaurant.id} initialIsLiked={isLiked} />
		</div>
	);
}

RestaurantHeader.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};
