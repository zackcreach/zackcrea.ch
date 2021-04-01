import Head from "next/head";
import { Box } from "grommet";

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Gif Master 5000</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppBar>Hello Grommet!</AppBar>
      </main>
    </>
  );
}
