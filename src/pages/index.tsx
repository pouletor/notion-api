import Head from "next/head";

import FetchButton from "../components/FetchButton/FetchButton";
import Menu from "../components/Menu/Menu";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>API Notion</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu activeMenu="home" />
      <main className={styles.main}>
        <FetchButton />
      </main>
    </>
  );
}
