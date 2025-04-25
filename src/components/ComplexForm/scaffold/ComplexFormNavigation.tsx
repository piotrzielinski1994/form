'use client';

import { Steps } from '@/components/Steps';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { useContactInformationVisibility } from '../visibility';

const ComplexFormNavigation = () => {
  const t = useTranslations('ComplexForm');
  const router = useRouter();
  const { errors } = useFormContext().formState;
  const isContactInformationVisible = useContactInformationVisibility();

  const steps = [
    { id: 'vehicleData', heading: t('vehicleData.legend'), isValid: !errors.vehicleData },
    {
      id: 'characteristics',
      heading: t('characteristics.legend'),
      isValid: !errors.characteristics,
    },
    { id: 'condition', heading: t('condition.legend'), isValid: !errors.condition },
    { id: 'equipment', heading: t('equipment.legend'), isValid: !errors.equipment },
    { id: 'motor', heading: t('motor.legend'), isValid: !errors.motor },
    { id: 'fuel', heading: t('fuel.legend'), isValid: !errors.fuel },
    { id: 'description', heading: t('description.legend'), isValid: !errors.description },
    {
      id: 'financingOffer',
      heading: t('financingOffer.legend'),
      isValid: !errors.financingOffer,
    },
    ...(isContactInformationVisible
      ? [
          {
            id: 'contactInformation',
            heading: t('contactInformation.legend'),
            isValid: !errors.contactInformation,
          },
        ]
      : []),
  ];

  return <Steps className="sticky top-16" steps={steps} onClick={(id) => router.push(`#${id}`)} />;
};

export { ComplexFormNavigation };
