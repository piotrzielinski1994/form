'use client';

import { Steps } from '@/components/Steps';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { FormFields } from '../schema';
import { useContactInformationVisibility } from '../visibility.hooks';

const ComplexFormNavigation = () => {
  const t = useTranslations('ComplexForm');
  const router = useRouter();
  const formContext = useFormContext<FormFields>();
  const {
    formState: { errors },
    watch,
  } = formContext;
  const isContactInformationVisible = useContactInformationVisibility();

  const vehicleDataModel = watch('vehicleData.model');
  console.log('@@@ errors | ', errors.vehicleData?.model);
  console.log('@@@ vehicleData.model value | ', vehicleDataModel);

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
