import {restaurants} from "@/data/restaurants.json";

export default async function Restaurant ({ params }) {
  const { slug } = await params
  const restaurant = restaurants.find(r => r.slug === slug);

  if (!restaurant) return <div>Restaurant introuvable</div>;

  return <main>
        <section ClassName="banniereRestaurant">
            <img src={restaurant.image} 
                alt={`image de plat du restaurant ${restaurant.name}`}
                title={`image de plat du restaurant ${restaurant.name}`} 
            />
        </section>
        <article ClassName="carteRestaurant">
            <section ClassName="en-tete">
                <h2 className="restaurantName">{restaurant.name}</h2>

            </section>

        </article>
    </main>
}