import { UseFormProps } from 'react-hook-form';
import { FormFields } from './schema';

const defaultValues: UseFormProps<FormFields>['defaultValues'] = {
  vehicleData: {
    make: undefined,
    model: undefined,
    modelVersion: undefined,
    modelName: undefined,
    hsn: undefined,
    tsn: undefined,
    licencePlateNumber: null,
    vin: undefined,
    carpassMileageUrl: undefined,
    offerReference: undefined,
    natCode: undefined,
  },
  characteristics: {
    bodyType: undefined,
    seats: undefined,
    doors: undefined,
    color: undefined,
    metallic: false,
    upholstery: undefined,
    interiorColor: undefined,
  },
  condition: {
    vehicleOfferType: undefined,
    mileage: undefined,
    firstRegistrationMonth: undefined,
    firstRegistrationYear: undefined,
    owners: undefined,
    fullServiceHistory: false,
    nonSmoking: false,
    nextInspectionMonth: undefined,
    nextInspectionYear: undefined,
    lastTechnicalServiceMonth: undefined,
    lastTechnicalServiceYear: undefined,
    lastCamBeltServiceMonth: undefined,
    lastCamBeltServiceYear: undefined,
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
    driveType: undefined,
    transmission: undefined,
    powerKW: undefined,
    powerHP: undefined,
    gears: undefined,
    cylinders: undefined,
    engineCapacity: undefined,
    emptyWeight: undefined,
  },
  fuel: {
    fuelCategory: undefined,
    primaryFuelType: undefined,
    environmentalProtocol: undefined,
    consumptionCombined: undefined,
    co2EmissionsCombined: undefined,
    wltpCo2Class: undefined,
    pollutionClass: undefined,
    emissionSticker: undefined,
    sootParticles: false,
  },
  price: {
    amount: undefined,
    negotiable: false,
    taxDeductible: false,
  },
  contactInformation: {
    postalCode: undefined,
    city: undefined,
    phoneCountryCode: undefined,
    phoneAreaCode: undefined,
    phoneSubscriberNumber: undefined,
    hidePhoneNumber: false,
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
