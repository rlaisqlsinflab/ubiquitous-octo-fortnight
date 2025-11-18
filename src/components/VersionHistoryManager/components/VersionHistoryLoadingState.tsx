import { Box, Skeleton } from '@inflearn/ds-react';

export const VersionHistoryGroupLoadingState = () => {
  return (
    <>
      {Array(10)
        .fill('')
        .map((_, index) => (
          <Box p={16} key={index} w="100%">
            <Skeleton width="90%" height={20} mb={8} />
            <Skeleton width="100%" height={20} />
          </Box>
        ))}
    </>
  );
};
