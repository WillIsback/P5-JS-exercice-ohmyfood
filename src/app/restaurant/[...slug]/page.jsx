import { notFound } from 'next/navigation';
import Image from 'next/image';
import restaurantsData from '@/data/restaurants.json';
import RestaurantHeader from '@/components/RestaurantHeader/RestaurantHeader';
import MenuItem from '@/components/MenuItem/MenuItem';

export default async function RestaurantPage({ params }) {
  const {slug} = await params;
  const restaurant = restaurantsData.restaurants.find(r => r.slug === slug[0]);
  
  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <div className="heroImage">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          priority
          className="image"
        />
      </div>

      <div className="mainWrapper">
        <div className="contentWrapper">
          <RestaurantHeader name={restaurant.name} />

          <div className="menu">
            <section>
              <h3 className="sectionTitle">ENTRÉES</h3>
              {restaurant.menu.entrées.map((item, index) => (
                <MenuItem key={index} item={item} index={index} />
              ))}
            </section>

            <section>
              <h3 className="sectionTitle">PLATS</h3>
              {restaurant.menu.plats.map((item, index) => (
                <MenuItem key={index} item={item} index={index} />
              ))}
            </section>

            <section>
              <h3 className="sectionTitle">DESSERTS</h3>
              {restaurant.menu.desserts.map((item, index) => (
                <MenuItem key={index} item={item} index={index} />
              ))}
            </section>
          </div>

          <button className="orderButton">Commander</button>
        </div>
      </div>
    </>
  );
} 