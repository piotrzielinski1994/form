'use client';

import { Steps } from '@/components/Steps';
import { useVehicleConfig } from '@/providers/VehicleConfigProvider';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { FormFields } from '../schema';
import { isContactInformationVisible } from '../visibility';

const ComplexFormNavigation = () => {
  const t = useTranslations('ComplexForm');
  const router = useRouter();
  const [vehicleConfig] = useVehicleConfig();
  const { errors, touchedFields, isSubmitted } = useFormContext<FormFields>().formState;

  const getSectionValidity = (sectionKey: keyof FormFields) => {
    const isSectionTouched = !!touchedFields[sectionKey];
    const isSectionValid = !errors[sectionKey];
    if (isSubmitted) return isSectionValid;
    if (!isSectionTouched) return undefined;
    return isSectionValid;
  };

  const steps = [
    {
      id: 'vehicleData',
      heading: t('vehicleData.legend'),
      isValid: getSectionValidity('vehicleData'),
    },
    {
      id: 'characteristics',
      heading: t('characteristics.legend'),
      isValid: getSectionValidity('characteristics'),
    },
    { id: 'condition', heading: t('condition.legend'), isValid: getSectionValidity('condition') },
    { id: 'equipment', heading: t('equipment.legend'), isValid: getSectionValidity('equipment') },
    { id: 'motor', heading: t('motor.legend'), isValid: getSectionValidity('motor') },
    { id: 'fuel', heading: t('fuel.legend'), isValid: getSectionValidity('fuel') },
    {
      id: 'description',
      heading: t('description.legend'),
      isValid: getSectionValidity('description'),
    },
    {
      id: 'financingOffer',
      heading: t('financingOffer.legend'),
      isValid: getSectionValidity('financingOffer'),
    },
    ...(isContactInformationVisible(vehicleConfig)
      ? [
          {
            id: 'contactInformation',
            heading: t('contactInformation.legend'),
            isValid: getSectionValidity('contactInformation'),
          },
        ]
      : []),
  ];

  return <Steps className="sticky top-16" steps={steps} onClick={(id) => router.push(`#${id}`)} />;
};

export { ComplexFormNavigation };
