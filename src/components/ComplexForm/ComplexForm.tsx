'use client';

import { Checkbox } from '@/components/Form/Checkbox';
import { Fieldset } from '@/components/Form/Fieldset';
import { Form } from '@/components/Form/Form';
import { NumericInputContainer } from '@/components/Form/NumericInput';
import { Radio } from '@/components/Form/Radio';
import { Select, SelectContainer } from '@/components/Form/Select';
import { TextInputContainer } from '@/components/Form/TextInput';
import { getZodErrorMap } from '@/i18n/validation';
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
  const tZod = useTranslations('zod');
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema, { errorMap: getZodErrorMap(tZod) }),
  });
  const isWltpCo2EmissionsCombinedVisible = useWltpCo2EmissionsCombinedVisibility(control);

  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))} noValidate>
      <Fieldset legend={t('vehicleData.legend')}>
        <SelectContainer
          name="vehicleData.make"
          label={t('vehicleData.make')}
          options={makes.map((m) => ({ ...m, value: String(m.value) }))}
          control={control}
        />
        <SelectContainer
          name="vehicleData.model"
          label={t('vehicleData.model')}
          options={models[watch('vehicleData.make')] ?? []}
          control={control}
        />
        <TextInputContainer
          label={t('vehicleData.modelVersion')}
          name="vehicleData.modelVersion"
          control={control}
        />
      </Fieldset>

      <Fieldset legend={t('characteristics.legend')}>
        <SelectContainer
          name="characteristics.bodyType"
          control={control}
          label={t('characteristics.bodyType')}
          options={bodyTypes.map((m) => ({ ...m, value: String(m.value) }))}
        />
        <NumericInputContainer
          label={t('characteristics.seats')}
          control={control}
          name="characteristics.seats"
        />
        <NumericInputContainer
          label={t('characteristics.doors')}
          control={control}
          name="characteristics.doors"
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
        <SelectContainer
          name="condition.vehicleOfferType"
          label={t('condition.vehicleOfferType')}
          options={vehicleOfferTypeOptions}
          control={control}
        />
        <NumericInputContainer
          label={t('condition.mileage')}
          control={control}
          name="condition.mileage"
        />
        <div>
          <SelectContainer
            name="condition.firstRegistrationMonth"
            label={t('condition.firstRegistrationMonth')}
            options={Array.from({ length: 12 }, (_, i) => ({
              value: String(i + 1).padStart(2, '0'),
              label: String(i + 1).padStart(2, '0'),
            }))}
            control={control}
          />
          <SelectContainer
            name="condition.firstRegistrationYear"
            label={t('condition.firstRegistrationYear')}
            options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
              value: String(1900 + i),
              label: String(1900 + i),
            }))}
            control={control}
          />
        </div>
        <NumericInputContainer
          label={t('condition.owners')}
          control={control}
          name="condition.owners"
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
          <SelectContainer
            name="condition.nextInspectionMonth"
            label={t('condition.nextInspectionMonth')}
            options={Array.from({ length: 12 }, (_, i) => ({
              value: String(i + 1).padStart(2, '0'),
              label: String(i + 1).padStart(2, '0'),
            }))}
            control={control}
          />
          <SelectContainer
            name="condition.nextInspectionYear"
            label={t('condition.nextInspectionYear')}
            options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
              value: String(1900 + i),
              label: String(1900 + i),
            }))}
            control={control}
          />
        </div>
        <SelectContainer
          name="condition.lastTechnicalServiceMonth"
          label={t('condition.lastTechnicalServiceMonth')}
          options={Array.from({ length: 12 }, (_, i) => ({
            value: String(i + 1).padStart(2, '0'),
            label: String(i + 1).padStart(2, '0'),
          }))}
          control={control}
        />
        <SelectContainer
          name="condition.lastTechnicalServiceYear"
          label={t('condition.lastTechnicalServiceYear')}
          options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
            value: String(1900 + i),
            label: String(1900 + i),
          }))}
          control={control}
        />
        <SelectContainer
          name="condition.lastCamBeltServiceMonth"
          label={t('condition.lastCamBeltServiceMonth')}
          options={Array.from({ length: 12 }, (_, i) => ({
            value: String(i + 1).padStart(2, '0'),
            label: String(i + 1).padStart(2, '0'),
          }))}
          control={control}
        />
        <SelectContainer
          name="condition.lastCamBeltServiceYear"
          label={t('condition.lastCamBeltServiceYear')}
          options={Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
            value: String(1900 + i),
            label: String(1900 + i),
          }))}
          control={control}
        />
        <Controller
          name="condition.damagedVehicle"
          control={control}
          render={({ field }) => (
            <Select
              label={t('condition.damagedVehicle')}
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
        <SelectContainer
          name="motor.driveType"
          label={t('motor.driveType')}
          options={driveTypeOptions}
          control={control}
        />
        <SelectContainer
          name="motor.transmission"
          label={t('motor.transmission')}
          options={transmissionOptions}
          control={control}
        />
        <NumericInputContainer label={t('motor.powerKW')} control={control} name="motor.powerKW" />
        <NumericInputContainer label={t('motor.powerHP')} control={control} name="motor.powerHP" />
        <NumericInputContainer label={t('motor.gears')} control={control} name="motor.gears" />
        <NumericInputContainer
          label={t('motor.cylinders')}
          control={control}
          name="motor.cylinders"
        />
        <NumericInputContainer
          label={t('motor.engineCapacity')}
          control={control}
          name="motor.engineCapacity"
        />
        <NumericInputContainer
          label={t('motor.emptyWeight')}
          control={control}
          name="motor.emptyWeight"
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
        <SelectContainer
          name="fuel.fuelType"
          label={t('fuel.fuelType')}
          options={fuelTypeOptions}
          control={control}
        />
        <SelectContainer
          name="fuel.environmentalProtocol"
          label={t('fuel.environmentalProtocol')}
          options={[
            { value: 'nedc', label: t('fuel.environmentalProtocolOptions.nedc') },
            { value: 'wltp', label: t('fuel.environmentalProtocolOptions.wltp') },
          ]}
          control={control}
        />
        <SelectContainer
          name="fuel.primaryFuelType"
          label={t('fuel.primaryFuelTypeLabel')}
          options={[
            { value: 'gasoline', label: t('fuel.primaryFuelType.gasoline') },
            { value: 'diesel', label: t('fuel.primaryFuelType.diesel') },
            { value: 'electric', label: t('fuel.primaryFuelType.electric') },
          ]}
          control={control}
        />
        <Checkbox
          label={t('fuel.sootParticles')}
          {...register('fuel.sootParticles')}
          error={errors.fuel?.sootParticles?.message}
        />
        <NumericInputContainer
          label={t('fuel.wltpConsumptionCombined')}
          control={control}
          name="fuel.wltpConsumptionCombined"
        />
        {isWltpCo2EmissionsCombinedVisible && (
          <NumericInputContainer
            label={t('fuel.wltpCo2EmissionsCombined')}
            control={control}
            name="fuel.wltpCo2EmissionsCombined"
          />
        )}

        <SelectContainer
          name="fuel.wltpCo2Class"
          label={t('fuel.wltpCo2Class')}
          options={co2ClassOptions}
          control={control}
        />
        <SelectContainer
          name="fuel.pollutionClass"
          label={t('fuel.pollutionClassLabel')}
          options={[
            { value: 'euro6', label: t('fuel.pollutionClass.euro6') },
            { value: 'euro5', label: t('fuel.pollutionClass.euro5') },
          ]}
          control={control}
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
        <NumericInputContainer label={t('price.amount')} control={control} name="price.amount" />
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
        <TextInputContainer
          label={t('contactInformation.postalCode')}
          name="contactInformation.postalCode"
          control={control}
        />
        <TextInputContainer
          label={t('contactInformation.city')}
          name="contactInformation.city"
          control={control}
        />
        <TextInputContainer
          label={t('contactInformation.phoneCountryCode')}
          name="contactInformation.phoneCountryCode"
          control={control}
        />
        <TextInputContainer
          label={t('contactInformation.phoneAreaCode')}
          name="contactInformation.phoneAreaCode"
          control={control}
        />
        <TextInputContainer
          label={t('contactInformation.phoneSubscriberNumber')}
          name="contactInformation.phoneSubscriberNumber"
          control={control}
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
        <NumericInputContainer
          label={t('financingOffer.price')}
          control={control}
          name="financingOffer.price"
        />
        <NumericInputContainer
          label={t('financingOffer.netPrice')}
          control={control}
          name="financingOffer.netPrice"
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
        <NumericInputContainer
          label={t('financingOffer.vatRate')}
          control={control}
          name="financingOffer.vatRate"
        />
        <NumericInputContainer
          label={t('financingOffer.duration')}
          control={control}
          name="financingOffer.duration"
        />
        <NumericInputContainer
          label={t('financingOffer.monthlyRate')}
          control={control}
          name="financingOffer.monthlyRate"
        />
        <NumericInputContainer
          label={t('financingOffer.annualPercentageRate')}
          control={control}
          name="financingOffer.annualPercentageRate"
        />
        <NumericInputContainer
          label={t('financingOffer.initialPayment')}
          control={control}
          name="financingOffer.initialPayment"
        />
        <NumericInputContainer
          label={t('financingOffer.endingRate')}
          control={control}
          name="financingOffer.endingRate"
        />
      </Fieldset>

      <Button justifySelf="center" type="submit" size="lg" position="sticky" bottom="4" px="10">
        {t('submit')}
      </Button>
    </Form>
  );
};

export { ComplexForm };
