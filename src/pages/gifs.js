import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { gql, useLazyQuery } from "@apollo/client";
import { initializeApollo } from "../../apollo/client";
import { Layer, Text, Grid, Box, ResponsiveContext } from "grommet";
import { getErrorMessage } from "../../lib/form";

import styles from "./gifs.module.css";
import Header from "../components/header";
import GifForm from "../components/gifForm";
import GifCard from "../components/gifCard";

export default function Home(props) {
  const [refreshGifs, refreshGifsResponse] = useLazyQuery(GifsQuery, {
    fetchPolicy: "network-only",
  });

  const size = useContext(ResponsiveContext);
  const [gifs, setGifs] = useState(props.gifs);
  const [error, setError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (refreshGifsResponse.called === false) {
      return;
    }

    if (refreshGifsResponse.error) {
      setError({ message: getErrorMessage(refreshGifsResponse.error) });
    } else if (refreshGifsResponse.data) {
      const gifs = refreshGifsResponse.data?.gifs || [];

      setGifs(gifs);
    }
  }, [refreshGifsResponse]);

  function handleClickLayer() {
    setIsModalOpen((prevState) => !prevState);
  }

  return (
    <>
      <Head>
        <title>Gif Master 5000</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header handleClickLayer={handleClickLayer} />

      <main>
        {error.message && <Text color="status-error">{error.message}</Text>}

        <Box pad="large">
          <Grid columns={size !== "small" ? "small" : "100%"} gap="small">
            {gifs.map((gif) => (
              <GifCard {...gif} refreshGifs={refreshGifs} key={gif.name} />
            ))}
          </Grid>
        </Box>

        {isModalOpen && (
          <Layer
            onClickOutside={handleClickLayer}
            onEsc={handleClickLayer}
            modal
          >
            <GifForm
              handleClickLayer={handleClickLayer}
              refreshGifs={refreshGifs}
            />
          </Layer>
        )}
      </main>
    </>
  );
}

const GifsQuery = gql`
  query GifsQuery {
    gifs {
      id
      file
      name
      tags
    }
  }
`;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const props = { gifs: [] };

  try {
    const response = await apolloClient.query({
      query: GifsQuery,
    });

    props.gifs = response?.data?.gifs || [];
  } catch (error) {
    props.error = JSON.stringify(error);
  } finally {
    return {
      props,
    };
  }
}
