'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Steps } from './Steps';

const ComplexFormNavigation = () => {
  const t = useTranslations('ComplexForm');
  const router = useRouter();

  return (
    <Steps
      className="sticky top-4"
      steps={[
        { id: 'vehicleData', heading: t('vehicleData.legend') },
        { id: 'characteristics', heading: t('characteristics.legend') },
        { id: 'condition', heading: t('condition.legend') },
        { id: 'equipment', heading: t('equipment.legend') },
        { id: 'motor', heading: t('motor.legend') },
        { id: 'fuel', heading: t('fuel.legend') },
        { id: 'price', heading: t('price.legend') },
        { id: 'contactInformation', heading: t('contactInformation.legend') },
        { id: 'financingOffer', heading: t('financingOffer.legend') },
      ]}
      onClick={(id) => router.push(`#${id}`)}
    />
  );
};

export { ComplexFormNavigation };
