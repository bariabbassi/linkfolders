import { SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

import PricingCard from '@/components/Premium/PricingCard';

const PricingGrid = () => {
  const [color, setColor] = useState('#aabbcc');

  return (
    <>
      <HexColorPicker color={color} onChange={setColor} />
      <HexColorInput color={color} onChange={setColor} />
    </>
  );
};

export default PricingGrid;
