import styles from './OrderButton.module.css';

export default function OrderButton () {

    return (
        <button className={styles.OrderButton} >
            <span>Commander</span>
        </button>
    )
}