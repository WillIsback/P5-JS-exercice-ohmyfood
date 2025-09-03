import { cookies } from "next/headers";
import {restaurants} from "@/data/restaurants.json";
import styles from "./page.module.css";
import MenuItem from "@/components/MenuItem/MenuItem";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton"; // Composant client séparé
import { notFound } from 'next/navigation'


async function fetchRestaurant(slug) {
  const restaurant = restaurants.find(r => r.slug === slug);
  if (!restaurant) return undefined
  return restaurant
}

export default async function Restaurant({ params }) {
  const { slug } = await params;
  const restaurant = await fetchRestaurant(slug)

  if (!restaurant) {
    notFound()
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
    }
  }
  
  const isLiked = !!favorites[restaurant.id];
  const entrees = restaurant.menu["entrées"];
  const plats = restaurant.menu["plats"];
  const desserts = restaurant.menu["desserts"];

  return (
    <main className={styles.main}>
      <section className={styles.banniereRestaurant}>
        <img 
          src={restaurant.image} 
          alt={`image de plat du restaurant ${restaurant.name}`}
          title={`image de plat du restaurant ${restaurant.name}`} 
        />
      </section>
      <article className={styles.carteRestaurant}>
        <section className={styles.en_tete}>
          <h2 className={styles.restaurantName}>{restaurant.name}</h2>
          {/* Composant client séparé pour la manipulation */}
          <FavoriteButton restaurantId={restaurant.id} initialIsLiked={isLiked} />
        </section>
        <section className={`${styles.foodList} ${styles.entreesSection}`}>
          <h3>ENTRÉES</h3>
          <div className={styles.foodItem}>
            {entrees.map((item, index) => (
              <MenuItem key={`entree-${index}`} item={item} index={index} />
            ))}
          </div>
        </section>
        <section className={`${styles.foodList} ${styles.platsSection}`}>
          <h3>PLATS</h3>
          <div className={styles.foodItem}>
            {plats.map((item, index) => (
              <MenuItem key={`plat-${index}`} item={item} index={index} />
            ))}
          </div>
        </section>
        <section className={`${styles.foodList} ${styles.dessertsSection}`}>
          <h3>DESSERTS</h3>
          <div className={styles.foodItem}>
            {desserts.map((item, index) => (
              <MenuItem key={`dessert-${index}`} item={item} index={index} />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}