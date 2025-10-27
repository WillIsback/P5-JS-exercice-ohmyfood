import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styles from "./MenuItem.module.css";

export default function MenuItem({ item, index }) {
	return (
		<div className={styles.menuItem} data-index={index}>
			<div className={styles.menuContentNprice}>
				<div className={styles.menuItem__content}>
					<h4>{item.nom}</h4>
					<p>{item.description}</p>
				</div>
				<span className={styles.menuItem__price}>{item.prix}</span>
			</div>
			<div className={styles.menuItem__icon}>
				<FontAwesomeIcon
					className={styles.menuItem__icon__svg}
					icon={faCircleCheck}
					fontSize={"20px"}
				/>
			</div>
		</div>
	);
}

MenuItem.propTypes = {
	item: PropTypes.shape({
		nom: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		prix: PropTypes.string.isRequired,
	}).isRequired,
	index: PropTypes.number.isRequired,
};
