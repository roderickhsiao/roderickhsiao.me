import styles from './SmokeCanvas.module.css';

export default function SmokeCanvas() {
  return (
    <div className={styles.fogwrapper}>
      <div id="foglayer_01" className={styles.foglayer + ' ' + styles.foglayer01}>
        <div className={styles.image01}></div>
        <div className={styles.image02}></div>
      </div>
      <div id="foglayer_02" className={styles.foglayer + ' ' + styles.foglayer02}>
        <div className={styles.image01}></div>
        <div className={styles.image02}></div>
      </div>
      <div id="foglayer_03" className={styles.foglayer + ' ' + styles.foglayer03}>
        <div className={styles.image01}></div>
        <div className={styles.image02}></div>
      </div>
    </div>
  );
}
