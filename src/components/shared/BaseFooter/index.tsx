import styles from "./index.module.css";
export const BaseFooter = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer-copy-right"]}>
        &copy; 2023 zi @iz_dot. All Rights Reserved.
      </p>
    </footer>
  );
};
