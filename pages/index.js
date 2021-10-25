import styles from "../Styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <body className={styles.body}>
      </body>
      <head>
        <title>Find My Mines</title>
      </head>
      <div style={{
        textAlign: 'center',
        marginTop: '30vh',
      }} >
        <div className={styles.center}>
          {/* <svg viewBox="0 0 500 500">
            <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" fill="none" />
            <text width="500" >
              <textPath href={"#curve"} className={styles.txt} textAlign="center">
                Dangerous Curves Ahead
              </textPath>
            </text>
          </svg> */}
          <h1 className={styles.txt} style={{ fontSize: "5rem" }}>Find My Mines</h1>
          <h2 className={styles.txt}>Do you mind? to Find My Mines</h2>
          <input
            type="text"
            placeholder='Enter Username'
            align="center"
            fontWeight="bold"
            className={styles.placeholder}
          />
        </div>
        <div className={styles.center}>
          <a href='index' className={styles.btn} style={{ textAlign: "left" }}>
            Begin 🔥
          </a>
          <a href='instruction' className={styles.btn} style={{ marginLeft: "2%", textAlign: "left" }}>
            How to play ❓
          </a>
        </div>

      </div>
    </div>
  );
}
