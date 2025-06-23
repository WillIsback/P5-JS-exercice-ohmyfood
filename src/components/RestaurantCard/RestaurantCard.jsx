'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './RestaurantCard.module.css';
import { useState } from 'react';

export default function RestaurantCard({ name, slug, location, image, isNew = false }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Link href={`/restaurant/${slug}`}>
        <Image
          src={image}
          alt={name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        </Link>
        {isNew && <span className={styles.newBadge}>Nouveau</span>}
      </div>
      <div className={styles.content}>
        <Link href={`/restaurant/${slug}`}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.location}>{location}</p>
        </Link>
      </div>
      <button 
        className={`${styles.favoriteButton} ${isLiked ? styles.liked : ''}`}
        onClick={() => setIsLiked(!isLiked)}
        aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill={isLiked ? "url(#gradient)" : "none"} 
          stroke="currentColor" 
          strokeWidth="2"
          className={styles.heartIcon}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF79DA" />
              <stop offset="100%" stopColor="#9356DC" />
            </linearGradient>
          </defs>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </article>
  );
} 