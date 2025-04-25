import { ActionBar, Button, Portal } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

type ComplexFormActionsProps = {
  formId: string;
};

const ComplexFormActions = ({ formId }: ComplexFormActionsProps) => {
  const t = useTranslations('ComplexForm');
  return (
    <ActionBar.Root open>
      <Portal>
        <ActionBar.Positioner className="z-10">
          <ActionBar.Content>
            <Button
              form={formId}
              variant="outline"
              justifySelf="center"
              type="reset"
              size="lg"
              position="sticky"
              bottom="4"
              px="10"
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

export default ComplexFormActions;
