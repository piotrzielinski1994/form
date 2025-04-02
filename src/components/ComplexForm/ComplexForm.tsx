'use client';

import { Checkbox } from '@/components/Form/Checkbox';
import { Fieldset } from '@/components/Form/Fieldset';
import { Form } from '@/components/Form/Form';
import { TextInput } from '@/components/Form/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { Select } from '../Form/Select';
import { bodyTypes, makes, models } from './options';
import { defaultValues, FormFields, schema } from './schema';

const ComplexForm = () => {
  const t = useTranslations('ComplexForm');
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormFields>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))} noValidate>
      <Fieldset legend={t('vehicleData.legend')}>
        <Controller
          name="vehicleData.make"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label={t('vehicleData.make')}
              error={errors.vehicleData?.make?.message}
              options={makes.map((m) => ({ ...m, value: String(m.value) }))}
              {...field}
            />
          )}
        />
        <Controller
          name="vehicleData.model"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label={t('vehicleData.model')}
              error={errors.vehicleData?.model?.message}
              options={models[watch('vehicleData.make')] ?? []}
              disabled={!watch('vehicleData.make')}
              {...field}
            />
          )}
        />
        <TextInput
          label={t('vehicleData.modelVersion')}
          {...register('vehicleData.modelVersion')}
          error={errors.vehicleData?.modelVersion?.message}
        />
      </Fieldset>

      <Fieldset legend={t('characteristics.legend')}>
        <Controller
          name="characteristics.bodyType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label={t('characteristics.bodyType')}
              error={errors.characteristics?.bodyType?.message}
              options={bodyTypes.map((m) => ({ ...m, value: String(m.value) }))}
              {...field}
            />
          )}
        />
        <TextInput
          label={t('characteristics.seats')}
          type="number"
          {...register('characteristics.seats')}
          error={errors.characteristics?.seats?.message}
        />
        <TextInput
          label={t('characteristics.doors')}
          type="number"
          {...register('characteristics.doors')}
          error={errors.characteristics?.doors?.message}
        />
        <TextInput
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
          label={t('condition.mileage')}
          type="number"
          {...register('condition.mileage')}
          error={errors.condition?.mileage?.message}
        />
        <TextInput
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
          label={t('motor.driveType')}
          {...register('motor.driveType')}
          error={errors.motor?.driveType?.message}
        />
        <TextInput
          label={t('motor.transmission')}
          {...register('motor.transmission')}
          error={errors.motor?.transmission?.message}
        />
        <TextInput
          label={t('motor.powerKW')}
          type="number"
          {...register('motor.powerKW')}
          error={errors.motor?.powerKW?.message}
        />
      </Fieldset>

      <Fieldset legend={t('fuel.legend')}>
        <TextInput
          label={t('fuel.fuelType')}
          {...register('fuel.fuelType')}
          error={errors.fuel?.fuelType?.message}
        />
        <TextInput
          label={t('fuel.consumptionCombined')}
          type="number"
          {...register('fuel.consumptionCombined')}
          error={errors.fuel?.consumptionCombined?.message}
        />
      </Fieldset>

      <Fieldset legend={t('price.legend')}>
        <TextInput
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
          label={t('contactInformation.postalCode')}
          {...register('contactInformation.postalCode')}
          error={errors.contactInformation?.postalCode?.message}
        />
        <TextInput
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
          label={t('photos.images')}
          {...register('photos.images')}
          error={errors.photos?.images?.message}
        />
      </Fieldset>

      <Fieldset legend={t('description.legend')}>
        <TextInput
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
