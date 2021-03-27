import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Hi, I'm Zack.</h1>

          <a href="https://github.com/zackcreach">
            I build things on the Internet.{" "}
          </a>

          <br />

          <a href="https://skylardenney.com">I'm married to Skylar Denney.</a>

          <br />

          <a href="https://www.flickr.com/photos/zackcreach">I shoot film.</a>
        </div>
      </main>
    </div>
  );
}
