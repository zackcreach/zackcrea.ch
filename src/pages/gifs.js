import { useState, useEffect } from "react";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { Layer, Button } from "grommet";

import Header from "../components/header";
import GifForm from "../components/gifForm";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClickLayer() {
    setIsModalOpen((prevState) => !prevState);
  }

  return (
    <>
      <Head>
        <title>Gif Master 5000</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header setIsModalOpen={setIsModalOpen} />

      <main>
        <Button label="Yes" onClick={handleClickLayer} />

        {isModalOpen && (
          <Layer
            onClickOutside={handleClickLayer}
            onEsc={handleClickLayer}
            modal
          >
            <GifForm />
          </Layer>
        )}
      </main>
    </>
  );
}
