'use client';

import { Checkbox } from '@/components/Form/Checkbox';
import { Fieldset } from '@/components/Form/Fieldset';
import { Form } from '@/components/Form/Form';
import { NumericInput } from '@/components/Form/NumericInput';
import { Radio } from '@/components/Form/Radio';
import { Select } from '@/components/Form/Select';
import { TextInput } from '@/components/Form/TextInput';
import { Button } from '@chakra-ui/react';
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
import { schema } from './schema';
import { useWltpCo2EmissionsCombinedVisibility } from './visibility';

const ComplexForm = () => {
  const t = useTranslations('ComplexForm');
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({ mode: 'onSubmit', resolver: zodResolver(schema) });
  const isWltpCo2EmissionsCombinedVisible = useWltpCo2EmissionsCombinedVisibility(control);

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
        <NumericInput
          label={t('characteristics.seats')}
          error={errors.characteristics?.seats?.message}
          {...register('characteristics.seats', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('characteristics.doors')}
          error={errors.characteristics?.doors?.message}
          {...register('characteristics.doors', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
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
        <div className="grid gap-1">
          <div>{t('characteristics.typeOfPaint')}</div>
          <Checkbox
            label={t('characteristics.metallic')}
            {...register('characteristics.metallic')}
            error={errors.characteristics?.metallic?.message}
          />
        </div>
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
        <NumericInput
          label={t('condition.mileage')}
          error={errors.condition?.mileage?.message}
          {...register('condition.mileage', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
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
        <NumericInput
          label={t('condition.owners')}
          error={errors.condition?.owners?.message}
          {...register('condition.owners', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
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
        <NumericInput
          label={t('motor.powerKW')}
          error={errors.motor?.powerKW?.message}
          {...register('motor.powerKW', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })}
        />
        <NumericInput
          label={t('motor.powerHP')}
          error={errors.motor?.powerHP?.message}
          {...register('motor.powerHP', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })}
        />
        <NumericInput
          label={t('motor.gears')}
          error={errors.motor?.gears?.message}
          {...register('motor.gears', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })}
        />
        <NumericInput
          label={t('motor.cylinders')}
          error={errors.motor?.cylinders?.message}
          {...register('motor.cylinders', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('motor.engineCapacity')}
          error={errors.motor?.engineCapacity?.message}
          {...register('motor.engineCapacity', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('motor.emptyWeight')}
          error={errors.motor?.emptyWeight?.message}
          {...register('motor.emptyWeight', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
      </Fieldset>

      <Fieldset legend={t('equipment.legend')}>
        <div className="grid gap-1">
          <div>{t('equipment.airbags.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.airbags.rearAirbag')}
              {...register('equipment.airbags.rearAirbag')}
              error={errors.equipment?.airbags?.rearAirbag?.message}
            />
            <Checkbox
              label={t('equipment.airbags.passengerAirbag')}
              {...register('equipment.airbags.passengerAirbag')}
              error={errors.equipment?.airbags?.passengerAirbag?.message}
            />
            <Checkbox
              label={t('equipment.airbags.driverAirbag')}
              {...register('equipment.airbags.driverAirbag')}
              error={errors.equipment?.airbags?.driverAirbag?.message}
            />
            <Checkbox
              label={t('equipment.airbags.headAirbag')}
              {...register('equipment.airbags.headAirbag')}
              error={errors.equipment?.airbags?.headAirbag?.message}
            />
            <Checkbox
              label={t('equipment.airbags.sideAirbag')}
              {...register('equipment.airbags.sideAirbag')}
              error={errors.equipment?.airbags?.sideAirbag?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.assistanceSystems.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.assistanceSystems.distanceWarning')}
              {...register('equipment.assistanceSystems.distanceWarning')}
              error={errors.equipment?.assistanceSystems?.distanceWarning?.message}
            />
            <Checkbox
              label={t('equipment.assistanceSystems.emergencyBrakeAssist')}
              {...register('equipment.assistanceSystems.emergencyBrakeAssist')}
              error={errors.equipment?.assistanceSystems?.emergencyBrakeAssist?.message}
            />
            <Checkbox
              label={t('equipment.assistanceSystems.hillStartAssist')}
              {...register('equipment.assistanceSystems.hillStartAssist')}
              error={errors.equipment?.assistanceSystems?.hillStartAssist?.message}
            />
            <Checkbox
              label={t('equipment.assistanceSystems.laneKeepingAssist')}
              {...register('equipment.assistanceSystems.laneKeepingAssist')}
              error={errors.equipment?.assistanceSystems?.laneKeepingAssist?.message}
            />
            <Checkbox
              label={t('equipment.assistanceSystems.blindSpotAssist')}
              {...register('equipment.assistanceSystems.blindSpotAssist')}
              error={errors.equipment?.assistanceSystems?.blindSpotAssist?.message}
            />
            <Checkbox
              label={t('equipment.assistanceSystems.highBeamAssist')}
              {...register('equipment.assistanceSystems.highBeamAssist')}
              error={errors.equipment?.assistanceSystems?.highBeamAssist?.message}
            />
            <Checkbox
              label={t('equipment.assistanceSystems.trafficSignRecognition')}
              {...register('equipment.assistanceSystems.trafficSignRecognition')}
              error={errors.equipment?.assistanceSystems?.trafficSignRecognition?.message}
            />
            <Checkbox
              label={t('equipment.assistanceSystems.nightVisionAssist')}
              {...register('equipment.assistanceSystems.nightVisionAssist')}
              error={errors.equipment?.assistanceSystems?.nightVisionAssist?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.parkingAssist.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.parkingAssist.camera360')}
              {...register('equipment.parkingAssist.camera360')}
              error={errors.equipment?.parkingAssist?.camera360?.message}
            />
            <Checkbox
              label={t('equipment.parkingAssist.frontSensors')}
              {...register('equipment.parkingAssist.frontSensors')}
              error={errors.equipment?.parkingAssist?.frontSensors?.message}
            />
            <Checkbox
              label={t('equipment.parkingAssist.rearSensors')}
              {...register('equipment.parkingAssist.rearSensors')}
              error={errors.equipment?.parkingAssist?.rearSensors?.message}
            />
            <Checkbox
              label={t('equipment.parkingAssist.selfSteeringSystem')}
              {...register('equipment.parkingAssist.selfSteeringSystem')}
              error={errors.equipment?.parkingAssist?.selfSteeringSystem?.message}
            />
            <Checkbox
              label={t('equipment.parkingAssist.parkingCamera')}
              {...register('equipment.parkingAssist.parkingCamera')}
              error={errors.equipment?.parkingAssist?.parkingCamera?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.extras.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.extras.allWeatherTires')}
              {...register('equipment.extras.allWeatherTires')}
              error={errors.equipment?.extras?.allWeatherTires?.message}
            />
            <Checkbox
              label={t('equipment.extras.punctureKit')}
              {...register('equipment.extras.punctureKit')}
              error={errors.equipment?.extras?.punctureKit?.message}
            />
            <Checkbox
              label={t('equipment.extras.alloyWheels')}
              {...register('equipment.extras.alloyWheels')}
              error={errors.equipment?.extras?.alloyWheels?.message}
            />
            <Checkbox
              label={t('equipment.extras.smokerPackage')}
              {...register('equipment.extras.smokerPackage')}
              error={errors.equipment?.extras?.smokerPackage?.message}
            />
            <Checkbox
              label={t('equipment.extras.ambientLighting')}
              {...register('equipment.extras.ambientLighting')}
              error={errors.equipment?.extras?.ambientLighting?.message}
            />
            <Checkbox
              label={t('equipment.extras.towBar')}
              {...register('equipment.extras.towBar')}
              error={errors.equipment?.extras?.towBar?.message}
            />
            <Checkbox
              label={t('equipment.extras.rangeExtender')}
              {...register('equipment.extras.rangeExtender')}
              error={errors.equipment?.extras?.rangeExtender?.message}
            />
            <Checkbox
              label={t('equipment.extras.batteryCertificate')}
              {...register('equipment.extras.batteryCertificate')}
              error={errors.equipment?.extras?.batteryCertificate?.message}
            />
            <Checkbox
              label={t('equipment.extras.spareWheel')}
              {...register('equipment.extras.spareWheel')}
              error={errors.equipment?.extras?.spareWheel?.message}
            />
            <Checkbox
              label={t('equipment.extras.wheelchairAccessible')}
              {...register('equipment.extras.wheelchairAccessible')}
              error={errors.equipment?.extras?.wheelchairAccessible?.message}
            />
            <Checkbox
              label={t('equipment.extras.headlightCleaning')}
              {...register('equipment.extras.headlightCleaning')}
              error={errors.equipment?.extras?.headlightCleaning?.message}
            />
            <Checkbox
              label={t('equipment.extras.bidirectionalCharging')}
              {...register('equipment.extras.bidirectionalCharging')}
              error={errors.equipment?.extras?.bidirectionalCharging?.message}
            />
            <Checkbox
              label={t('equipment.extras.rearSeatHeating')}
              {...register('equipment.extras.rearSeatHeating')}
              error={errors.equipment?.extras?.rearSeatHeating?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.climateControl.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.climateControl.twoZoneClimateControl')}
              {...register('equipment.climateControl.twoZoneClimateControl')}
              error={errors.equipment?.climateControl?.twoZoneClimateControl?.message}
            />
            <Checkbox
              label={t('equipment.climateControl.airConditioning')}
              {...register('equipment.climateControl.airConditioning')}
              error={errors.equipment?.climateControl?.airConditioning?.message}
            />
            <Checkbox
              label={t('equipment.climateControl.threeZoneClimateControl')}
              {...register('equipment.climateControl.threeZoneClimateControl')}
              error={errors.equipment?.climateControl?.threeZoneClimateControl?.message}
            />
            <Checkbox
              label={t('equipment.climateControl.automaticClimateControl')}
              {...register('equipment.climateControl.automaticClimateControl')}
              error={errors.equipment?.climateControl?.automaticClimateControl?.message}
            />
            <Checkbox
              label={t('equipment.climateControl.fourZoneClimateControl')}
              {...register('equipment.climateControl.fourZoneClimateControl')}
              error={errors.equipment?.climateControl?.fourZoneClimateControl?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.comfort.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.comfort.armrest')}
              {...register('equipment.comfort.armrest')}
              error={errors.equipment?.comfort?.armrest?.message}
            />
            <Checkbox
              label={t('equipment.comfort.panoramicRoof')}
              {...register('equipment.comfort.panoramicRoof')}
              error={errors.equipment?.comfort?.panoramicRoof?.message}
            />
            <Checkbox
              label={t('equipment.comfort.heatedWindshield')}
              {...register('equipment.comfort.heatedWindshield')}
              error={errors.equipment?.comfort?.heatedWindshield?.message}
            />
            <Checkbox
              label={t('equipment.comfort.rainSensor')}
              {...register('equipment.comfort.rainSensor')}
              error={errors.equipment?.comfort?.rainSensor?.message}
            />
            <Checkbox
              label={t('equipment.comfort.heatedSteeringWheel')}
              {...register('equipment.comfort.heatedSteeringWheel')}
              error={errors.equipment?.comfort?.heatedSteeringWheel?.message}
            />
            <Checkbox
              label={t('equipment.comfort.paddleShifters')}
              {...register('equipment.comfort.paddleShifters')}
              error={errors.equipment?.comfort?.paddleShifters?.message}
            />
            <Checkbox
              label={t('equipment.comfort.electricWindows')}
              {...register('equipment.comfort.electricWindows')}
              error={errors.equipment?.comfort?.electricWindows?.message}
            />
            <Checkbox
              label={t('equipment.comfort.sunroof')}
              {...register('equipment.comfort.sunroof')}
              error={errors.equipment?.comfort?.sunroof?.message}
            />
            <Checkbox
              label={t('equipment.comfort.electricTailgate')}
              {...register('equipment.comfort.electricTailgate')}
              error={errors.equipment?.comfort?.electricTailgate?.message}
            />
            <Checkbox
              label={t('equipment.comfort.slidingDoor')}
              {...register('equipment.comfort.slidingDoor')}
              error={errors.equipment?.comfort?.slidingDoor?.message}
            />
            <Checkbox
              label={t('equipment.comfort.electricSideMirrors')}
              {...register('equipment.comfort.electricSideMirrors')}
              error={errors.equipment?.comfort?.electricSideMirrors?.message}
            />
            <Checkbox
              label={t('equipment.comfort.headUpDisplay')}
              {...register('equipment.comfort.headUpDisplay')}
              error={errors.equipment?.comfort?.headUpDisplay?.message}
            />
            <Checkbox
              label={t('equipment.comfort.leatherSteeringWheel')}
              {...register('equipment.comfort.leatherSteeringWheel')}
              error={errors.equipment?.comfort?.leatherSteeringWheel?.message}
            />
            <Checkbox
              label={t('equipment.comfort.powerSteering')}
              {...register('equipment.comfort.powerSteering')}
              error={errors.equipment?.comfort?.powerSteering?.message}
            />
            <Checkbox
              label={t('equipment.comfort.lightSensor')}
              {...register('equipment.comfort.lightSensor')}
              error={errors.equipment?.comfort?.lightSensor?.message}
            />
            <Checkbox
              label={t('equipment.comfort.parkingHeater')}
              {...register('equipment.comfort.parkingHeater')}
              error={errors.equipment?.comfort?.parkingHeater?.message}
            />
            <Checkbox
              label={t('equipment.comfort.airSuspension')}
              {...register('equipment.comfort.airSuspension')}
              error={errors.equipment?.comfort?.airSuspension?.message}
            />
            <Checkbox
              label={t('equipment.comfort.startStopSystem')}
              {...register('equipment.comfort.startStopSystem')}
              error={errors.equipment?.comfort?.startStopSystem?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.lighting.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.lighting.biXenonHeadlights')}
              {...register('equipment.lighting.biXenonHeadlights')}
              error={errors.equipment?.lighting?.biXenonHeadlights?.message}
            />
            <Checkbox
              label={t('equipment.lighting.lightSensor')}
              {...register('equipment.lighting.lightSensor')}
              error={errors.equipment?.lighting?.lightSensor?.message}
            />
            <Checkbox
              label={t('equipment.lighting.glareFreeHighBeam')}
              {...register('equipment.lighting.glareFreeHighBeam')}
              error={errors.equipment?.lighting?.glareFreeHighBeam?.message}
            />
            <Checkbox
              label={t('equipment.lighting.fogLights')}
              {...register('equipment.lighting.fogLights')}
              error={errors.equipment?.lighting?.fogLights?.message}
            />
            <Checkbox
              label={t('equipment.lighting.corneringLights')}
              {...register('equipment.lighting.corneringLights')}
              error={errors.equipment?.lighting?.corneringLights?.message}
            />
            <Checkbox
              label={t('equipment.lighting.daytimeRunningLights')}
              {...register('equipment.lighting.daytimeRunningLights')}
              error={errors.equipment?.lighting?.daytimeRunningLights?.message}
            />
            <Checkbox
              label={t('equipment.lighting.ledHeadlights')}
              {...register('equipment.lighting.ledHeadlights')}
              error={errors.equipment?.lighting?.ledHeadlights?.message}
            />
            <Checkbox
              label={t('equipment.lighting.fullLedHeadlights')}
              {...register('equipment.lighting.fullLedHeadlights')}
              error={errors.equipment?.lighting?.fullLedHeadlights?.message}
            />
            <Checkbox
              label={t('equipment.lighting.ledDaytimeRunningLights')}
              {...register('equipment.lighting.ledDaytimeRunningLights')}
              error={errors.equipment?.lighting?.ledDaytimeRunningLights?.message}
            />
            <Checkbox
              label={t('equipment.lighting.xenonHeadlights')}
              {...register('equipment.lighting.xenonHeadlights')}
              error={errors.equipment?.lighting?.xenonHeadlights?.message}
            />
            <Checkbox
              label={t('equipment.lighting.laserLights')}
              {...register('equipment.lighting.laserLights')}
              error={errors.equipment?.lighting?.laserLights?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.safety.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.safety.abs')}
              {...register('equipment.safety.abs')}
              error={errors.equipment?.safety?.abs?.message}
            />
            <Checkbox
              label={t('equipment.safety.emergencyCallSystem')}
              {...register('equipment.safety.emergencyCallSystem')}
              error={errors.equipment?.safety?.emergencyCallSystem?.message}
            />
            <Checkbox
              label={t('equipment.safety.alarmSystem')}
              {...register('equipment.safety.alarmSystem')}
              error={errors.equipment?.safety?.alarmSystem?.message}
            />
            <Checkbox
              label={t('equipment.safety.tirePressureMonitoring')}
              {...register('equipment.safety.tirePressureMonitoring')}
              error={errors.equipment?.safety?.tirePressureMonitoring?.message}
            />
            <Checkbox
              label={t('equipment.safety.esp')}
              {...register('equipment.safety.esp')}
              error={errors.equipment?.safety?.esp?.message}
            />
            <Checkbox
              label={t('equipment.safety.tractionControl')}
              {...register('equipment.safety.tractionControl')}
              error={errors.equipment?.safety?.tractionControl?.message}
            />
            <Checkbox
              label={t('equipment.safety.isofix')}
              {...register('equipment.safety.isofix')}
              error={errors.equipment?.safety?.isofix?.message}
            />
            <Checkbox
              label={t('equipment.safety.immobilizer')}
              {...register('equipment.safety.immobilizer')}
              error={errors.equipment?.safety?.immobilizer?.message}
            />
            <Checkbox
              label={t('equipment.safety.fatigueWarningSystem')}
              {...register('equipment.safety.fatigueWarningSystem')}
              error={errors.equipment?.safety?.fatigueWarningSystem?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.seats.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.seats.electricSeats')}
              {...register('equipment.seats.electricSeats')}
              error={errors.equipment?.seats?.electricSeats?.message}
            />
            <Checkbox
              label={t('equipment.seats.heatedSeats')}
              {...register('equipment.seats.heatedSeats')}
              error={errors.equipment?.seats?.heatedSeats?.message}
            />
            <Checkbox
              label={t('equipment.seats.lumbarSupport')}
              {...register('equipment.seats.lumbarSupport')}
              error={errors.equipment?.seats?.lumbarSupport?.message}
            />
            <Checkbox
              label={t('equipment.seats.sportSeats')}
              {...register('equipment.seats.sportSeats')}
              error={errors.equipment?.seats?.sportSeats?.message}
            />
            <Checkbox
              label={t('equipment.seats.massageSeats')}
              {...register('equipment.seats.massageSeats')}
              error={errors.equipment?.seats?.massageSeats?.message}
            />
            <Checkbox
              label={t('equipment.seats.foldablePassengerSeat')}
              {...register('equipment.seats.foldablePassengerSeat')}
              error={errors.equipment?.seats?.foldablePassengerSeat?.message}
            />
            <Checkbox
              label={t('equipment.seats.ventilatedSeats')}
              {...register('equipment.seats.ventilatedSeats')}
              error={errors.equipment?.seats?.ventilatedSeats?.message}
            />
            <Checkbox
              label={t('equipment.seats.splitRearSeat')}
              {...register('equipment.seats.splitRearSeat')}
              error={errors.equipment?.seats?.splitRearSeat?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.cruiseControl.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.cruiseControl.adaptiveCruiseControl')}
              {...register('equipment.cruiseControl.adaptiveCruiseControl')}
              error={errors.equipment?.cruiseControl?.adaptiveCruiseControl?.message}
            />
            <Checkbox
              label={t('equipment.cruiseControl.cruiseControl')}
              {...register('equipment.cruiseControl.cruiseControl')}
              error={errors.equipment?.cruiseControl?.cruiseControl?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.entertainment.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.entertainment.androidAuto')}
              {...register('equipment.entertainment.androidAuto')}
              error={errors.equipment?.entertainment?.androidAuto?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.voiceControl')}
              {...register('equipment.entertainment.voiceControl')}
              error={errors.equipment?.entertainment?.voiceControl?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.appleCarPlay')}
              {...register('equipment.entertainment.appleCarPlay')}
              error={errors.equipment?.entertainment?.appleCarPlay?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.tv')}
              {...register('equipment.entertainment.tv')}
              error={errors.equipment?.entertainment?.tv?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.dabRadio')}
              {...register('equipment.entertainment.dabRadio')}
              error={errors.equipment?.entertainment?.dabRadio?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.touchscreen')}
              {...register('equipment.entertainment.touchscreen')}
              error={errors.equipment?.entertainment?.touchscreen?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.wirelessCharging')}
              {...register('equipment.entertainment.wirelessCharging')}
              error={errors.equipment?.entertainment?.wirelessCharging?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.usb')}
              {...register('equipment.entertainment.usb')}
              error={errors.equipment?.entertainment?.usb?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.integratedMusicStreaming')}
              {...register('equipment.entertainment.integratedMusicStreaming')}
              error={errors.equipment?.entertainment?.integratedMusicStreaming?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.digitalInstrumentCluster')}
              {...register('equipment.entertainment.digitalInstrumentCluster')}
              error={errors.equipment?.entertainment?.digitalInstrumentCluster?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.soundSystem')}
              {...register('equipment.entertainment.soundSystem')}
              error={errors.equipment?.entertainment?.soundSystem?.message}
            />
            <Checkbox
              label={t('equipment.entertainment.wifiHotspot')}
              {...register('equipment.entertainment.wifiHotspot')}
              error={errors.equipment?.entertainment?.wifiHotspot?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.media.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.media.bluetooth')}
              {...register('equipment.media.bluetooth')}
              error={errors.equipment?.media?.bluetooth?.message}
            />
            <Checkbox
              label={t('equipment.media.mp3')}
              {...register('equipment.media.mp3')}
              error={errors.equipment?.media?.mp3?.message}
            />
            <Checkbox
              label={t('equipment.media.onboardComputer')}
              {...register('equipment.media.onboardComputer')}
              error={errors.equipment?.media?.onboardComputer?.message}
            />
            <Checkbox
              label={t('equipment.media.multifunctionSteeringWheel')}
              {...register('equipment.media.multifunctionSteeringWheel')}
              error={errors.equipment?.media?.multifunctionSteeringWheel?.message}
            />
            <Checkbox
              label={t('equipment.media.cd')}
              {...register('equipment.media.cd')}
              error={errors.equipment?.media?.cd?.message}
            />
            <Checkbox
              label={t('equipment.media.navigationSystem')}
              {...register('equipment.media.navigationSystem')}
              error={errors.equipment?.media?.navigationSystem?.message}
            />
            <Checkbox
              label={t('equipment.media.handsFreeSystem')}
              {...register('equipment.media.handsFreeSystem')}
              error={errors.equipment?.media?.handsFreeSystem?.message}
            />
            <Checkbox
              label={t('equipment.media.radio')}
              {...register('equipment.media.radio')}
              error={errors.equipment?.media?.radio?.message}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <div>{t('equipment.centralLocking.legend')}</div>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
            <Checkbox
              label={t('equipment.centralLocking.keylessCentralLocking')}
              {...register('equipment.centralLocking.keylessCentralLocking')}
              error={errors.equipment?.centralLocking?.keylessCentralLocking?.message}
            />
            <Checkbox
              label={t('equipment.centralLocking.remoteCentralLocking')}
              {...register('equipment.centralLocking.remoteCentralLocking')}
              error={errors.equipment?.centralLocking?.remoteCentralLocking?.message}
            />
            <Checkbox
              label={t('equipment.centralLocking.centralLocking')}
              {...register('equipment.centralLocking.centralLocking')}
              error={errors.equipment?.centralLocking?.centralLocking?.message}
            />
          </div>
        </div>
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
          name="fuel.environmentalProtocol"
          control={control}
          render={({ field }) => (
            <Select
              label={t('fuel.environmentalProtocol')}
              error={errors.fuel?.environmentalProtocol?.message}
              options={[
                { value: 'nedc', label: t('fuel.environmentalProtocolOptions.nedc') },
                { value: 'wltp', label: t('fuel.environmentalProtocolOptions.wltp') },
              ]}
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
        <NumericInput
          label={t('fuel.wltpConsumptionCombined')}
          error={errors.fuel?.wltpConsumptionCombined?.message}
          {...register('fuel.wltpConsumptionCombined', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        {isWltpCo2EmissionsCombinedVisible && (
          <NumericInput
            label={t('fuel.wltpCo2EmissionsCombined')}
            error={errors.fuel?.wltpCo2EmissionsCombined?.message}
            {...register('fuel.wltpCo2EmissionsCombined', {
              setValueAs: (v) => (v === '' ? undefined : Number(v)),
            })}
          />
        )}

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
        <NumericInput
          label={t('price.amount')}
          error={errors.price?.amount?.message}
          {...register('price.amount', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })}
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
        <NumericInput
          label={t('financingOffer.price')}
          error={errors.financingOffer?.price?.message}
          {...register('financingOffer.price', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('financingOffer.netPrice')}
          error={errors.financingOffer?.netPrice?.message}
          {...register('financingOffer.netPrice', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
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
        <NumericInput
          label={t('financingOffer.vatRate')}
          error={errors.financingOffer?.vatRate?.message}
          {...register('financingOffer.vatRate', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('financingOffer.duration')}
          error={errors.financingOffer?.duration?.message}
          {...register('financingOffer.duration', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('financingOffer.monthlyRate')}
          error={errors.financingOffer?.monthlyRate?.message}
          {...register('financingOffer.monthlyRate', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('financingOffer.annualPercentageRate')}
          error={errors.financingOffer?.annualPercentageRate?.message}
          {...register('financingOffer.annualPercentageRate', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('financingOffer.initialPayment')}
          error={errors.financingOffer?.initialPayment?.message}
          {...register('financingOffer.initialPayment', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
        <NumericInput
          label={t('financingOffer.endingRate')}
          error={errors.financingOffer?.endingRate?.message}
          {...register('financingOffer.endingRate', {
            setValueAs: (v) => (v === '' ? undefined : Number(v)),
          })}
        />
      </Fieldset>

      <Button justifySelf="center" type="submit" size="lg" position="sticky" bottom="4" px="10">
        {t('submit')}
      </Button>
    </Form>
  );
};

export { ComplexForm };
