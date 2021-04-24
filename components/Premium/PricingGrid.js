import { SimpleGrid } from '@chakra-ui/react';

import PricingCard from '@/components/Premium/PricingCard';

const PricingGrid = () => {
  return (
    <SimpleGrid
      mt={16}
      columns={{
        base: 1,
        lg: 2
      }}
      spacing={{
        base: '8',
        lg: '5'
      }}
      maxW="7xl"
    >
      <PricingCard
        name={'Free'}
        price={'$0'}
        model={'/ month'}
        features={[
          'Your personal Linkfolders link',
          'Unlimited number of links',
          'Unlimited number of folders'
        ]}
        isHighlited={false}
      />
      <PricingCard
        name={'Premium'}
        price={'$9'}
        model={'/ month'}
        features={[
          'Your personal Linkfolders link',
          'Unlimited number of links',
          'Unlimited number of folders',
          'Customise apperance',
          'Hide Linkfolders logo'
        ]}
        isHighlited={true}
      />
    </SimpleGrid>
  );
};

export default PricingGrid;
