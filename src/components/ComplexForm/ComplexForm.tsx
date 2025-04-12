'use client';

import { toaster } from '@/components/ChakraUi/Toaster';
import { CheckboxContainer } from '@/components/Form/Checkbox';
import { Fieldset } from '@/components/Form/Fieldset';
import { Form } from '@/components/Form/Form';
import { NumericInputContainer } from '@/components/Form/NumericInput';
import { RadioContainer } from '@/components/Form/Radio';
import { Select, SelectContainer } from '@/components/Form/Select';
import { TextInputContainer } from '@/components/Form/TextInput';
import { getZodErrorMap } from '@/i18n/validation';
import { ActionBar, Button, Portal } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  bodyColors,
  bodyTypes,
  co2ClassOptions,
  driveTypeOptions,
  fuelTypeOptions,
  interiorColorOptions,
  makes,
  phoneCountryCodes,
  transmissionOptions,
  upholsteryOptions,
  vehicleOfferTypeOptions,
} from './constants';
import { defaultValues } from './default';
import { useVehicleDataModelOptions } from './options';
import { schema } from './schema';
import {
  useCarpassMileageUrlVisibility,
  useModelNameVisibility,
  useVinVisibility,
  useWltpCo2EmissionsCombinedVisibility,
} from './visibility';

const ComplexForm = () => {
  const t = useTranslations('ComplexForm');
  const tZod = useTranslations('zod');
  const form = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(schema, { errorMap: getZodErrorMap(tZod) }),
  });
  const { handleSubmit, control, reset } = form;

  const isWltpCo2EmissionsCombinedVisible = useWltpCo2EmissionsCombinedVisibility(control);
  const vehicleDataModelOptions = useVehicleDataModelOptions(control);
  const isModelNameVisible = useModelNameVisibility();
  const isVinVisible = useVinVisibility();
  const isCarpassMileageUrlVisible = useCarpassMileageUrlVisibility();

  return (
    <FormProvider {...form}>
      <Form
        storageKey="complex-form"
        id="complex-form"
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          reset();
          toaster.create({ description: 'Success', type: 'success' });
        })}
      >
        <Fieldset legend={t('vehicleData.legend')} id="vehicleData">
          <SelectContainer
            name="vehicleData.make"
            label={t('vehicleData.make')}
            options={makes.map((m) => ({ ...m, value: String(m.value) }))}
            control={control}
          />
          <SelectContainer
            name="vehicleData.model"
            label={t('vehicleData.model')}
            options={vehicleDataModelOptions.models}
            disabled={vehicleDataModelOptions.isLoading}
            isLoading={vehicleDataModelOptions.isLoading}
            control={control}
          />
          <TextInputContainer
            label={t('vehicleData.modelVersion')}
            name="vehicleData.modelVersion"
            control={control}
          />
          {isModelNameVisible && (
            <TextInputContainer
              label={t('vehicleData.modelName')}
              name="vehicleData.modelName"
              control={control}
            />
          )}
          {isVinVisible && (
            <TextInputContainer
              label={t('vehicleData.vin')}
              name="vehicleData.vin"
              control={control}
            />
          )}
          {isCarpassMileageUrlVisible && (
            <TextInputContainer
              label={t('vehicleData.carpassMileageUrl')}
              name="vehicleData.carpassMileageUrl"
              control={control}
            />
          )}
        </Fieldset>

        <Fieldset legend={t('characteristics.legend')} id="characteristics">
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
          <RadioContainer
            name="characteristics.color"
            options={bodyColors}
            label={t('characteristics.color')}
            control={control}
          />
          <div className="grid gap-1">
            <div>{t('characteristics.typeOfPaint')}</div>
            <CheckboxContainer
              name="characteristics.metallic"
              label={t('characteristics.metallic')}
              control={control}
            />
          </div>
          <RadioContainer
            name="characteristics.upholstery"
            options={upholsteryOptions}
            label={t('characteristics.upholstery')}
            control={control}
          />
          <RadioContainer
            name="characteristics.interiorColor"
            options={interiorColorOptions}
            label={t('characteristics.interiorColor')}
            control={control}
          />
        </Fieldset>

        <Fieldset legend={t('condition.legend')} id="condition">
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
          <div className="grid grid-cols-2">
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
          <CheckboxContainer
            name="condition.fullServiceHistory"
            label={t('condition.fullServiceHistory')}
            control={control}
          />
          <CheckboxContainer
            name="condition.nonSmoking"
            label={t('condition.nonSmoking')}
            control={control}
          />
          <div className="inputs-wrapper">
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
              options={Array.from({ length: 101 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return { value: String(year), label: String(year) };
              })}
              control={control}
            />
          </div>
          <div className="inputs-wrapper">
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
              options={Array.from({ length: 101 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return { value: String(year), label: String(year) };
              })}
              control={control}
            />
          </div>
          <div className="inputs-wrapper">
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
              options={Array.from({ length: 101 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return { value: String(year), label: String(year) };
              })}
              control={control}
            />
          </div>
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

        <Fieldset legend={t('equipment.legend')} id="equipment">
          <div className="grid gap-1">
            <div>{t('equipment.airbags.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.airbags.rearAirbag"
                label={t('equipment.airbags.rearAirbag')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.airbags.passengerAirbag"
                label={t('equipment.airbags.passengerAirbag')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.airbags.driverAirbag"
                label={t('equipment.airbags.driverAirbag')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.airbags.headAirbag"
                label={t('equipment.airbags.headAirbag')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.airbags.sideAirbag"
                label={t('equipment.airbags.sideAirbag')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.assistanceSystems.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.assistanceSystems.distanceWarning"
                label={t('equipment.assistanceSystems.distanceWarning')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.assistanceSystems.emergencyBrakeAssist"
                label={t('equipment.assistanceSystems.emergencyBrakeAssist')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.assistanceSystems.hillStartAssist"
                label={t('equipment.assistanceSystems.hillStartAssist')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.assistanceSystems.laneKeepingAssist"
                label={t('equipment.assistanceSystems.laneKeepingAssist')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.assistanceSystems.blindSpotAssist"
                label={t('equipment.assistanceSystems.blindSpotAssist')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.assistanceSystems.highBeamAssist"
                label={t('equipment.assistanceSystems.highBeamAssist')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.assistanceSystems.trafficSignRecognition"
                label={t('equipment.assistanceSystems.trafficSignRecognition')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.assistanceSystems.nightVisionAssist"
                label={t('equipment.assistanceSystems.nightVisionAssist')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.parkingAssist.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.parkingAssist.camera360"
                label={t('equipment.parkingAssist.camera360')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.parkingAssist.frontSensors"
                label={t('equipment.parkingAssist.frontSensors')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.parkingAssist.rearSensors"
                label={t('equipment.parkingAssist.rearSensors')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.parkingAssist.selfSteeringSystem"
                label={t('equipment.parkingAssist.selfSteeringSystem')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.parkingAssist.parkingCamera"
                label={t('equipment.parkingAssist.parkingCamera')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.extras.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.extras.allWeatherTires"
                label={t('equipment.extras.allWeatherTires')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.punctureKit"
                label={t('equipment.extras.punctureKit')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.alloyWheels"
                label={t('equipment.extras.alloyWheels')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.smokerPackage"
                label={t('equipment.extras.smokerPackage')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.ambientLighting"
                label={t('equipment.extras.ambientLighting')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.towBar"
                label={t('equipment.extras.towBar')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.rangeExtender"
                label={t('equipment.extras.rangeExtender')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.batteryCertificate"
                label={t('equipment.extras.batteryCertificate')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.spareWheel"
                label={t('equipment.extras.spareWheel')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.wheelchairAccessible"
                label={t('equipment.extras.wheelchairAccessible')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.headlightCleaning"
                label={t('equipment.extras.headlightCleaning')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.bidirectionalCharging"
                label={t('equipment.extras.bidirectionalCharging')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.extras.rearSeatHeating"
                label={t('equipment.extras.rearSeatHeating')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.climateControl.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.climateControl.twoZoneClimateControl"
                label={t('equipment.climateControl.twoZoneClimateControl')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.climateControl.airConditioning"
                label={t('equipment.climateControl.airConditioning')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.climateControl.threeZoneClimateControl"
                label={t('equipment.climateControl.threeZoneClimateControl')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.climateControl.automaticClimateControl"
                label={t('equipment.climateControl.automaticClimateControl')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.climateControl.fourZoneClimateControl"
                label={t('equipment.climateControl.fourZoneClimateControl')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.comfort.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.comfort.armrest"
                label={t('equipment.comfort.armrest')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.panoramicRoof"
                label={t('equipment.comfort.panoramicRoof')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.heatedWindshield"
                label={t('equipment.comfort.heatedWindshield')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.rainSensor"
                label={t('equipment.comfort.rainSensor')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.heatedSteeringWheel"
                label={t('equipment.comfort.heatedSteeringWheel')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.paddleShifters"
                label={t('equipment.comfort.paddleShifters')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.electricWindows"
                label={t('equipment.comfort.electricWindows')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.sunroof"
                label={t('equipment.comfort.sunroof')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.electricTailgate"
                label={t('equipment.comfort.electricTailgate')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.slidingDoor"
                label={t('equipment.comfort.slidingDoor')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.electricSideMirrors"
                label={t('equipment.comfort.electricSideMirrors')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.headUpDisplay"
                label={t('equipment.comfort.headUpDisplay')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.leatherSteeringWheel"
                label={t('equipment.comfort.leatherSteeringWheel')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.powerSteering"
                label={t('equipment.comfort.powerSteering')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.lightSensor"
                label={t('equipment.comfort.lightSensor')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.parkingHeater"
                label={t('equipment.comfort.parkingHeater')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.airSuspension"
                label={t('equipment.comfort.airSuspension')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.comfort.startStopSystem"
                label={t('equipment.comfort.startStopSystem')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.lighting.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.lighting.biXenonHeadlights"
                label={t('equipment.lighting.biXenonHeadlights')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.lightSensor"
                label={t('equipment.lighting.lightSensor')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.glareFreeHighBeam"
                label={t('equipment.lighting.glareFreeHighBeam')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.fogLights"
                label={t('equipment.lighting.fogLights')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.corneringLights"
                label={t('equipment.lighting.corneringLights')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.daytimeRunningLights"
                label={t('equipment.lighting.daytimeRunningLights')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.ledHeadlights"
                label={t('equipment.lighting.ledHeadlights')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.fullLedHeadlights"
                label={t('equipment.lighting.fullLedHeadlights')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.ledDaytimeRunningLights"
                label={t('equipment.lighting.ledDaytimeRunningLights')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.xenonHeadlights"
                label={t('equipment.lighting.xenonHeadlights')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.lighting.laserLights"
                label={t('equipment.lighting.laserLights')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.safety.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.safety.abs"
                label={t('equipment.safety.abs')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.safety.emergencyCallSystem"
                label={t('equipment.safety.emergencyCallSystem')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.safety.alarmSystem"
                label={t('equipment.safety.alarmSystem')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.safety.tirePressureMonitoring"
                label={t('equipment.safety.tirePressureMonitoring')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.safety.esp"
                label={t('equipment.safety.esp')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.safety.tractionControl"
                label={t('equipment.safety.tractionControl')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.safety.isofix"
                label={t('equipment.safety.isofix')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.safety.immobilizer"
                label={t('equipment.safety.immobilizer')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.safety.fatigueWarningSystem"
                label={t('equipment.safety.fatigueWarningSystem')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.seats.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.seats.electricSeats"
                label={t('equipment.seats.electricSeats')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.seats.heatedSeats"
                label={t('equipment.seats.heatedSeats')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.seats.lumbarSupport"
                label={t('equipment.seats.lumbarSupport')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.seats.sportSeats"
                label={t('equipment.seats.sportSeats')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.seats.massageSeats"
                label={t('equipment.seats.massageSeats')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.seats.foldablePassengerSeat"
                label={t('equipment.seats.foldablePassengerSeat')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.seats.ventilatedSeats"
                label={t('equipment.seats.ventilatedSeats')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.seats.splitRearSeat"
                label={t('equipment.seats.splitRearSeat')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.cruiseControl.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.cruiseControl.adaptiveCruiseControl"
                label={t('equipment.cruiseControl.adaptiveCruiseControl')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.cruiseControl.cruiseControl"
                label={t('equipment.cruiseControl.cruiseControl')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.entertainment.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.entertainment.androidAuto"
                label={t('equipment.entertainment.androidAuto')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.voiceControl"
                label={t('equipment.entertainment.voiceControl')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.appleCarPlay"
                label={t('equipment.entertainment.appleCarPlay')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.tv"
                label={t('equipment.entertainment.tv')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.dabRadio"
                label={t('equipment.entertainment.dabRadio')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.touchscreen"
                label={t('equipment.entertainment.touchscreen')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.wirelessCharging"
                label={t('equipment.entertainment.wirelessCharging')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.usb"
                label={t('equipment.entertainment.usb')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.integratedMusicStreaming"
                label={t('equipment.entertainment.integratedMusicStreaming')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.digitalInstrumentCluster"
                label={t('equipment.entertainment.digitalInstrumentCluster')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.soundSystem"
                label={t('equipment.entertainment.soundSystem')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.entertainment.wifiHotspot"
                label={t('equipment.entertainment.wifiHotspot')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.media.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.media.bluetooth"
                label={t('equipment.media.bluetooth')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.media.mp3"
                label={t('equipment.media.mp3')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.media.onboardComputer"
                label={t('equipment.media.onboardComputer')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.media.multifunctionSteeringWheel"
                label={t('equipment.media.multifunctionSteeringWheel')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.media.cd"
                label={t('equipment.media.cd')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.media.navigationSystem"
                label={t('equipment.media.navigationSystem')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.media.handsFreeSystem"
                label={t('equipment.media.handsFreeSystem')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.media.radio"
                label={t('equipment.media.radio')}
                control={control}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <div>{t('equipment.centralLocking.legend')}</div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(20ch,100%),1fr))] gap-2">
              <CheckboxContainer
                name="equipment.centralLocking.keylessCentralLocking"
                label={t('equipment.centralLocking.keylessCentralLocking')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.centralLocking.remoteCentralLocking"
                label={t('equipment.centralLocking.remoteCentralLocking')}
                control={control}
              />
              <CheckboxContainer
                name="equipment.centralLocking.centralLocking"
                label={t('equipment.centralLocking.centralLocking')}
                control={control}
              />
            </div>
          </div>
        </Fieldset>

        <Fieldset legend={t('motor.legend')} id="motor">
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
          <div className="inputs-wrapper">
            <NumericInputContainer
              label={t('motor.powerKW')}
              control={control}
              name="motor.powerKW"
            />
            <NumericInputContainer
              label={t('motor.powerHP')}
              control={control}
              name="motor.powerHP"
            />
          </div>
          <NumericInputContainer label={t('motor.gears')} control={control} name="motor.gears" />
          <NumericInputContainer
            label={t('motor.cylinders')}
            control={control}
            name="motor.cylinders"
          />
          <div className="inputs-wrapper">
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
          </div>
        </Fieldset>

        <Fieldset legend={t('fuel.legend')} id="fuel">
          <SelectContainer
            name="fuel.fuelType"
            label={t('fuel.fuelType')}
            options={fuelTypeOptions}
            control={control}
          />
          <RadioContainer
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
          <CheckboxContainer
            name="fuel.sootParticles"
            label={t('fuel.sootParticles')}
            control={control}
          />
          {isWltpCo2EmissionsCombinedVisible ? (
            <>
              <NumericInputContainer
                key="wltpConsumptionCombined"
                label={t('fuel.wltpConsumptionCombined')}
                control={control}
                name="fuel.wltpConsumptionCombined"
              />
              <NumericInputContainer
                key="wltpCo2EmissionsCombined"
                label={t('fuel.wltpCo2EmissionsCombined')}
                control={control}
                name="fuel.wltpCo2EmissionsCombined"
              />
            </>
          ) : (
            <>
              <NumericInputContainer
                key="consumptionCombined"
                label={t('fuel.consumptionCombined')}
                control={control}
                name="fuel.consumptionCombined"
              />
              <NumericInputContainer
                key="co2EmissionsCombined"
                label={t('fuel.co2EmissionsCombined')}
                control={control}
                name="fuel.co2EmissionsCombined"
              />
            </>
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
          <RadioContainer
            name="fuel.emissionSticker"
            label={t('fuel.emissionSticker')}
            options={[
              { value: '1', label: t('fuel.emissionStickerOptions.none') },
              { value: '2', label: t('fuel.emissionStickerOptions.green') },
              { value: '3', label: t('fuel.emissionStickerOptions.yellow') },
              { value: '4', label: t('fuel.emissionStickerOptions.red') },
            ]}
            control={control}
          />
        </Fieldset>

        <Fieldset legend={t('price.legend')} id="price">
          <NumericInputContainer label={t('price.amount')} control={control} name="price.amount" />
          <CheckboxContainer
            name="price.negotiable"
            label={t('price.negotiable')}
            control={control}
          />
          <CheckboxContainer
            name="price.taxDeductible"
            label={t('price.taxDeductible')}
            control={control}
          />
        </Fieldset>

        <Fieldset legend={t('contactInformation.legend')} id="contactInformation">
          <div className="grid grid-cols-3 gap-2">
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
          </div>
          <div className="grid grid-cols-3 gap-2">
            <SelectContainer
              label={t('contactInformation.phoneCountryCode')}
              name="contactInformation.phoneCountryCode"
              options={phoneCountryCodes}
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
          </div>
          <div className="grid gap-1">
            <div>{t('contactInformation.hidePhoneNumber')}</div>
            <CheckboxContainer
              name="contactInformation.hidePhoneNumber"
              label={t('yes')}
              control={control}
            />
          </div>
        </Fieldset>

        <Fieldset legend={t('financingOffer.legend')} id="financingOffer">
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
          <CheckboxContainer
            name="financingOffer.taxDeductible"
            label={t('financingOffer.taxDeductible')}
            control={control}
          />
          <CheckboxContainer
            name="financingOffer.negotiable"
            label={t('financingOffer.negotiable')}
            control={control}
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

        <ActionBar.Root open>
          <Portal>
            <ActionBar.Positioner className="z-10">
              <ActionBar.Content>
                <Button
                  variant="outline"
                  justifySelf="center"
                  type="button"
                  size="lg"
                  position="sticky"
                  bottom="4"
                  px="10"
                  onClick={() => reset()}
                >
                  {t('reset')}
                </Button>
                <Button
                  form="complex-form"
                  justifySelf="center"
                  type="submit"
                  size="lg"
                  position="sticky"
                  bottom="4"
                  px="10"
                >
                  {t('submit')}
                </Button>
              </ActionBar.Content>
            </ActionBar.Positioner>
          </Portal>
        </ActionBar.Root>
      </Form>
    </FormProvider>
  );
};

export { ComplexForm };
