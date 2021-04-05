import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Heading,
  Box,
  FileInput,
  Button,
  FormField,
  TextInput,
  Form,
  Select,
  Spinner,
  Image,
  Text,
} from "grommet";
import { Close } from "grommet-icons";
import { getErrorMessage } from "../../lib/form";

export default function GifForm() {
  const defaultValue = {
    file: {},
    url: "",
    name: "",
    tags: [],
  };

  const defaultOptions = [];
  const newTagPrefix = "Create new tag";

  const [tagOptions, setTagOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState({});
  const [value, setValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  const [addGif] = useMutation(AddGifMutation);

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

      const url = data.Location;
      const name = value.name || data.Key.replace(/\.\w+/, "");
      handleChange({ ...value, url, name });
    } catch (error) {
      setError({ message: getErrorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { name, url, tags } = event.value;

      await addGif({
        variables: {
          name,
          url,
          tags,
        },
      });
    } catch (error) {
      setError({ message: getErrorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    handleChange(defaultValue);
  }

  function handleChange(nextValue) {
    setValue(nextValue);
  }

  function handleClickRemoveTag(event) {
    const name = event.currentTarget.name;
    const tags = value.tags.filter((tag) => tag !== name);
    const nextValue = { ...value, tags };
    handleChange(nextValue);
  }

  function handleChangeSelectTag(event) {
    const option = event.option;
    let tags = [];

    if (option.includes(newTagPrefix)) {
      defaultOptions.pop();
      defaultOptions.push(searchValue);
      tags = [...value.tags, searchValue];
    } else {
      tags = [...value.tags, option];
    }

    const nextValue = { ...value, tags };
    handleChange(nextValue);
  }

  return (
    <Box pad="large" gap="medium" width="medium">
      <Box direction="row" justify="between">
        <Heading level="3">Upload New Gif</Heading>
        {isLoading && <Spinner />}
      </Box>

      <Form
        value={value}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onReset={handleReset}
      >
        <Box pad={value.url && { bottom: "medium" }}>
          <Image src={value.url} />
        </Box>

        <Box pad={{ bottom: "medium" }}>
          <FileInput
            onChange={handleChangeFile}
            disabled={isLoading}
            renderFile={(file) => (
              <Box direction="row" gap="small" pad={{ left: "medium" }}>
                <Text weight="bold">{file.name}</Text>
                <Text color="text-weak">{Math.round(file.size / 100)}kb</Text>
              </Box>
            )}
          />
        </Box>

        <FormField name="name" htmlFor="name-input-id" label="Name">
          <TextInput htmlFor="name-input-id" name="name" />
        </FormField>

        <Box pad={{ bottom: "small" }}>
          <FormField name="tags" htmlFor="tags-input-id" label="Tags">
            <Box
              direction="row"
              pad={
                value.tags?.length ? { bottom: "xsmall", top: "xsmall" } : {}
              }
              wrap
            >
              {value.tags?.map((tag) => (
                <Box pad={{ right: "xsmall", bottom: "xsmall" }}>
                  <Button
                    size="small"
                    name={tag}
                    type="button"
                    label={tag}
                    icon={<Close size="small" />}
                    onClick={handleClickRemoveTag}
                    reverse
                  />
                </Box>
              ))}
            </Box>

            <Select
              name="tags"
              id="tags-input-id"
              options={tagOptions}
              onChange={handleChangeSelectTag}
              onClose={() => setTagOptions(defaultOptions)}
              onSearch={(text) => {
                _updateCreateOption(text, defaultOptions, newTagPrefix);
                const regex = _getRegExp(text);
                setTagOptions(
                  defaultOptions.filter((option) => regex.test(option))
                );
                setSearchValue(text);
              }}
            />
          </FormField>
        </Box>

        {error.message && (
          <Box pad={{ bottom: "medium", top: "medium" }}>
            <Text color="status-error">{error.message}</Text>
          </Box>
        )}

        <Box direction="row" gap="xsmall">
          <Button type="submit" label="Submit" disabled={isLoading} primary />

          <Button type="reset" label="Reset" disabled={isLoading} />
        </Box>
      </Form>
    </Box>
  );
}

const AddGifMutation = gql`
  mutation AddGifMutation($name: String!, $url: String!, $tags: [String]) {
    addGif(input: { name: $name, url: $url, tags: $tags }) {
      gif {
        id
        name
        url
        tags
        created_ts
        updated_ts
      }
    }
  }
`;

function _updateCreateOption(text, defaultOptions, prefix) {
  const length = defaultOptions.length;
  if ((defaultOptions[length - 1] || "").includes(prefix)) {
    defaultOptions.pop();
  }
  defaultOptions.push(`${prefix} '${text}'`);
}

function _getRegExp(text) {
  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  return new RegExp(escapedText, "i");
}
