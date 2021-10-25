import styles from "../Styles/Home.module.css";

export default function instruction() {
    return (
        <div>
            <body className={styles.body}>
            </body>
            <head>
                <title>Find My Mines</title>
            </head>
            <div style={{
            }} >
                <div style={{ textAlign: 'center' }}>
                    <h1 className={styles.txt} style={{ fontSize: "5rem" }}>How to play</h1>
                </div>
                <div className={styles.txt_align} style={{ fontSize: "2rem" }}>
                    <item className={styles.txt}>
                        <div>1. The first player is randomly selected. 🧑</div>
                        <div>2. There are many bombs (up to the grid size) randomly placed. 💣</div>
                        <div>
                            3. Each player has only 10 seconds on each turn to choose a slot. ⏲️
                        </div>
                        <div>4. The more bombs you find, the more points you earn. 💯</div>
                    </item>
                </div>
                <item style={{ fontWeight: "bold", textAlign: "center", fontSize: "2rem" }} className={styles.txt}>
                    <div>Find as many as you can. XD</div>
                </item>
                <div className={styles.bottom}>
                    <a href='index' className={styles.btn}>
                        Back Home 🏠
                    </a>
                </div>

            </div>
        </div >
    )
}