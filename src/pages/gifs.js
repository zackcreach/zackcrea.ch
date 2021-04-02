import { useState, useEffect } from "react";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { Box, FileInput } from "grommet";

export default function Home() {
  const [url, setUrl] = useState(null);

  useEffect(() => console.log(url), [url]);

  async function handleChange(event) {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      setUrl(result);
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

      <main>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <FileInput onChange={handleChange} />
          </Box>
        </Box>
      </main>
    </>
  );
}
