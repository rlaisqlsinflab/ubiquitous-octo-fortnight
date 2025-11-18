import { Box, Select } from '@inflearn/ds-react';

export type VersionHistoryType = {
  label: string;
  value: string;
};

export type ChangeTypeSelectSetter = (selectedValue: string) => void;

type Props = {
  data: VersionHistoryType[];
  value: string;
  onChange?: ChangeTypeSelectSetter;
};

export const VersionHistoryTypeSelect = ({ data, value, onChange }: Props) => {
  return (
    <Box
      css={{
        padding: 16,
      }}>
      <Select
        data={data}
        value={value}
        onChange={(selectedValue) => {
          if (!selectedValue) {
            return;
          }

          onChange?.(selectedValue);
        }}
      />
    </Box>
  );
};
