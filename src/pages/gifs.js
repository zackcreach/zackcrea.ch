import { useState, useEffect } from "react";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import {
  Heading,
  Layer,
  Box,
  FileInput,
  Button,
  FormField,
  TextInput,
  Form,
  Select,
  Spinner,
  Image,
} from "grommet";
import { Close } from "grommet-icons";

export default function Home() {
  const defaultValues = {
    name: "",
    url: "",
    tags: [],
  };

  const prefix = "Create new tag";
  const defaultOptions = ["excellent"];

  const [tagOptions, setTagOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [url, setUrl] = useState(defaultValues.url);
  const [name, setName] = useState(defaultValues.name);
  const [tags, setTags] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  function handleClickClose() {
    setIsModalOpen(false);
  }

  function handleClickOpen() {
    setIsModalOpen(true);
  }

  async function handleChangeName(event) {
    const value = event.target.value;
    setName(value);
  }

  async function handleChangeFile(event) {
    setIsLoading(true);

    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const { data } = await response.json();

      setUrl(data.Location);
      setName((prevState) => prevState || data.Key.replace(/\.\w+/, ""));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event) {
    console.log("Submit", event);
  }

  function handleClickTag(event) {
    const name = event.currentTarget.name;
    setTags((prevState) => prevState.filter((tag) => tag !== name));
  }

  function handleChangeSelect(event) {
    const option = event.option;

    if (option.includes(prefix)) {
      defaultOptions.pop();
      defaultOptions.push(searchValue);
      setTags((prevState) => [...prevState, searchValue]);
    } else {
      setTags((prevState) => [...prevState, option]);
    }
  }

  function updateCreateOption(text) {
    const length = defaultOptions.length;
    if (defaultOptions[length - 1].includes(prefix)) {
      defaultOptions.pop();
    }
    defaultOptions.push(`${prefix} '${text}'`);
  }

  function getRegExp(text) {
    const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    return new RegExp(escapedText, "i");
  }

  return (
    <>
      <Head>
        <title>Gif Master 5000</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button label="Yes" onClick={handleClickOpen} />

        {isModalOpen && (
          <Layer
            onClickOutside={handleClickClose}
            onEsc={handleClickClose}
            modal
          >
            <Box pad="large" gap="medium" width="medium">
              <Box direction="row" justify="between">
                <Heading level="3">Upload New Gif</Heading>
                {isLoading && <Spinner />}
              </Box>

              <Form onSubmit={handleSubmit}>
                <Box pad={url && { bottom: "medium" }}>
                  <Image src={url} />
                </Box>

                <Box pad={{ bottom: "medium" }}>
                  <FileInput onChange={handleChangeFile} disabled={isLoading} />
                </Box>

                <FormField label="Name">
                  <TextInput value={name} onChange={handleChangeName} />
                </FormField>

                <Box pad={{ bottom: "small" }}>
                  <FormField label="Tags">
                    <Box
                      direction="row"
                      pad={tags.length && { bottom: "xsmall", top: "xsmall" }}
                    >
                      {tags.map((tag) => (
                        <Box pad={{ right: "xsmall" }}>
                          <Button
                            size="small"
                            name={tag}
                            type="button"
                            label={tag}
                            icon={<Close size="small" />}
                            onClick={handleClickTag}
                            reverse
                          />
                        </Box>
                      ))}
                    </Box>

                    <Select
                      options={tagOptions}
                      onChange={handleChangeSelect}
                      onClose={() => setTagOptions(defaultOptions)}
                      onSearch={(text) => {
                        updateCreateOption(text);
                        const regex = getRegExp(text);
                        setTagOptions(
                          defaultOptions.filter((option) => regex.test(option))
                        );
                        setSearchValue(text);
                      }}
                    />
                  </FormField>
                </Box>

                <Button
                  type="submit"
                  label="Submit"
                  disabled={isLoading}
                  primary
                />
              </Form>
            </Box>
          </Layer>
        )}
      </main>
    </>
  );
}
