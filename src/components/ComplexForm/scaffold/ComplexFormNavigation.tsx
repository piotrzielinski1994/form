'use client';

import { useHeaderHeight } from '@/components/Header/Header';
import { Steps } from '@/components/Steps';
import { useVehicleConfig } from '@/providers/VehicleConfigProvider';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFields } from '../schema';
import { isContactInformationVisible } from '../visibility';

const SCROLL_OFFSET = 20; // px

const ComplexFormNavigation = () => {
  const t = useTranslations('ComplexForm');
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const [vehicleConfig] = useVehicleConfig();
  const { errors, touchedFields, isSubmitted } = useFormContext<FormFields>().formState;

  useEffect(() => {
    const fieldsetPadding = window.innerWidth >= 640 ? '2.5rem' : '1.5rem';
    const offset = `calc(${headerHeight}px + ${SCROLL_OFFSET}px + ${fieldsetPadding})`;
    document.documentElement.style.scrollPaddingTop = offset;
  }, [headerHeight]);

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
    {
      id: 'contactInformation',
      heading: t('contactInformation.legend'),
      isValid: getSectionValidity('contactInformation'),
      isVisible: isContactInformationVisible(vehicleConfig),
    },
  ];

  return (
    <Steps
      className="sticky"
      style={{ top: `${headerHeight + SCROLL_OFFSET}px` }}
      steps={steps.filter((it) => it.isVisible !== false)}
      onClick={(id) => router.push(`#${id}`)}
    />
  );
};

export { ComplexFormNavigation };
