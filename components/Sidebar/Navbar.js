import { IconButton, Flex } from '@chakra-ui/react';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

const Navbar = ({ parent, onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 96 }}
      px={{ base: 1, md: 2 }}
      h={{ base: 12, md: 14 }}
      align="center"
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        variant="ghost"
        size="md"
        aria-label="open sidebar"
        icon={<HamburgerIcon boxSize={6} color="gray" />}
        onClick={onOpen}
      />
      {parent && parent.substring(0, 5) !== 'root-' && (
        <NextLink href={`/folder/${parent}`} passHref>
          <IconButton
            as="a"
            variant="ghost"
            size="md"
            aria-label="Parent folder"
            icon={<ChevronLeftIcon boxSize={8} color="gray" />}
          />
        </NextLink>
      )}
    </Flex>
  );
};

export default Navbar;

// import { IconButton, Flex } from '@chakra-ui/react';
// import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
// import NextLink from 'next/link';

// const Navbar = ({ parent, onOpen, ...rest }) => {
//   return (
//     <>
//       {parent && parent.substring(0, 5) !== 'root-' ? (
//         <Flex
//           ml={{ base: 0, md: 96 }}
//           px={{ base: 1, md: 2 }}
//           align="center"
//           justify={{ base: 'space-between', md: 'flex-start' }}
//           {...rest}
//         >
//           <NextLink href={`/folder/${parent}`} passHref>
//             <IconButton
//               as="a"
//               variant="ghost"
//               size="md"
//               aria-label="Parent folder"
//               icon={<ChevronLeftIcon boxSize={6} color="gray" />}
//             />
//           </NextLink>
//           <IconButton
//             display={{ base: 'flex', md: 'none' }}
//             variant="ghost"
//             size="md"
//             aria-label="open sidebar"
//             icon={<HamburgerIcon boxSize={6} color="gray" />}
//             onClick={onOpen}
//           />
//         </Flex>
//       ) : (
//         <Flex
//           ml={{ base: 0, md: 96 }}
//           px={{ base: 1, md: 2 }}
//           align="center"
//           justify="flex-end"
//           {...rest}
//         >
//           <IconButton
//             display={{ base: 'flex', md: 'none' }}
//             variant="ghost"
//             size="md"
//             aria-label="open sidebar"
//             icon={<HamburgerIcon boxSize={6} color="gray" />}
//             onClick={onOpen}
//           />
//         </Flex>
//       )}
//     </>
//   );
// };

// export default Navbar;
