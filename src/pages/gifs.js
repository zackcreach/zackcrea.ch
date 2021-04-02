import { useState, useEffect } from "react";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { Box, FileInput } from "grommet";

export default function Home() {
  const [url, setUrl] = useState(null);
  const [uploadFile] = useMutation(UploadFileMutation);

  useEffect(() => console.log(url), [url]);

  async function handleChange(event) {
    const fileList = event.target.files;

    for (let index = 0; index < fileList.length; index += 1) {
      const file = fileList[index];

      try {
        const fileUrl = await uploadFile({
          variables: {
            file,
          },
        });

        setUrl(fileUrl);
      } catch (error) {
        console.log(error);
      }
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

const UploadFileMutation = gql`
  mutation UploadFileMutation($file: FileUpload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;
