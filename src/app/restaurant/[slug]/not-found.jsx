import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
	return (
		<div className={styles.errorPage}>
			<h2>Erreur 404 Not Found 🛑</h2>
			<p>Le restaurant n'existe pas 😭</p>
			<Link href="/">
				<span>Retourner à l'accueil</span>
			</Link>
		</div>
	);
}
