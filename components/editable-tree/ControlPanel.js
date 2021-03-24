import { Box, Flex, Button } from '@chakra-ui/react';

const ControlPanel = (props) => {
  const { hasSaved, saveState, loadState } = props;
  const renderLoadButton = () => {
    if (hasSaved) {
      return (
        <button
          className="ControlPanel-Button ControlPanel-Button_load"
          onClick={loadState}
        >
          Load
        </button>
      );
    }
    return null;
  };

  return (
    <Flex>
      <Button w="100%" onClick={saveState}>
        Save changes
      </Button>
      {renderLoadButton()}
    </Flex>
  );
};

export default ControlPanel;
