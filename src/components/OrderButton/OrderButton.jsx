import styles from "./OrderButton.module.css";

export default function OrderButton() {
	return (
		<button type="button" className={styles.OrderButton}>
			<span className={styles.OrderButton__span}>Commander</span>
		</button>
	);
}
