'use client';

import { Checkbox } from '@/components/Form/Checkbox';
import { Fieldset } from '@/components/Form/Fieldset';
import { Form } from '@/components/Form/Form';
import { Radio } from '@/components/Form/Radio';
import { Select } from '@/components/Form/Select';
import { TextInput } from '@/components/Form/TextInput';
import { Button, Field } from '@chakra-ui/react';
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
        <Field.Root>
          <Field.Label>{t('characteristics.typeOfPaint')}</Field.Label>
          <Checkbox
            label={t('characteristics.metallic')}
            {...register('characteristics.metallic')}
            error={errors.characteristics?.metallic?.message}
          />
        </Field.Root>
        <Controller
          name="characteristics.upholstery"
          control={control}
          render={({ field }) => (
            <Radio
              options={upholsteryOptions}
              label={t('characteristics.upholstery')}
              error={errors.characteristics?.upholstery?.message}
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
        <div>
          <Controller
            name="condition.firstRegistrationMonth"
            control={control}
            render={({ field }) => (
              <Select
                label={t('condition.firstRegistrationMonth')}
                error={errors.condition?.firstRegistrationMonth?.message}
                options={Array.from({ length: 12 }, (_, i) => ({
                  value: String(i + 1).padStart(2, '0'),
                  label: String(i + 1).padStart(2, '0'),
                }))}
                {...field}
              />
            )}
          />
          <Controller
            name="condition.firstRegistrationYear"
            control={control}
            render={({ field }) => (
              <Select
                label={t('condition.firstRegistrationYear')}
                error={errors.condition?.firstRegistrationYear?.message}
                options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
                  value: String(1900 + i),
                  label: String(1900 + i),
                }))}
                {...field}
              />
            )}
          />
        </div>
        <TextInput
          label={t('condition.owners')}
          type="number"
          {...register('condition.owners')}
          error={errors.condition?.owners?.message}
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
        <div>
          <Controller
            name="condition.nextInspectionMonth"
            control={control}
            render={({ field }) => (
              <Select
                label={t('condition.nextInspectionMonth')}
                error={errors.condition?.nextInspectionMonth?.message}
                options={Array.from({ length: 12 }, (_, i) => ({
                  value: String(i + 1).padStart(2, '0'),
                  label: String(i + 1).padStart(2, '0'),
                }))}
                {...field}
              />
            )}
          />
          <Controller
            name="condition.nextInspectionYear"
            control={control}
            render={({ field }) => (
              <Select
                label={t('condition.nextInspectionYear')}
                error={errors.condition?.nextInspectionYear?.message}
                options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
                  value: String(1900 + i),
                  label: String(1900 + i),
                }))}
                {...field}
              />
            )}
          />
        </div>
        <Controller
          name="condition.lastTechnicalServiceMonth"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.lastTechnicalServiceMonth')}
              error={errors.condition?.lastTechnicalServiceMonth?.message}
              options={Array.from({ length: 12 }, (_, i) => ({
                value: String(i + 1).padStart(2, '0'),
                label: String(i + 1).padStart(2, '0'),
              }))}
              {...field}
            />
          )}
        />
        <Controller
          name="condition.lastTechnicalServiceYear"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.lastTechnicalServiceYear')}
              error={errors.condition?.lastTechnicalServiceYear?.message}
              options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
                value: String(1900 + i),
                label: String(1900 + i),
              }))}
              {...field}
            />
          )}
        />
        <Controller
          name="condition.lastCamBeltServiceMonth"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.lastCamBeltServiceMonth')}
              error={errors.condition?.lastCamBeltServiceMonth?.message}
              options={Array.from({ length: 12 }, (_, i) => ({
                value: String(i + 1).padStart(2, '0'),
                label: String(i + 1).padStart(2, '0'),
              }))}
              {...field}
            />
          )}
        />
        <Controller
          name="condition.lastCamBeltServiceYear"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.lastCamBeltServiceYear')}
              error={errors.condition?.lastCamBeltServiceYear?.message}
              options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
                value: String(1900 + i),
                label: String(1900 + i),
              }))}
              {...field}
            />
          )}
        />
        <Controller
          name="condition.damagedVehicle"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.damagedVehicle')}
              error={errors.condition?.damagedVehicle?.message}
              options={[
                { value: 'true', label: t('yes') },
                { value: 'false', label: t('no') },
              ]}
              {...field}
              value={field.value === true ? 'true' : 'false'}
              onChange={(e) => field.onChange(e.target.value === 'true')}
            />
          )}
        />
        <Controller
          name="condition.accidentVehicle"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.accidentVehicle')}
              error={errors.condition?.accidentVehicle?.message}
              options={[
                { value: 'true', label: t('yes') },
                { value: 'false', label: t('no') },
              ]}
              {...field}
              value={field.value === true ? 'true' : 'false'}
              onChange={(e) => field.onChange(e.target.value === 'true')}
            />
          )}
        />
        <Controller
          name="condition.roadWorthiness"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.roadWorthiness')}
              error={errors.condition?.roadWorthiness?.message}
              options={[
                { value: 'true', label: t('yes') },
                { value: 'false', label: t('no') },
              ]}
              {...field}
              value={field.value === true ? 'true' : 'false'}
              onChange={(e) => field.onChange(e.target.value === 'true')}
            />
          )}
        />
      </Fieldset>

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
        <Controller
          name="fuel.primaryFuelType"
          control={control}
          render={({ field }) => (
            <Select
              label={t('fuel.primaryFuelTypeLabel')}
              error={errors.fuel?.primaryFuelType?.message}
              options={[
                { value: 'gasoline', label: t('fuel.primaryFuelType.gasoline') },
                { value: 'diesel', label: t('fuel.primaryFuelType.diesel') },
                { value: 'electric', label: t('fuel.primaryFuelType.electric') },
              ]}
              {...field}
            />
          )}
        />
        <Checkbox
          label={t('fuel.sootParticles')}
          {...register('fuel.sootParticles')}
          error={errors.fuel?.sootParticles?.message}
        />
        <TextInput
          label={t('fuel.wltpConsumptionCombined')}
          type="number"
          {...register('fuel.wltpConsumptionCombined')}
          error={errors.fuel?.wltpConsumptionCombined?.message}
        />
        <TextInput
          label={t('fuel.wltpCo2EmissionsCombined')}
          type="number"
          {...register('fuel.wltpCo2EmissionsCombined')}
          error={errors.fuel?.wltpCo2EmissionsCombined?.message}
        />
        <Controller
          name="fuel.wltpCo2Class"
          control={control}
          render={({ field }) => (
            <Select
              label={t('fuel.wltpCo2Class')}
              error={errors.fuel?.wltpCo2Class?.message}
              options={co2ClassOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="fuel.pollutionClass"
          control={control}
          render={({ field }) => (
            <Select
              label={t('fuel.pollutionClassLabel')}
              error={errors.fuel?.pollutionClass?.message}
              options={[
                { value: 'euro6', label: t('fuel.pollutionClass.euro6') },
                { value: 'euro5', label: t('fuel.pollutionClass.euro5') },
              ]}
              {...field}
            />
          )}
        />
        <Controller
          name="fuel.emissionSticker"
          control={control}
          render={({ field }) => (
            <Radio
              label={t('fuel.emissionSticker')}
              options={[
                { value: '1', label: t('fuel.emissionStickerOptions.none') },
                { value: '2', label: t('fuel.emissionStickerOptions.green') },
                { value: '3', label: t('fuel.emissionStickerOptions.yellow') },
                { value: '4', label: t('fuel.emissionStickerOptions.red') },
              ]}
              {...field}
            />
          )}
        />
      </Fieldset>

      <Fieldset legend={t('price.legend')}>
        <TextInput
          label={t('price.amount')}
          type="number"
          {...register('price.amount', { valueAsNumber: true })}
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
          label={t('contactInformation.phoneSubscriberNumber')}
          {...register('contactInformation.phoneSubscriberNumber')}
          error={errors.contactInformation?.phoneSubscriberNumber?.message}
        />
        <Controller
          name="contactInformation.hidePhoneNumber"
          control={control}
          render={({ field }) => (
            <Radio
              label={t('contactInformation.hidePhoneNumber')}
              options={[
                { value: 'true', label: t('yes') },
                { value: 'false', label: t('no') },
              ]}
              error={errors.contactInformation?.hidePhoneNumber?.message}
              {...field}
              value={field.value === true ? 'true' : 'false'}
              onChange={(e) => field.onChange((e.target as HTMLInputElement).value === 'true')}
            />
          )}
        />
      </Fieldset>

      <Fieldset legend={t('financingOffer.legend')}>
        <TextInput
          label={t('financingOffer.price')}
          type="number"
          {...register('financingOffer.price', { valueAsNumber: true })}
          error={errors.financingOffer?.price?.message}
        />
        <TextInput
          label={t('financingOffer.netPrice')}
          type="number"
          {...register('financingOffer.netPrice', { valueAsNumber: true })}
          error={errors.financingOffer?.netPrice?.message}
        />
        <Checkbox
          label={t('financingOffer.taxDeductible')}
          {...register('financingOffer.taxDeductible')}
          error={errors.financingOffer?.taxDeductible?.message}
        />
        <Checkbox
          label={t('financingOffer.negotiable')}
          {...register('financingOffer.negotiable')}
          error={errors.financingOffer?.negotiable?.message}
        />
        <TextInput
          label={t('financingOffer.vatRate')}
          type="number"
          {...register('financingOffer.vatRate', { valueAsNumber: true })}
          error={errors.financingOffer?.vatRate?.message}
        />
        <TextInput
          label={t('financingOffer.duration')}
          type="number"
          {...register('financingOffer.duration', { valueAsNumber: true })}
          error={errors.financingOffer?.duration?.message}
        />
        <TextInput
          label={t('financingOffer.monthlyRate')}
          type="number"
          {...register('financingOffer.monthlyRate', { valueAsNumber: true })}
          error={errors.financingOffer?.monthlyRate?.message}
        />
        <TextInput
          label={t('financingOffer.annualPercentageRate')}
          type="number"
          {...register('financingOffer.annualPercentageRate', { valueAsNumber: true })}
          error={errors.financingOffer?.annualPercentageRate?.message}
        />
        <TextInput
          label={t('financingOffer.initialPayment')}
          type="number"
          {...register('financingOffer.initialPayment', { valueAsNumber: true })}
          error={errors.financingOffer?.initialPayment?.message}
        />
        <TextInput
          label={t('financingOffer.endingRate')}
          type="number"
          {...register('financingOffer.endingRate', { valueAsNumber: true })}
          error={errors.financingOffer?.endingRate?.message}
        />
      </Fieldset>

      <Button justifySelf="center" type="submit" size="lg" position="sticky" bottom="4" px="10">
        {t('submit')}
      </Button>
    </Form>
  );
};

export { ComplexForm };
