import {
  Badge,
  Box,
  Button,
  COLOR_PALETTE,
  desktopFirstQuery,
  Flex,
  Icon,
  Stack,
  Text,
  OptimizeImage,
} from '@inflearn/ds-react';
import { faLockAlt } from '@inflearn/pro-solid-svg-icons';
import { useMediaQuery } from '@mantine/hooks';
import { useContext } from 'react';

import { EnvironmentValuesContext } from '../../context/EnvironmentValuesContext';
import { readableFileSize } from '../../utils/readableFileSize';
import { ActionMenu } from '../ActionMenu/ActionMenu';

export const PAYWALL_CLASS_NAME = 'paywall';

const Paywall = () => {
  const isSmallerThanMobile = useMediaQuery(desktopFirstQuery.mobile);
  const { payWallInfo } = useContext(EnvironmentValuesContext);

  const hasAttachmentFile = !!payWallInfo?.attachmentFile?.attachmentFileId;
  const isFree = payWallInfo?.priceType === 'FREE';

  const extensionName = payWallInfo?.attachmentFile?.name?.split('.').pop()?.toUpperCase();

  return (
    <ActionMenu>
      <div className={PAYWALL_CLASS_NAME} css={{ display: isFree ? 'none' : 'block' }}>
        <Stack
          px={16}
          py={32}
          spacing={16}
          bg="infgreen.7"
          w="100%"
          pos="relative"
          justify="center"
          css={{ borderRadius: 20, overflow: 'hidden' }}>
          <Stack spacing={4} justify="center" mx="auto" css={{ zIndex: 1 }}>
            <Text
              color="white"
              size={isSmallerThanMobile ? 18 : 20}
              lh="1.3"
              align="center"
              fw={600}>
              잠금 해제하고, 전체 내용을 확인하세요
            </Text>
            <Text
              color="infgreen.2"
              size={isSmallerThanMobile ? 12 : 14}
              weight="500"
              lh="1.3"
              align="center">
              결제 즉시 열람 ·{' '}
              {payWallInfo?.durationType === 'INFINITY'
                ? '평생 소장'
                : payWallInfo?.duration
                ? `${payWallInfo.duration}개월 집중 열람`
                : '{기간 미정}'}{' '}
              이용
            </Text>
          </Stack>

          {hasAttachmentFile ? (
            <Flex
              justify="space-between"
              align={isSmallerThanMobile ? undefined : 'center'}
              direction={isSmallerThanMobile ? 'column' : 'row'}
              p={24}
              bg="white"
              css={{
                borderRadius: 16,
                border: `1px solid ${COLOR_PALETTE.gray[2]}`,
                zIndex: 1,
              }}
              gap={8}>
              <Flex align="center" gap={16} css={{ overflow: 'hidden' }}>
                <Stack
                  align="center"
                  justify="center"
                  p={isSmallerThanMobile ? 5 : 8}
                  w={isSmallerThanMobile ? 48 : 64}
                  h={isSmallerThanMobile ? 48 : 64}
                  bg="gray.1"
                  css={{ borderRadius: isSmallerThanMobile ? 8 : 16 }}>
                  <OptimizeImage
                    src={payWallInfo?.attachmentFile?.assetUrl}
                    alt={payWallInfo?.attachmentFile?.name}
                    w={500}
                    width={isSmallerThanMobile ? 38 : 48}
                    css={{
                      objectFit: 'fill',
                      borderRadius: 8,
                      boxShadow:
                        '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 10px 15px -5px rgba(0, 0, 0, 0.05), 0 7px 7px -5px rgba(0, 0, 0, 0.04)',
                    }}
                  />
                </Stack>
                <Stack spacing={2} css={{ overflow: 'hidden' }}>
                  <Box mb={4}>
                    <Badge
                      variant="light"
                      color="blue"
                      size={isSmallerThanMobile ? 'xs' : 'sm'}
                      radius="xl">
                      {extensionName}
                    </Badge>
                  </Box>
                  <Text
                    size={14}
                    fw={600}
                    color="gray.7"
                    lh="1.3"
                    css={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}>
                    {payWallInfo?.attachmentFile?.name}
                  </Text>
                  <Text size={isSmallerThanMobile ? 12 : 14} fw={400} color="gray.6" lh="1.3">
                    {readableFileSize(payWallInfo?.attachmentFile?.size || 0)}
                  </Text>
                </Stack>
              </Flex>
              <Button variant="filled" color="dark" size="md" radius="md">
                {`₩${payWallInfo?.price?.toLocaleString() || '{금액 미정}'} 에 잠금 해제`}
              </Button>
            </Flex>
          ) : (
            <Button
              w="auto"
              variant="filled"
              color="dark"
              size="md"
              radius="md"
              mx="auto"
              css={{ zIndex: 1 }}>
              {`₩${payWallInfo?.price?.toLocaleString() || '{금액 미정}'} 에 잠금 해제`}
            </Button>
          )}

          <Box
            pos="absolute"
            right={40}
            bottom={hasAttachmentFile ? -34 : isSmallerThanMobile ? -84 : -70}
            css={{ zIndex: 0 }}>
            <Icon icon={faLockAlt} size={229} color="infgreen.8" opacity={0.5} />
          </Box>
        </Stack>
      </div>
    </ActionMenu>
  );
};

export default Paywall;
