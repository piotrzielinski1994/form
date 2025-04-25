'use client';

import { Steps } from '@/components/Steps';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useContactInformationVisibility } from '../visibility';

const ComplexFormNavigation = () => {
  const t = useTranslations('ComplexForm');
  const router = useRouter();
  const isContactInformationVisible = useContactInformationVisibility();

  return (
    <Steps
      className="sticky top-16"
      steps={[
        { id: 'vehicleData', heading: t('vehicleData.legend') },
        { id: 'characteristics', heading: t('characteristics.legend') },
        { id: 'condition', heading: t('condition.legend') },
        { id: 'equipment', heading: t('equipment.legend') },
        { id: 'motor', heading: t('motor.legend') },
        { id: 'fuel', heading: t('fuel.legend') },
        { id: 'description', heading: t('description.legend') },
        { id: 'financingOffer', heading: t('financingOffer.legend') },
        ...(isContactInformationVisible
          ? [{ id: 'contactInformation', heading: t('contactInformation.legend') }]
          : []),
      ]}
      onClick={(id) => router.push(`#${id}`)}
    />
  );
};

export { ComplexFormNavigation };
