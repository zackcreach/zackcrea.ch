import Head from "next/head";
import styles from "./index.module.css";
import "../components/background";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.home}>
          <h1 className={styles.title}>Hi, I'm Zack.</h1>

          <h2>
            <a href="https://github.com/zackcreach" className={styles.link}>
              I build things on the Internet.{" "}
            </a>
          </h2>

          <h2>
            <a href="https://skylardenney.com" className={styles.link}>
              I'm married to Skylar Denney.
            </a>
          </h2>

          <h2>
            <a href="https://www.gifmaster5000.com" className={styles.link}>
              I love gifs.
            </a>
          </h2>
        </div>
      </main>
    </>
  );
}
