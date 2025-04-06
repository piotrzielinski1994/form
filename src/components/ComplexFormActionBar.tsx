'use client';

import { ActionBar, Button, Portal } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

type ComplexFormActionBarProps = {
  formId: string;
  onCancel: () => void;
};

const ComplexFormActionBar = ({ formId, onCancel }: ComplexFormActionBarProps) => {
  const t = useTranslations('ComplexForm');

  return (
    <ActionBar.Root open>
      <Portal>
        <ActionBar.Positioner className="z-10">
          <ActionBar.Content>
            <Button
              variant="outline"
              justifySelf="center"
              type="button"
              size="lg"
              position="sticky"
              bottom="4"
              px="10"
              onClick={onCancel}
            >
              {t('reset')}
            </Button>
            <Button
              form={formId}
              justifySelf="center"
              type="submit"
              size="lg"
              position="sticky"
              bottom="4"
              px="10"
            >
              {t('submit')}
            </Button>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
};

export { ComplexFormActionBar };
