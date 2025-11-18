import { Button } from '@mantine/core';

type Props = {
  templateTitle: string;
  handleClickTemplate: () => void;
};

export function InflabTemplateDefaultButton({ templateTitle, handleClickTemplate }: Props) {
  return (
    <Button variant="default" size="xs" onClick={handleClickTemplate}>
      {templateTitle}
    </Button>
  );
}
