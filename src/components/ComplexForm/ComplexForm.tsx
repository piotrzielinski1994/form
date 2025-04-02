'use client';

import { Checkbox } from '@/components/Form/Checkbox';
import { Fieldset } from '@/components/Form/Fieldset';
import { Form } from '@/components/Form/Form';
import { Radio } from '@/components/Form/Radio';
import { Select } from '@/components/Form/Select';
import { TextInput } from '@/components/Form/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import {
  bodyColors,
  bodyTypes,
  co2ClassOptions,
  driveTypeOptions,
  fuelTypeOptions,
  interiorColorOptions,
  makes,
  models,
  transmissionOptions,
  upholsteryOptions,
  vehicleOfferTypeOptions,
} from './options';
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
      {/* Vehicle Data */}
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

      {/* Characteristics */}
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
        <Controller
          name="characteristics.color"
          control={control}
          render={({ field }) => (
            <Radio
              options={bodyColors}
              label={t('characteristics.color')}
              error={errors.characteristics?.color?.message}
              {...field}
            />
          )}
        />
        <Checkbox
          label={t('characteristics.metallic')}
          {...register('characteristics.metallic')}
          error={errors.characteristics?.metallic?.message}
        />
        <Controller
          name="characteristics.upholstery"
          control={control}
          render={({ field }) => (
            <Select
              label={t('characteristics.upholstery')}
              error={errors.characteristics?.upholstery?.message}
              options={upholsteryOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="characteristics.interiorColor"
          control={control}
          render={({ field }) => (
            <Radio
              options={interiorColorOptions}
              label={t('characteristics.interiorColor')}
              error={errors.characteristics?.interiorColor?.message}
              {...field}
            />
          )}
        />
      </Fieldset>

      {/* Condition */}
      <Fieldset legend={t('condition.legend')}>
        <Controller
          name="condition.vehicleOfferType"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.vehicleOfferType')}
              error={errors.condition?.vehicleOfferType?.message}
              options={vehicleOfferTypeOptions}
              {...field}
            />
          )}
        />
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
        <TextInput
          label={t('condition.owners')}
          type="number"
          {...register('condition.owners')}
          error={errors.condition?.owners?.message}
        />
        <TextInput
          label={t('condition.deliveryDay')}
          {...register('condition.deliveryDay')}
          error={errors.condition?.deliveryDay?.message}
        />
        <TextInput
          label={t('condition.deliveryDate')}
          {...register('condition.deliveryDate')}
          error={errors.condition?.deliveryDate?.message}
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
        <TextInput
          label={t('condition.nextInspection')}
          {...register('condition.nextInspection')}
          error={errors.condition?.nextInspection?.message}
        />
        <TextInput
          label={t('condition.lastTechnicalService')}
          {...register('condition.lastTechnicalService')}
          error={errors.condition?.lastTechnicalService?.message}
        />
        <TextInput
          label={t('condition.lastCamBeltService')}
          {...register('condition.lastCamBeltService')}
          error={errors.condition?.lastCamBeltService?.message}
        />
        <Checkbox
          label={t('condition.damagedVehicle')}
          {...register('condition.damagedVehicle')}
          error={errors.condition?.damagedVehicle?.message}
        />
        <Checkbox
          label={t('condition.accidentVehicle')}
          {...register('condition.accidentVehicle')}
          error={errors.condition?.accidentVehicle?.message}
        />
        <Checkbox
          label={t('condition.roadWorthiness')}
          {...register('condition.roadWorthiness')}
          error={errors.condition?.roadWorthiness?.message}
        />
      </Fieldset>

      {/* Motor */}
      <Fieldset legend={t('motor.legend')}>
        <Controller
          name="motor.driveType"
          control={control}
          render={({ field }) => (
            <Select
              label={t('motor.driveType')}
              error={errors.motor?.driveType?.message}
              options={driveTypeOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="motor.transmission"
          control={control}
          render={({ field }) => (
            <Select
              label={t('motor.transmission')}
              error={errors.motor?.transmission?.message}
              options={transmissionOptions}
              {...field}
            />
          )}
        />
        <TextInput
          label={t('motor.powerKW')}
          type="number"
          {...register('motor.powerKW')}
          error={errors.motor?.powerKW?.message}
        />
        <TextInput
          label={t('motor.powerHP')}
          type="number"
          {...register('motor.powerHP')}
          error={errors.motor?.powerHP?.message}
        />
        <TextInput
          label={t('motor.gears')}
          type="number"
          {...register('motor.gears')}
          error={errors.motor?.gears?.message}
        />
        <TextInput
          label={t('motor.cylinders')}
          type="number"
          {...register('motor.cylinders')}
          error={errors.motor?.cylinders?.message}
        />
        <TextInput
          label={t('motor.engineCapacity')}
          type="number"
          {...register('motor.engineCapacity')}
          error={errors.motor?.engineCapacity?.message}
        />
        <TextInput
          label={t('motor.emptyWeight')}
          type="number"
          {...register('motor.emptyWeight')}
          error={errors.motor?.emptyWeight?.message}
        />
      </Fieldset>

      {/* Fuel */}
      <Fieldset legend={t('fuel.legend')}>
        <Controller
          name="fuel.fuelType"
          control={control}
          render={({ field }) => (
            <Select
              label={t('fuel.fuelType')}
              error={errors.fuel?.fuelType?.message}
              options={fuelTypeOptions}
              {...field}
            />
          )}
        />
        <TextInput
          label={t('fuel.consumptionCombined')}
          type="number"
          {...register('fuel.consumptionCombined')}
          error={errors.fuel?.consumptionCombined?.message}
        />
        <TextInput
          label={t('fuel.co2Emissions')}
          type="number"
          {...register('fuel.co2Emissions')}
          error={errors.fuel?.co2Emissions?.message}
        />
        <Controller
          name="fuel.efficiencyClass"
          control={control}
          render={({ field }) => (
            <Select
              label={t('fuel.efficiencyClass')}
              error={errors.fuel?.efficiencyClass?.message}
              options={co2ClassOptions}
              {...field}
            />
          )}
        />
        <TextInput
          label={t('fuel.pollutionClass')}
          {...register('fuel.pollutionClass')}
          error={errors.fuel?.pollutionClass?.message}
        />
        <TextInput
          label={t('fuel.emissionSticker')}
          {...register('fuel.emissionSticker')}
          error={errors.fuel?.emissionSticker?.message}
        />
      </Fieldset>

      {/* Price */}
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
        <Checkbox
          label={t('price.taxDeductible')}
          {...register('price.taxDeductible')}
          error={errors.price?.taxDeductible?.message}
        />
      </Fieldset>

      {/* Contact Information */}
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
        <TextInput
          label={t('contactInformation.phoneCountryCode')}
          {...register('contactInformation.phoneCountryCode')}
          error={errors.contactInformation?.phoneCountryCode?.message}
        />
        <TextInput
          label={t('contactInformation.phoneAreaCode')}
          {...register('contactInformation.phoneAreaCode')}
          error={errors.contactInformation?.phoneAreaCode?.message}
        />
        <TextInput
          label={t('contactInformation.phoneNumber')}
          {...register('contactInformation.phoneNumber')}
          error={errors.contactInformation?.phoneNumber?.message}
        />
        <Checkbox
          label={t('contactInformation.hidePhoneNumber')}
          {...register('contactInformation.hidePhoneNumber')}
          error={errors.contactInformation?.hidePhoneNumber?.message}
        />
      </Fieldset>

      {/* Photos */}
      <Fieldset legend={t('photos.legend')}>
        <TextInput
          label={t('photos.images')}
          {...register('photos.images')}
          error={errors.photos?.images?.message}
        />
      </Fieldset>

      {/* Description */}
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
