import { gql, useMutation } from "@apollo/client";
import { Image, Box } from "grommet";
import { Close } from "grommet-icons";

import styles from "./gifCard.module.css";

export default function GifCard(props) {
  const [removeGif] = useMutation(RemoveGifMutation);

  async function handleClickDelete(event) {
    const id = event.target.id;
    const filename = event.target.dataset?.filename;

    try {
      await fetch(`/api/image/delete?filename=${filename}`, { method: "POST" });
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await removeGif({
        variables: { id },
      });

      const success = response?.data?.removeGif?.success;

      if (success === true) {
        props.refreshGifs();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box key={props.id} style={{ position: "relative" }}>
      <div
        className={styles.closeContainer}
        onClick={handleClickDelete}
        id={props.id}
        data-filename={props.file?.filename}
      >
        <Close size="small" color="white" />
      </div>

      <Image
        src={props.file?.url}
        fit="cover"
        style={{ borderRadius: "5px" }}
      />
    </Box>
  );
}

const RemoveGifMutation = gql`
  mutation RemoveGifMutation($id: String!) {
    removeGif(input: { id: $id }) {
      success
    }
  }
`;
