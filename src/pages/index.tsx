import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Posts from "@/components/posts/views/Posts";
import PostsActionBar from "@/components/posts/views/PostsActionBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js + TanStack Query + Zustand Blog</title>
        <meta
          name="description"
          content="Learning Next.js with TanStack Query and Zustand"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <h1>Posts Management with TanStack Query & Zustand</h1>
          <PostsActionBar />
          <Posts />
        </div>
      </main>
    </>
  );
}
