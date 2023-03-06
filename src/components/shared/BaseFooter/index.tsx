import styles from "./index.module.css";
export const BaseFooter = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer-copy-right"]}>
        &copy; 2023 iz_dot / zi. All Rights Reserved.
      </p>
    </footer>
  );
};
