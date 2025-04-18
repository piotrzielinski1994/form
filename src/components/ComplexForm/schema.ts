import { z } from 'zod';

type FormFields = z.infer<typeof schema>;
type PartialFormFields = z.input<typeof schema>;

const isNotUrl = (val: string | null) => !z.string().url().safeParse(val).success;
const isNotEmail = (val: string | null) => !z.string().email().safeParse(val).success;
const hasNoXml = (value: string | null) => value === null || !/[<>()]/.test(value);

const schema = z.object({
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
    postalCode: z.string().trim(),
    city: z.string().trim(),
    phoneCountryCode: z.string().trim(),
    phoneAreaCode: z.string().trim(),
    phoneSubscriberNumber: z.string().trim(),
    hidePhoneNumber: z.boolean(),
  }),
  financingOffer: z.object({
    price: z.number(),
    netPrice: z.number(),
    taxDeductible: z.boolean(),
    negotiable: z.boolean(),
    vatRate: z.number(),
    duration: z.number(),
    monthlyRate: z.number(),
    annualPercentageRate: z.number(),
    initialPayment: z.number(),
    endingRate: z.number(),
  }),
});

export { schema, type FormFields, type PartialFormFields };
