import { Box, Text, render } from 'ink';
import * as React from 'react';

function Init() {
  return (
    <Box flexDirection="column" paddingLeft={2} paddingTop={1} paddingBottom={1}>
      <Box marginBottom={1}>
        <Text color="blueBright">🥳 init!</Text>
      </Box>
    </Box>
  );
}

export function printInitBanner() {
  const { unmount } = render(<Init />);
  unmount();
}
