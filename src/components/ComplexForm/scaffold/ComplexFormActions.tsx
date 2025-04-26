import { ActionBar, Button } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

type ComplexFormActionsProps = {
  formId: string;
};

const ComplexFormActions = ({ formId }: ComplexFormActionsProps) => {
  const t = useTranslations('ComplexForm');
  return (
    <ActionBar.Root open>
      <div className="col-span-full sticky bottom-0 z-10 flex justify-center">
        <ActionBar.Content className="mb-4">
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
      </div>
    </ActionBar.Root>
  );
};

export default ComplexFormActions;
