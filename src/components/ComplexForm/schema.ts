import { z } from 'zod';

type FormFields = z.infer<typeof schema>;

const schema = z.object({
  vehicleData: z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    modelVersion: z.string().min(1),
  }),
  characteristics: z.object({
    bodyType: z.string().optional(),
    seats: z.number().int().optional(),
    doors: z.number().int().optional(),
    color: z.string().optional(),
    metallic: z.boolean().optional(),
    upholstery: z.string().optional(),
    interiorColor: z.string().optional(),
  }),
  condition: z.object({
    vehicleOfferType: z.string().optional(),
    mileage: z.number().int().optional(),
    firstRegistration: z.string().optional(),
    owners: z.number().int().optional(),
    deliveryDay: z.string().optional(),
    deliveryDate: z.string().optional(),
    fullServiceHistory: z.boolean().optional(),
    nonSmoking: z.boolean().optional(),
    nextInspection: z.string().optional(),
    lastTechnicalService: z.string().optional(),
    lastCamBeltService: z.string().optional(),
    damagedVehicle: z.boolean().optional(),
    accidentVehicle: z.boolean().optional(),
    roadWorthiness: z.boolean().optional(),
  }),
  motor: z.object({
    driveType: z.string().optional(),
    transmission: z.string().optional(),
    powerKW: z.number().int().optional(),
    powerHP: z.number().int().optional(),
    gears: z.number().int().optional(),
    cylinders: z.number().int().optional(),
    engineCapacity: z.number().optional(),
    emptyWeight: z.number().optional(),
  }),
  fuel: z.object({
    fuelType: z.string().min(1),
    consumptionCombined: z.number().optional(),
    co2Emissions: z.number().optional(),
    efficiencyClass: z.string().optional(),
    pollutionClass: z.string().optional(),
    emissionSticker: z.string().optional(),
  }),
  price: z.object({
    amount: z.number().min(1),
    negotiable: z.boolean().optional(),
    taxDeductible: z.boolean().optional(),
  }),
  contactInformation: z.object({
    postalCode: z.string().min(1),
    city: z.string().min(1),
    phoneCountryCode: z.string().optional(),
    phoneAreaCode: z.string().optional(),
    phoneNumber: z.string().optional(),
    hidePhoneNumber: z.boolean().optional(),
  }),
  photos: z.object({
    images: z.array(z.string()).optional(),
  }),
  description: z.object({
    text: z.string().optional(),
  }),
});

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
    firstRegistration: '',
    owners: undefined,
    deliveryDay: '',
    deliveryDate: '',
    fullServiceHistory: false,
    nonSmoking: false,
    nextInspection: '',
    lastTechnicalService: '',
    lastCamBeltService: '',
    damagedVehicle: false,
    accidentVehicle: false,
    roadWorthiness: false,
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
    consumptionCombined: undefined,
    co2Emissions: undefined,
    efficiencyClass: '',
    pollutionClass: '',
    emissionSticker: '',
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
    phoneNumber: '',
    hidePhoneNumber: false,
  },
  photos: {
    images: [],
  },
  description: {
    text: '',
  },
};

export { defaultValues, schema, type FormFields };
