import { Stack, Heading, Text, Button, Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HexColorPicker, HexColorInput } from 'react-colorful';

const AppearancePremium = () => {
  const [backgroundColor, setBackgroundColor] = useState('#aabbcc');
  const [textColor, setTextColor] = useState('#aabbcc');
  const { handleSubmit } = useForm({ mode: 'onChanged' });

  const onSubmit = (values) => {
    console.log('colors changed', backgroundColor, textColor);
  };

  return (
    <Stack spacing={12} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Heading size="md">Background color</Heading>
        <Text>
          <HexColorInput
            color={backgroundColor}
            onChange={setBackgroundColor}
          />
        </Text>
        <HexColorPicker color={backgroundColor} onChange={setBackgroundColor} />
      </Stack>

      <Stack>
        <Heading size="md">Text color</Heading>
        <Text>
          <HexColorInput color={textColor} onChange={setTextColor} />
        </Text>
        <HexColorPicker color={textColor} onChange={setTextColor} />
      </Stack>

      <Stack>
        <Heading size="md">Hide Linkfolders logo</Heading>
        <Switch colorScheme="yellow" size="lg" />
      </Stack>

      <Stack direction="row">
        <Button colorScheme="yellow" type="submit">
          Save changes
        </Button>
        <Button type="submit">Cancel</Button>
      </Stack>
    </Stack>
  );
};

export default AppearancePremium;
