import { VehicleConfig } from '@/providers/VehicleConfigProvider';
import { z } from 'zod';

type FormFields = z.infer<ReturnType<typeof genSchema>>;
type PartialFormFields = z.input<ReturnType<typeof genSchema>>;

const isNumeric = (val: string | null) => /(^\d+$|^$)/.test(val ?? '');
const isNotUrl = (val: string | null) => !z.string().url().safeParse(val).success;
const isNotEmail = (val: string | null) => !z.string().email().safeParse(val).success;
const hasNoXml = (value: string | null) => value === null || !/[<>()]/.test(value);

const genSchema = ({ culture }: VehicleConfig) => {
  return z.object({
    vehicleData: z.object({
      make: z.string().min(1),
      model: z.string().min(1),
      modelVersion: z.string().max(50).refine(hasNoXml).refine(isNotEmail).refine(isNotUrl),
      modelName: z.string().min(1).max(50),
      hsn: z
        .string()
        .regex(/^[0-9]{4}$/)
        .or(z.literal('')),
      tsn: z
        .string()
        .regex(/^[a-zA-Z0-9]{3}$/)
        .or(z.literal('')),
      licencePlateNumber: z
        .string()
        .max(8)
        .nullable()
        .refine(hasNoXml)
        .refine(isNotEmail)
        .refine(isNotUrl),
      vin: z
        .string()
        .regex(/^[A-HJ-NPR-Z0-9]{17}$/)
        .or(z.literal('')),
      carpassMileageUrl: z.string().url().max(1000).or(z.literal('')),
      offerReference: z.string().max(50).refine(hasNoXml).refine(isNotEmail).refine(isNotUrl),
      natCode: z
        .string()
        .regex(/^[0-9]+$/)
        .or(z.literal('')),
    }),
    characteristics: z.object({
      bodyType: z.string().trim().min(1),
      seats: z.number().int(),
      doors: z.number().int(),
      color: z.string().trim(),
      metallic: z.boolean(),
      upholstery: z.string().trim(),
      interiorColor: z.string().trim(),
    }),
    condition: z.object({
      vehicleOfferType: z.string().trim(),
      mileage: z.number().int(),
      firstRegistrationMonth: z.string().trim(),
      firstRegistrationYear: z.string().trim(),
      owners: z.number().int(),
      fullServiceHistory: z.boolean(),
      nonSmoking: z.boolean(),
      nextInspectionMonth: z.string().trim(),
      nextInspectionYear: z.string().trim().min(1),
      lastTechnicalServiceMonth: z.string().trim(),
      lastTechnicalServiceYear: z.string().trim(),
      lastCamBeltServiceMonth: z.string().trim(),
      lastCamBeltServiceYear: z.string().trim(),
      damagedVehicle: z.boolean(),
      accidentVehicle: z.boolean(),
      roadWorthiness: z.boolean(),
    }),
    equipment: z.object({
      airbags: z.object({
        rearAirbag: z.boolean(),
        passengerAirbag: z.boolean(),
        driverAirbag: z.boolean(),
        headAirbag: z.boolean(),
        sideAirbag: z.boolean(),
      }),
      assistanceSystems: z.object({
        distanceWarning: z.boolean(),
        emergencyBrakeAssist: z.boolean(),
        hillStartAssist: z.boolean(),
        laneKeepingAssist: z.boolean(),
        blindSpotAssist: z.boolean(),
        highBeamAssist: z.boolean(),
        trafficSignRecognition: z.boolean(),
        nightVisionAssist: z.boolean(),
      }),
      parkingAssist: z.object({
        camera360: z.boolean(),
        frontSensors: z.boolean(),
        rearSensors: z.boolean(),
        selfSteeringSystem: z.boolean(),
        parkingCamera: z.boolean(),
      }),
      extras: z.object({
        allWeatherTires: z.boolean(),
        punctureKit: z.boolean(),
        alloyWheels: z.boolean(),
        smokerPackage: z.boolean(),
        ambientLighting: z.boolean(),
        towBar: z.boolean(),
        rangeExtender: z.boolean(),
        batteryCertificate: z.boolean(),
        spareWheel: z.boolean(),
        wheelchairAccessible: z.boolean(),
        headlightCleaning: z.boolean(),
        bidirectionalCharging: z.boolean(),
        rearSeatHeating: z.boolean(),
      }),
      climateControl: z.object({
        twoZoneClimateControl: z.boolean(),
        airConditioning: z.boolean(),
        threeZoneClimateControl: z.boolean(),
        automaticClimateControl: z.boolean(),
        fourZoneClimateControl: z.boolean(),
      }),
      comfort: z.object({
        armrest: z.boolean(),
        panoramicRoof: z.boolean(),
        heatedWindshield: z.boolean(),
        rainSensor: z.boolean(),
        heatedSteeringWheel: z.boolean(),
        paddleShifters: z.boolean(),
        electricWindows: z.boolean(),
        sunroof: z.boolean(),
        electricTailgate: z.boolean(),
        slidingDoor: z.boolean(),
        electricSideMirrors: z.boolean(),
        headUpDisplay: z.boolean(),
        leatherSteeringWheel: z.boolean(),
        powerSteering: z.boolean(),
        lightSensor: z.boolean(),
        parkingHeater: z.boolean(),
        airSuspension: z.boolean(),
        startStopSystem: z.boolean(),
      }),
      lighting: z.object({
        biXenonHeadlights: z.boolean(),
        lightSensor: z.boolean(),
        glareFreeHighBeam: z.boolean(),
        fogLights: z.boolean(),
        corneringLights: z.boolean(),
        daytimeRunningLights: z.boolean(),
        ledHeadlights: z.boolean(),
        fullLedHeadlights: z.boolean(),
        ledDaytimeRunningLights: z.boolean(),
        xenonHeadlights: z.boolean(),
        laserLights: z.boolean(),
      }),
      safety: z.object({
        abs: z.boolean(),
        emergencyCallSystem: z.boolean(),
        alarmSystem: z.boolean(),
        tirePressureMonitoring: z.boolean(),
        esp: z.boolean(),
        tractionControl: z.boolean(),
        isofix: z.boolean(),
        immobilizer: z.boolean(),
        fatigueWarningSystem: z.boolean(),
      }),
      seats: z.object({
        electricSeats: z.boolean(),
        heatedSeats: z.boolean(),
        lumbarSupport: z.boolean(),
        sportSeats: z.boolean(),
        massageSeats: z.boolean(),
        foldablePassengerSeat: z.boolean(),
        ventilatedSeats: z.boolean(),
        splitRearSeat: z.boolean(),
      }),
      cruiseControl: z.object({
        adaptiveCruiseControl: z.boolean(),
        cruiseControl: z.boolean(),
      }),
      entertainment: z.object({
        androidAuto: z.boolean(),
        voiceControl: z.boolean(),
        appleCarPlay: z.boolean(),
        tv: z.boolean(),
        dabRadio: z.boolean(),
        touchscreen: z.boolean(),
        wirelessCharging: z.boolean(),
        usb: z.boolean(),
        integratedMusicStreaming: z.boolean(),
        digitalInstrumentCluster: z.boolean(),
        soundSystem: z.boolean(),
        wifiHotspot: z.boolean(),
      }),
      media: z.object({
        bluetooth: z.boolean(),
        mp3: z.boolean(),
        onboardComputer: z.boolean(),
        multifunctionSteeringWheel: z.boolean(),
        cd: z.boolean(),
        navigationSystem: z.boolean(),
        handsFreeSystem: z.boolean(),
        radio: z.boolean(),
      }),
      centralLocking: z.object({
        keylessCentralLocking: z.boolean(),
        remoteCentralLocking: z.boolean(),
        centralLocking: z.boolean(),
      }),
    }),
    motor: z.object({
      driveType: z.string().trim(),
      transmission: z.string().trim(),
      powerKW: z.number().int(),
      powerHP: z.number().int(),
      gears: z.number().int(),
      cylinders: z.number().int(),
      engineCapacity: z.number(),
      emptyWeight: z.number(),
    }),
    fuel: z
      .object({
        fuelCategory: z.string().trim(),
        primaryFuelType: z.string().trim(),
        wltpCo2Class: z.string().trim(),
        pollutionClass: z.string().trim(),
        emissionSticker: z.string().trim(),
        sootParticles: z.boolean(),
      })
      .and(
        z.discriminatedUnion('environmentalProtocol', [
          z.object({
            environmentalProtocol: z.literal('wltp'),
            wltpConsumptionCombined: z.number().min(10).max(100),
            wltpCo2EmissionsCombined: z.number(),
          }),
          z.object({
            environmentalProtocol: z.literal('nedc'),
            consumptionCombined: z.number().min(1).max(10),
            co2EmissionsCombined: z.number(),
          }),
        ])
      ),
    price: z.object({
      amount: z.number(),
      negotiable: z.boolean(),
      taxDeductible: z.literal<boolean>(true),
    }),
    contactInformation: z.object({
      postalCode: (() => {
        switch (culture) {
          case 'nl-NL':
            return z
              .string()
              .trim()
              .max(6)
              .refine((val) => /^\d{4}( ?[a-zA-Z]{2})$/.test(val), {
                message: 'Dutch postal code requires 4 digits and 2 letters',
              });
          case 'de-DE':
          case 'de-AT':
          case 'fr-FR':
          case 'it-IT':
          case 'es-ES':
            return z
              .string()
              .trim()
              .max(5)
              .refine((val) => /^\d{5}$/.test(val), { message: 'Postal code requires 5 digits' });
          case 'fr-BE':
          case 'nl-BE':
            return z
              .string()
              .trim()
              .max(4)
              .refine((val) => /^\d{4}$/.test(val), {
                message: 'Belgian postal code requires 4 digits',
              });
          default:
            return z
              .string()
              .trim()
              .max(6)
              .refine((val) => /^\d{4}( ?[a-zA-Z]{2})?$|^\d{5}$/.test(val), {
                message: 'Invalid postal code format',
              });
        }
      })(),
      city: z.string().trim().max(30),
      phoneCountryCode: z.string().trim(),
      phoneAreaCode: (() => {
        switch (culture) {
          case 'de-DE':
            return z.string().trim().min(2).max(6).refine(isNumeric, {
              message: 'Area code can only contain digits',
            });
          case 'fr-FR':
            return z.string().trim().min(1).max(2).refine(isNumeric, {
              message: 'Area code can only contain digits',
            });
          case 'es-ES':
            return z.string().trim().min(1).max(2).refine(isNumeric, {
              message: 'Area code can only contain digits',
            });
          case 'nl-NL':
            return z
              .string()
              .trim()
              .min(1)
              .max(5)
              .refine((val) => /^(0([1-7])|([1-9])\d)[\d]*$/.test(val) || val === '', {
                message: 'Invalid Dutch area code format',
              });
          case 'fr-BE':
          case 'nl-BE':
            return z.string().trim().min(2).max(4).refine(isNumeric, {
              message: 'Area code can only contain digits',
            });
          case 'it-IT':
            return z.string().trim().min(2).max(4).refine(isNumeric, {
              message: 'Area code can only contain digits',
            });
          case 'fr-LU':
            return z.string().trim().min(4).max(4).refine(isNumeric, {
              message: 'Area code can only contain digits',
            });
          default:
            return z.string().trim().min(1).max(11).refine(isNumeric, {
              message: 'Area code can only contain digits',
            });
        }
      })(),
      phoneSubscriberNumber: (() => {
        switch (culture) {
          case 'fr-FR':
            return z.string().trim().min(8).max(8).refine(isNumeric, {
              message: 'Phone number can only contain digits',
            });
          case 'es-ES':
            return z
              .string()
              .trim()
              .min(9)
              .max(9)
              .refine((val) => /^[5-9](\d+)*$/.test(val) || val === '', {
                message: 'Spanish phone number must start with 5-9',
              });
          case 'nl-NL':
            return z
              .string()
              .trim()
              .min(6)
              .max(8)
              .refine((val) => /^[1-9]\d*$/.test(val) || val === '', {
                message: 'Dutch phone number must start with 1-9',
              });
          case 'it-IT':
            return z.string().trim().min(4).max(8).refine(isNumeric, {
              message: 'Phone number can only contain digits',
            });
          case 'fr-BE':
          case 'nl-BE':
            return z.string().trim().min(6).max(7).refine(isNumeric, {
              message: 'Phone number can only contain digits',
            });
          case 'fr-LU':
            return z.string().trim().min(5).max(11).refine(isNumeric, {
              message: 'Phone number can only contain digits',
            });
          default:
            return z.string().trim().min(3).max(12).refine(isNumeric, {
              message: 'Phone number can only contain digits',
            });
        }
      })(),
      hidePhoneNumber: z.boolean(),
    }),
    financingOffer: z.object({
      price: z.number().positive().max(10_000_000),
      netPrice: z.number().positive().max(10_000_000).optional(),
      taxDeductible: z.boolean().optional(),
      negotiable: z.boolean().optional(),
      vatRate: z.number().min(0).max(100).optional(),
      duration: z.number().int().positive().max(120),
      monthlyRate: z.number().nonnegative().max(100_000),
      annualPercentageRate: z.number().min(0).max(100),
      initialPayment: z.number().nonnegative().max(10_000_000),
      endingRate: z.number().nonnegative().max(10_000_000),
      closingCosts: z.number().nonnegative().max(100_000).optional(),
    }),
  });
};

export { genSchema, type FormFields, type PartialFormFields };
