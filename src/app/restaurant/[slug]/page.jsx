import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import PropTypes from "prop-types";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton"; // Composant client séparé
import MenuItem from "@/components/MenuItem/MenuItem";
import OrderButton from "@/components/OrderButton/OrderButton";
import restaurants from "@/data/restaurants.json";
import styles from "./page.module.css";

async function fetchRestaurant(slug) {
	const restaurant = restaurants.restaurants.find((r) => r.slug === slug);
	if (!restaurant) return undefined;
	return restaurant;
}

export default async function Restaurant({ params }) {
	const { slug } = await params;
	const restaurant = await fetchRestaurant(slug);

	if (!restaurant) {
		notFound();
	}

	// Lecture du cookie côté serveur
	const cookieStore = await cookies();
	const favoritesCookie = cookieStore.get("favorites")?.value;
	let favorites = {};
	if (favoritesCookie) {
		try {
			favorites = JSON.parse(decodeURIComponent(favoritesCookie));
		} catch (e) {
			favorites = {};
			console.error(
				"Erreur lors de la lecture des favoris depuis le cookie :",
				e,
			);
		}
	}

	const isLiked = !!favorites[restaurant.id];
	const entrees = restaurant.menu.entrées;
	const plats = restaurant.menu.plats;
	const desserts = restaurant.menu.desserts;

	return (
		<main className={styles.main}>
			<section className={styles.banniereRestaurant}>
				<Image
					width={1024}
					height={383}
					src={restaurant.image}
					alt={`plat du restaurant ${restaurant.name}`}
				/>
			</section>
			<article className={styles.carteRestaurant}>
				<section className={styles.en_tete}>
					<h2 className={styles.restaurantName}>{restaurant.name}</h2>
					{/* Composant client séparé pour la manipulation */}
					<FavoriteButton
						restaurantId={restaurant.id}
						initialIsLiked={isLiked}
					/>
				</section>
				<section className={`${styles.foodList} ${styles.entreesSection}`}>
					<h3>ENTRÉES</h3>
					<div className={styles.foodItem}>
						{entrees.map((item, index) => (
							<MenuItem
								key={`entree-${crypto.randomUUID()}`}
								item={item}
								index={index}
							/>
						))}
					</div>
				</section>
				<section className={`${styles.foodList} ${styles.platsSection}`}>
					<h3>PLATS</h3>
					<div className={styles.foodItem}>
						{plats.map((item, index) => (
							<MenuItem
								key={`plat-${crypto.randomUUID()}`}
								item={item}
								index={index}
							/>
						))}
					</div>
				</section>
				<section className={`${styles.foodList} ${styles.dessertsSection}`}>
					<h3>DESSERTS</h3>
					<div className={styles.foodItem}>
						{desserts.map((item, index) => (
							<MenuItem
								key={`dessert-${crypto.randomUUID()}`}
								item={item}
								index={index}
							/>
						))}
					</div>
				</section>
				<OrderButton />
			</article>
		</main>
	);
}

Restaurant.propTypes = {
	params: PropTypes.shape({
		slug: PropTypes.string.isRequired,
	}).isRequired,
};
