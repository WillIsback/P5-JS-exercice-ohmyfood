'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Steps from "@/components/Steps/Steps";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import {restaurants} from "@/data/restaurants.json";
import Link from 'next/link'

export default function Home() {
  const [favorites, setFavorites] = useState({});
  const [hydrated, setHydrated] = useState(false);


  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )favorites=([^;]*)/);
    const saved = match ? JSON.parse(decodeURIComponent(match[1])) : {};
    setFavorites(saved);
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  function handleAddFavorite(isLiked, id) {
    setFavorites(prev => {
      const updated = { ...prev, [id]: isLiked };
      document.cookie = `favorites=${encodeURIComponent(JSON.stringify(updated))}; path=/`;
      return updated;
    });
  }

  return (
    <>
      <div className={styles.location}>
        <Image src="/icons/location.svg" alt="" width={16} height={16} />
        <span>Paris, Belleville</span>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Réservez le menu qui vous convient</h1>
          <p>Découvrez des restaurants d'exception, sélectionnés par nos soins.</p>
          <button className={styles.cta}>Explorer nos restaurants</button>
        </div>
      </section>

      <Steps />

      <section className={styles.restaurants}>
        <div className={styles.restaurantsContent}>
          <h2>Restaurants</h2>
          <div className={styles.restaurantGrid}>
            {restaurants.map((item) => (
              <Link key={item.id} href={`/restaurant/${item.slug}`}>
                <RestaurantCard 
                  handleAddFavorite={handleAddFavorite}
                  isLiked={favorites[item.id] || false}
                  className={styles.restaurantCard} 
                  key={item.id} 
                  restaurant={item}/>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

