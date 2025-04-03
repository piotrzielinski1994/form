import { FormFields } from './schema';

const defaultValues: FormFields = {
  vehicleData: {
    make: '',
    model: '',
    modelVersion: '',
  },
  characteristics: {
    bodyType: '',
    seats: undefined,
    doors: undefined,
    color: '',
    metallic: false,
    upholstery: '',
    interiorColor: '',
  },
  condition: {
    vehicleOfferType: '',
    mileage: undefined,
    firstRegistrationMonth: '',
    firstRegistrationYear: '',
    owners: undefined,
    deliveryDay: '',
    deliveryDate: '',
    fullServiceHistory: false,
    nonSmoking: false,
    nextInspectionMonth: '',
    nextInspectionYear: '',
    lastTechnicalServiceMonth: '',
    lastTechnicalServiceYear: '',
    lastCamBeltServiceMonth: '',
    lastCamBeltServiceYear: '',
    damagedVehicle: false,
    accidentVehicle: false,
    roadWorthiness: false,
  },
  equipment: {
    airbags: {
      rearAirbag: false,
      passengerAirbag: false,
      driverAirbag: false,
      headAirbag: false,
      sideAirbag: false,
    },
    assistanceSystems: {
      distanceWarning: false,
      emergencyBrakeAssist: false,
      hillStartAssist: false,
      laneKeepingAssist: false,
      blindSpotAssist: false,
      highBeamAssist: false,
      trafficSignRecognition: false,
      nightVisionAssist: false,
    },
    parkingAssist: {
      camera360: false,
      frontSensors: false,
      rearSensors: false,
      selfSteeringSystem: false,
      parkingCamera: false,
    },
    extras: {
      allWeatherTires: false,
      punctureKit: false,
      alloyWheels: false,
      smokerPackage: false,
      ambientLighting: false,
      towBar: false,
      rangeExtender: false,
      batteryCertificate: false,
      spareWheel: false,
      wheelchairAccessible: false,
      headlightCleaning: false,
      bidirectionalCharging: false,
      rearSeatHeating: false,
    },
    climateControl: {
      twoZoneClimateControl: false,
      airConditioning: false,
      threeZoneClimateControl: false,
      automaticClimateControl: false,
      fourZoneClimateControl: false,
    },
    comfort: {
      armrest: false,
      panoramicRoof: false,
      heatedWindshield: false,
      rainSensor: false,
      heatedSteeringWheel: false,
      paddleShifters: false,
      electricWindows: false,
      sunroof: false,
      electricTailgate: false,
      slidingDoor: false,
      electricSideMirrors: false,
      headUpDisplay: false,
      leatherSteeringWheel: false,
      powerSteering: false,
      lightSensor: false,
      parkingHeater: false,
      airSuspension: false,
      startStopSystem: false,
    },
    lighting: {
      biXenonHeadlights: false,
      lightSensor: false,
      glareFreeHighBeam: false,
      fogLights: false,
      corneringLights: false,
      daytimeRunningLights: false,
      ledHeadlights: false,
      fullLedHeadlights: false,
      ledDaytimeRunningLights: false,
      xenonHeadlights: false,
      laserLights: false,
    },
    safety: {
      abs: false,
      emergencyCallSystem: false,
      alarmSystem: false,
      tirePressureMonitoring: false,
      esp: false,
      tractionControl: false,
      isofix: false,
      immobilizer: false,
      fatigueWarningSystem: false,
    },
    seats: {
      electricSeats: false,
      heatedSeats: false,
      lumbarSupport: false,
      sportSeats: false,
      massageSeats: false,
      foldablePassengerSeat: false,
      ventilatedSeats: false,
      splitRearSeat: false,
    },
    cruiseControl: {
      adaptiveCruiseControl: false,
      cruiseControl: false,
    },
    entertainment: {
      androidAuto: false,
      voiceControl: false,
      appleCarPlay: false,
      tv: false,
      dabRadio: false,
      touchscreen: false,
      wirelessCharging: false,
      usb: false,
      integratedMusicStreaming: false,
      digitalInstrumentCluster: false,
      soundSystem: false,
      wifiHotspot: false,
    },
    media: {
      bluetooth: false,
      mp3: false,
      onboardComputer: false,
      multifunctionSteeringWheel: false,
      cd: false,
      navigationSystem: false,
      handsFreeSystem: false,
      radio: false,
    },
    centralLocking: {
      keylessCentralLocking: false,
      remoteCentralLocking: false,
      centralLocking: false,
    },
  },
  motor: {
    driveType: '',
    transmission: '',
    powerKW: undefined,
    powerHP: undefined,
    gears: undefined,
    cylinders: undefined,
    engineCapacity: undefined,
    emptyWeight: undefined,
  },
  fuel: {
    fuelType: '',
    primaryFuelType: '',
    consumptionCombined: undefined,
    wltpConsumptionCombined: undefined,
    co2Emissions: undefined,
    wltpCo2EmissionsCombined: undefined,
    efficiencyClass: '',
    wltpCo2Class: '',
    pollutionClass: '',
    emissionSticker: '',
    sootParticles: false,
  },
  price: {
    amount: 1,
    negotiable: false,
    taxDeductible: false,
  },
  contactInformation: {
    postalCode: '',
    city: '',
    phoneCountryCode: '',
    phoneAreaCode: '',
    phoneSubscriberNumber: '',
    hidePhoneNumber: false,
  },
  photos: {
    images: [],
  },
  description: {
    text: '',
  },
  financingOffer: {
    price: undefined,
    netPrice: undefined,
    taxDeductible: false,
    negotiable: false,
    vatRate: undefined,
    duration: undefined,
    monthlyRate: undefined,
    annualPercentageRate: undefined,
    initialPayment: undefined,
    endingRate: undefined,
  },
};

export { defaultValues };
