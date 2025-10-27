"use client";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { FavoritesContext } from "./Contexts.jsx";

export default function FavoritesProvider({ children, initialFavorites = {} }) {
	const [favorites, setFavorites] = useState(initialFavorites);

	const handleAddFavorite = useCallback(async (isLiked, id) => {
		setFavorites((prev) => {
			const updated = { ...prev, [id]: isLiked };
			navigator.cookieStore.set("favorites", {
				value: encodeURIComponent(JSON.stringify(updated)),
				path: "/",
			});
			return updated;
		});
	}, []);

	const isLiked = useCallback((id) => !!favorites[id], [favorites]);

	const value = useMemo(
		() => ({
			favorites,
			handleAddFavorite,
			isLiked,
		}),
		[favorites, handleAddFavorite, isLiked],
	);

	return (
		<FavoritesContext.Provider value={value}>
			{children}
		</FavoritesContext.Provider>
	);
}

FavoritesProvider.propTypes = {
	children: PropTypes.node.isRequired,
	initialFavorites: PropTypes.object,
};
FavoritesProvider.defaultProps = {
	initialFavorites: {},
};
