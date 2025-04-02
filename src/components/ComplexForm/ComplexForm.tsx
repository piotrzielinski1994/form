'use client';

import { Checkbox } from '@/components/Form/Checkbox';
import { Fieldset } from '@/components/Form/Fieldset';
import { Form } from '@/components/Form/Form';
import { TextInput } from '@/components/Form/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { defaultValues, FormFields, schema } from './schema';

const ComplexForm = () => {
  const t = useTranslations('ComplexForm');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))}>
      <Fieldset legend={t('vehicleData.legend')}>
        <TextInput
          id="make"
          label={t('vehicleData.make')}
          {...register('vehicleData.make')}
          error={errors.vehicleData?.make?.message}
        />
        <TextInput
          id="model"
          label={t('vehicleData.model')}
          {...register('vehicleData.model')}
          error={errors.vehicleData?.model?.message}
        />
        <TextInput
          id="modelVersion"
          label={t('vehicleData.modelVersion')}
          {...register('vehicleData.modelVersion')}
          error={errors.vehicleData?.modelVersion?.message}
        />
      </Fieldset>

      <Fieldset legend={t('characteristics.legend')}>
        <TextInput
          id="bodyType"
          label={t('characteristics.bodyType')}
          {...register('characteristics.bodyType')}
          error={errors.characteristics?.bodyType?.message}
        />
        <TextInput
          id="seats"
          label={t('characteristics.seats')}
          type="number"
          {...register('characteristics.seats')}
          error={errors.characteristics?.seats?.message}
        />
        <TextInput
          id="doors"
          label={t('characteristics.doors')}
          type="number"
          {...register('characteristics.doors')}
          error={errors.characteristics?.doors?.message}
        />
        <TextInput
          id="color"
          label={t('characteristics.color')}
          {...register('characteristics.color')}
          error={errors.characteristics?.color?.message}
        />
        <Checkbox
          label={t('characteristics.metallic')}
          {...register('characteristics.metallic')}
          error={errors.characteristics?.metallic?.message}
        />
      </Fieldset>

      <Fieldset legend={t('condition.legend')}>
        <TextInput
          id="mileage"
          label={t('condition.mileage')}
          type="number"
          {...register('condition.mileage')}
          error={errors.condition?.mileage?.message}
        />
        <TextInput
          id="firstRegistration"
          label={t('condition.firstRegistration')}
          {...register('condition.firstRegistration')}
          error={errors.condition?.firstRegistration?.message}
        />
        <Checkbox
          label={t('condition.fullServiceHistory')}
          {...register('condition.fullServiceHistory')}
          error={errors.condition?.fullServiceHistory?.message}
        />
        <Checkbox
          label={t('condition.nonSmoking')}
          {...register('condition.nonSmoking')}
          error={errors.condition?.nonSmoking?.message}
        />
      </Fieldset>

      <Fieldset legend={t('motor.legend')}>
        <TextInput
          id="driveType"
          label={t('motor.driveType')}
          {...register('motor.driveType')}
          error={errors.motor?.driveType?.message}
        />
        <TextInput
          id="transmission"
          label={t('motor.transmission')}
          {...register('motor.transmission')}
          error={errors.motor?.transmission?.message}
        />
        <TextInput
          id="powerKW"
          label={t('motor.powerKW')}
          type="number"
          {...register('motor.powerKW')}
          error={errors.motor?.powerKW?.message}
        />
      </Fieldset>

      <Fieldset legend={t('fuel.legend')}>
        <TextInput
          id="fuelType"
          label={t('fuel.fuelType')}
          {...register('fuel.fuelType')}
          error={errors.fuel?.fuelType?.message}
        />
        <TextInput
          id="consumptionCombined"
          label={t('fuel.consumptionCombined')}
          type="number"
          {...register('fuel.consumptionCombined')}
          error={errors.fuel?.consumptionCombined?.message}
        />
      </Fieldset>

      <Fieldset legend={t('price.legend')}>
        <TextInput
          id="amount"
          label={t('price.amount')}
          type="number"
          {...register('price.amount')}
          error={errors.price?.amount?.message}
        />
        <Checkbox
          label={t('price.negotiable')}
          {...register('price.negotiable')}
          error={errors.price?.negotiable?.message}
        />
      </Fieldset>

      <Fieldset legend={t('contactInformation.legend')}>
        <TextInput
          id="postalCode"
          label={t('contactInformation.postalCode')}
          {...register('contactInformation.postalCode')}
          error={errors.contactInformation?.postalCode?.message}
        />
        <TextInput
          id="city"
          label={t('contactInformation.city')}
          {...register('contactInformation.city')}
          error={errors.contactInformation?.city?.message}
        />
        <Checkbox
          label={t('contactInformation.hidePhoneNumber')}
          {...register('contactInformation.hidePhoneNumber')}
          error={errors.contactInformation?.hidePhoneNumber?.message}
        />
      </Fieldset>

      <Fieldset legend={t('photos.legend')}>
        <TextInput
          id="images"
          label={t('photos.images')}
          {...register('photos.images')}
          error={errors.photos?.images?.message}
        />
      </Fieldset>

      <Fieldset legend={t('description.legend')}>
        <TextInput
          id="text"
          label={t('description.text')}
          {...register('description.text')}
          error={errors.description?.text?.message}
        />
      </Fieldset>

      <button type="submit">{t('submit')}</button>
    </Form>
  );
};

export { ComplexForm };
