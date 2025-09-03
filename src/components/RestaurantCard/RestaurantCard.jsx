import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RestaurantHeader from '../RestaurantHeader/RestaurantHeader';
import MenuItem from '../MenuItem/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretUp } from '@fortawesome/free-solid-svg-icons';

{/* <FontAwesomeIcon icon={faSquareCaretDown} /> */}
export default function RestaurantCard({className, restaurant, handleAddFavorite, isLiked}){
    const [menuData, setMenuData] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const data = Object.entries(restaurant.menu)
            .flatMap(([type, items]) =>
                items.map(item => ({ ...item, id: uuidv4(), type }))
            );
        setMenuData(data);
    }, [restaurant.menu]);

    return(
        <article className={className}>
            <RestaurantHeader name={restaurant.name} handleAddFavorite={handleAddFavorite} id={restaurant.id} isLiked={isLiked}/>
            <div className='cardContent'>
                <section>
                    <FontAwesomeIcon icon={faLocationDot} /> {restaurant.location}  
                </section>
                {restaurant.isNew && <aside> <b>Nouveauté</b> ✨</aside>}
            </div>
            <h3>
                {    
                    restaurant.slug
                        .replaceAll('-', ' ')
                        .replace(/^./, c => c.toUpperCase())
                }
            </h3>
            <figure>
                <img src={restaurant.image} 
                    alt={`image de plat du restaurant ${restaurant.name}`}
                    title={`image de plat du restaurant ${restaurant.name}`} 
                />
                {/* <figcaption>{`image de plat du restaurant ${restaurant.name}`}</figcaption> */}
            </figure>
            <div className='Menu'>
                <button 
                    className="toggleLabel"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-controls="menu-restaurant-slug"
                >
                {open ? (
                    <span>
                        Marquer la carte <FontAwesomeIcon icon={faSquareCaretUp} />
                    </span>
                ) : (
                    <span>
                        Voir la carte <FontAwesomeIcon icon={faSquareCaretDown} />
                    </span>
                )}    
                </button>
                {open && (
                    <section className="fold" id="menu-restaurant-slug">
                        {menuData.map((item, index) => (
                            <MenuItem key={item.id} item={item} index={index} />
                        ))}
                    </section>
                )}
            </div>
        </article>
    );
}
