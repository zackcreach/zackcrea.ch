import {
  Header as GrommetHeader,
  Anchor,
  Box,
  ResponsiveContext,
  Menu,
} from "grommet";
import { Grommet as GrommetIcon, Menu as MenuIcon } from "grommet-icons";

export default function Header(props) {
  return (
    <GrommetHeader background="light-4" pad="medium" height="xsmall">
      <Anchor href="/" label="Gif Master 5000" />

      <ResponsiveContext.Consumer>
        {(size) =>
          size === "small" ? (
            <Box justify="end">
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: "bottom", right: "right" } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">Upload New Gif</Box>,
                    onClick: props.setIsModalOpen,
                  },
                ]}
              />
            </Box>
          ) : (
            <Box justify="end" direction="row" gap="medium">
              <Anchor label="Upload New Gif" onClick={props.handleClickLayer} />
              <Anchor label="Login" />
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </GrommetHeader>
  );
}
