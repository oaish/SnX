import styles from "./canvasBackground.module.css"
const CanvasBackground = ({ children }) => {
    return (
        <div className={styles.white_backdrop}>
            <div className={styles.inner}>{children}</div>
        </div>
    )
}

export default CanvasBackground
