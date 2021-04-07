import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { initializeApollo } from "../../apollo/client";
import {
  Layer,
  Image,
  Button,
  Grid,
  Box,
  ResponsiveContext,
  Text,
} from "grommet";
import { Close } from "grommet-icons";

import Header from "../components/header";
import GifForm from "../components/gifForm";
import { WindowsLegacy } from "grommet-icons";

export default function Home(props) {
  const size = useContext(ResponsiveContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeGif] = useMutation(RemoveGifMutation);

  function handleClickLayer() {
    setIsModalOpen((prevState) => !prevState);
  }

  async function handleClickDelete(event) {
    const id = event.target.id;

    try {
      const response = await removeGif({
        variables: { id },
      });

      const success = response?.data?.removeGif?.success;

      if (success === true) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Gif Master 5000</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header handleClickLayer={handleClickLayer} />

      <main>
        <Box pad="large">
          {props.error && <Text color="status-error">{props.error}</Text>}
          <Grid columns={size !== "small" ? "small" : "100%"} gap="small">
            {props.gifs?.map((node) => (
              <Box key={node.id} style={{ position: "relative" }}>
                <Close
                  size="small"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                  color="white"
                  id={node.id}
                  onClick={handleClickDelete}
                />

                <Image
                  src={node.url}
                  fit="cover"
                  style={{ borderRadius: "5px" }}
                />
              </Box>
            ))}
          </Grid>
        </Box>

        {isModalOpen && (
          <Layer
            onClickOutside={handleClickLayer}
            onEsc={handleClickLayer}
            modal
          >
            <GifForm handleClickLayer={handleClickLayer} />
          </Layer>
        )}
      </main>
    </>
  );
}

const RemoveGifMutation = gql`
  mutation RemoveGifMutation($id: String!) {
    removeGif(input: { id: $id }) {
      success
    }
  }
`;

const GifsQuery = gql`
  query GifsQuery {
    gifs {
      id
      name
      url
      tags
    }
  }
`;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  try {
    const response = await apolloClient.query({
      query: GifsQuery,
    });

    const gifs = response?.data?.gifs || [];

    return {
      props: {
        gifs,
      },
    };
  } catch (error) {
    return {
      props: {
        gifs: [],
        error: JSON.stringify(error),
      },
    };
  }
}
