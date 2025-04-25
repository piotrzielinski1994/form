'use client';

import { Steps } from '@/components/Steps';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { useContactInformationVisibility } from '../visibility';

const ComplexFormNavigation = () => {
  const t = useTranslations('ComplexForm');
  const router = useRouter();
  const { formState } = useFormContext();
  const isContactInformationVisible = useContactInformationVisibility();

  console.log('@@@ vehicleData | ', JSON.stringify(formState.errors.vehicleData));

  const steps = [
    { id: 'vehicleData', heading: t('vehicleData.legend'), isValid: !formState.errors.vehicleData },
    {
      id: 'characteristics',
      heading: t('characteristics.legend'),
      isValid: !formState.errors.characteristics,
    },
    { id: 'condition', heading: t('condition.legend'), isValid: !formState.errors.condition },
    { id: 'equipment', heading: t('equipment.legend'), isValid: !formState.errors.equipment },
    { id: 'motor', heading: t('motor.legend'), isValid: !formState.errors.motor },
    { id: 'fuel', heading: t('fuel.legend'), isValid: !formState.errors.fuel },
    { id: 'description', heading: t('description.legend'), isValid: !formState.errors.description },
    {
      id: 'financingOffer',
      heading: t('financingOffer.legend'),
      isValid: !formState.errors.financingOffer,
    },
    ...(isContactInformationVisible
      ? [
          {
            id: 'contactInformation',
            heading: t('contactInformation.legend'),
            isValid: !formState.errors.contactInformation,
          },
        ]
      : []),
  ];

  return <Steps className="sticky top-16" steps={steps} onClick={(id) => router.push(`#${id}`)} />;
};

export { ComplexFormNavigation };
