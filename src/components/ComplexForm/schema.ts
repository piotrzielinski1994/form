import { VehicleConfig } from '@/providers/VehicleConfigProvider';
import { z } from 'zod';

type FormFields = z.infer<ReturnType<typeof genSchema>>;
type PartialFormFields = z.input<ReturnType<typeof genSchema>>;

const isNumeric = (val: string | null) => /(^\d+$|^$)/.test(val ?? '');
const isNotUrl = (val: string | null) => !z.string().url().safeParse(val).success;
const isNotEmail = (val: string | null) => !z.string().email().safeParse(val).success;
const hasNoXml = (value: string | null) => value === null || !/[<>()]/.test(value);

const genSchema = ({ culture, vehicleType, userType }: VehicleConfig) => {
  const isFieldVisible = {
    model: !['N', 'X', 'L'].includes(vehicleType),
    modelName: ['N', 'X', 'L'].includes(vehicleType) || userType === 'D',
    hsn:
      (vehicleType === 'C' && userType === 'D' && culture === 'de-DE') ||
      (vehicleType !== 'C' && vehicleType !== 'B' && vehicleType !== 'DSC' && culture === 'de-DE'),
    tsn: vehicleType !== 'B' && vehicleType !== 'DSC' && culture === 'de-DE',
    licencePlateNumber: culture === 'nl-NL',
    offerReference: userType === 'D',
    vin: userType === 'D' || vehicleType === 'DSC',
    carpassMileageUrl:
      ['fr-BE', 'nl-BE'].includes(culture) &&
      userType === 'D' &&
      !['N', 'X', 'L'].includes(vehicleType),
    bodyColor: !['L'].includes(vehicleType),
    bodyColorName:
      ['N', 'X', 'L'].includes(vehicleType) ||
      (['C', 'B'].includes(vehicleType) && userType === 'D'),
    upholstery: ['C', 'B'].includes(vehicleType),
    interiorColor: ['C', 'B', 'N'].includes(vehicleType),
    payload: ['N', 'X', 'L'].includes(vehicleType),
    grossVehicleWeight: ['N', 'X', 'L'].includes(vehicleType),
    productionYear: !['B', 'C'].includes(vehicleType),
    axleCount: ['N', 'X', 'L'].includes(vehicleType),
    wheelbase: ['N', 'X', 'L'].includes(vehicleType),
    maximumTowingWeight: ['C', 'X', 'L'].includes(vehicleType),
    hasCarRegistration: ['C', 'B'].includes(vehicleType),
    loadDimensions: ['N', 'X', 'L'].includes(vehicleType),
    totalDimensions: ['N', 'X', 'L'].includes(vehicleType),
    bedCount: vehicleType === 'N',
  };

  return z.object({
    vehicleData: z.object({
      make: z.string().min(1),
      model: isFieldVisible.model ? z.string().min(1) : z.string().optional(),
      modelVersion: z.string().max(50).refine(hasNoXml).refine(isNotEmail).refine(isNotUrl),
      modelName: isFieldVisible.modelName ? z.string().min(1).max(50) : z.string().optional(),
      hsn: isFieldVisible.hsn
        ? z
            .string()
            .regex(/^[0-9]{4}$/)
            .or(z.literal(''))
        : z.string().optional(),
      tsn: isFieldVisible.tsn
        ? z
            .string()
            .regex(/^[a-zA-Z0-9]{3}$/)
            .or(z.literal(''))
        : z.string().optional(),
      licencePlateNumber: isFieldVisible.licencePlateNumber
        ? z.string().max(8).nullable().refine(hasNoXml).refine(isNotEmail).refine(isNotUrl)
        : z.string().nullable().optional(),
      vin: isFieldVisible.vin
        ? z
            .string()
            .regex(/^[A-HJ-NPR-Z0-9]{17}$/)
            .or(z.literal(''))
        : z.string().optional(),
      carpassMileageUrl: isFieldVisible.carpassMileageUrl
        ? z.string().url().max(1000).or(z.literal(''))
        : z.string().optional(),
      offerReference: isFieldVisible.offerReference
        ? z.string().max(50).refine(hasNoXml).refine(isNotEmail).refine(isNotUrl)
        : z.string().optional(),
    }),
    description: z.object({
      description: z.string().max(10_000),
    }),
    characteristics: z.object({
      bodyType: z.string().trim().min(1),
      seats: z.number().int().min(1).max(99).optional(),
      doors: z.number().int().min(1).max(9).optional(),
      bodyColor: isFieldVisible.bodyColor ? z.string().trim().optional() : z.string().optional(),
      bodyColorName: isFieldVisible.bodyColorName
        ? z.string().trim().max(30).optional()
        : z.string().optional(),
      metallic: z.boolean().optional(),
      upholstery: isFieldVisible.upholstery ? z.string().trim().optional() : z.string().optional(),
      interiorColor: isFieldVisible.interiorColor
        ? z.string().trim().optional()
        : z.string().optional(),
      payload: isFieldVisible.payload
        ? z.number().int().min(0).max(9999999).optional()
        : z.number().optional(),
      grossVehicleWeight: isFieldVisible.grossVehicleWeight
        ? z.number().int().min(1).max(9999999).optional()
        : z.number().optional(),
      productionYear: isFieldVisible.productionYear
        ? z.string().trim().optional()
        : z.string().optional(),
      axleCount: isFieldVisible.axleCount
        ? z.number().int().min(1).max(99).optional()
        : z.number().optional(),
      wheelbase: isFieldVisible.wheelbase
        ? z.number().int().min(1).max(9999999).optional()
        : z.number().optional(),
      maximumTowingWeight: isFieldVisible.maximumTowingWeight
        ? z.number().int().min(1).max(9999999).optional()
        : z.number().optional(),
      hasCarRegistration: isFieldVisible.hasCarRegistration
        ? z.boolean().optional()
        : z.boolean().optional(),
      loadHeight: isFieldVisible.loadDimensions
        ? z.number().min(0).max(9999999.99).optional()
        : z.number().optional(),
      loadVolume: isFieldVisible.loadDimensions
        ? z.number().min(0).max(9999999.99).optional()
        : z.number().optional(),
      loadWidth: isFieldVisible.loadDimensions
        ? z.number().min(0).max(9999999.99).optional()
        : z.number().optional(),
      loadLength: isFieldVisible.loadDimensions
        ? z.number().min(0).max(9999999.99).optional()
        : z.number().optional(),
      totalHeight: isFieldVisible.totalDimensions
        ? z.number().int().min(1).max(9999999).optional()
        : z.number().optional(),
      totalWidth: isFieldVisible.totalDimensions
        ? z.number().int().min(1).max(9999999).optional()
        : z.number().optional(),
      totalLength: isFieldVisible.totalDimensions
        ? z.number().int().min(1).max(9999999).optional()
        : z.number().optional(),
      bedCount: isFieldVisible.bedCount
        ? z.number().int().min(0).max(9).optional()
        : z.number().optional(),
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
    contactInformation: z.object({
      postalCode: (() => {
        switch (culture) {
          case 'nl-NL':
            return z
              .string()
              .trim()
              .max(6)
              .refine((val) => /^\d{4}( ?[a-zA-Z]{2})$/.test(val));
          case 'de-DE':
          case 'de-AT':
          case 'fr-FR':
          case 'it-IT':
          case 'es-ES':
            return z
              .string()
              .trim()
              .max(5)
              .refine((val) => /^\d{5}$/.test(val));
          case 'fr-BE':
          case 'nl-BE':
            return z
              .string()
              .trim()
              .max(4)
              .refine((val) => /^\d{4}$/.test(val));
          default:
            return z
              .string()
              .trim()
              .max(6)
              .refine((val) => /^\d{4}( ?[a-zA-Z]{2})?$|^\d{5}$/.test(val));
        }
      })(),
      city: z.string().trim().max(30),
      phoneCountryCode: z.string().trim(),
      phoneAreaCode: (() => {
        switch (culture) {
          case 'de-DE':
            return z.string().trim().min(2).max(6).refine(isNumeric);
          case 'fr-FR':
            return z.string().trim().min(1).max(2).refine(isNumeric);
          case 'es-ES':
            return z.string().trim().min(1).max(2).refine(isNumeric);
          case 'nl-NL':
            return z
              .string()
              .trim()
              .min(1)
              .max(5)
              .refine((val) => val === '' || /^(0([1-7])|([1-9])\d)[\d]*$/.test(val));
          case 'fr-BE':
          case 'nl-BE':
            return z.string().trim().min(2).max(4).refine(isNumeric);
          case 'it-IT':
            return z.string().trim().min(2).max(4).refine(isNumeric);
          case 'fr-LU':
            return z.string().trim().min(4).max(4).refine(isNumeric);
          default:
            return z.string().trim().min(1).max(11).refine(isNumeric);
        }
      })(),
      phoneSubscriberNumber: (() => {
        switch (culture) {
          case 'fr-FR':
            return z.string().trim().min(8).max(8).refine(isNumeric);
          case 'es-ES':
            return z
              .string()
              .trim()
              .min(9)
              .max(9)
              .refine((val) => /^[5-9](\d+)*$/.test(val) || val === '');
          case 'nl-NL':
            return z
              .string()
              .trim()
              .min(6)
              .max(8)
              .refine((val) => /^[1-9]\d*$/.test(val) || val === '');
          case 'it-IT':
            return z.string().trim().min(4).max(8).refine(isNumeric);
          case 'fr-BE':
          case 'nl-BE':
            return z.string().trim().min(6).max(7).refine(isNumeric);
          case 'fr-LU':
            return z.string().trim().min(5).max(11).refine(isNumeric);
          default:
            return z.string().trim().min(3).max(12).refine(isNumeric);
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
