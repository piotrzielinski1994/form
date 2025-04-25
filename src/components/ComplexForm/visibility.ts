import { useVehicleConfig } from '@/providers/VehicleConfigProvider';
import { Control, useWatch } from 'react-hook-form';
import { PartialFormFields } from './schema';

// Vehicle Data
const useModelVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return !['N', 'X', 'L'].includes(vehicleType);
};

const useModelNameVisibility = (): boolean => {
  const [{ vehicleType, userType }] = useVehicleConfig();
  return !['N', 'X', 'L'].includes(vehicleType) && userType === 'D';
};

const useHsnVisibility = (): boolean => {
  const [{ vehicleType, userType, culture }] = useVehicleConfig();
  if (['B', 'DSC'].includes(vehicleType)) return false;
  if (vehicleType !== 'C') return culture === 'de-DE';
  return userType === 'D' && culture === 'de-DE';
};

const useVinVisibility = (): boolean => {
  const [{ userType, vehicleType }] = useVehicleConfig();
  return userType === 'P' && vehicleType === 'C';
};

const useCarpassMileageUrlVisibility = (): boolean => {
  const [{ vehicleType, userType, culture }] = useVehicleConfig();
  if (['N', 'X', 'L'].includes(vehicleType)) return false;
  if (!['fr-BE', 'nl-BE'].includes(culture)) return false;
  if (userType !== 'D') return false;
  return true;
};

// Characteristics
const useBodyColorVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return !['L'].includes(vehicleType);
};

const useBodyColorNameVisibility = (): boolean => {
  const [{ vehicleType, userType }] = useVehicleConfig();
  switch (vehicleType) {
    case 'N':
    case 'X':
    case 'L':
      return true;
    case 'C':
    case 'B':
      return userType === 'D';
    default:
      return false;
  }
};

const useUpholsteryVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['C', 'B'].includes(vehicleType);
};

const useInteriorColorVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['C', 'B', 'N'].includes(vehicleType);
};

const usePayloadVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  switch (vehicleType) {
    case 'N':
    case 'X':
    case 'L':
      return true;
    default:
      return false;
  }
};

const useGrossVehicleWeightVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  switch (vehicleType) {
    case 'N':
    case 'X':
    case 'L':
      return true;
    default:
      return false;
  }
};

const useProductionYearVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  switch (vehicleType) {
    case 'B':
    case 'C':
      return false;
    default:
      return true;
  }
};

const useAxleCountVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['N', 'X', 'L'].includes(vehicleType);
};

const useWheelbaseVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['N', 'X', 'L'].includes(vehicleType);
};

const useMaximumTowingWeightVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['C', 'X', 'L'].includes(vehicleType);
};

const useHasCarRegistrationVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['C', 'B'].includes(vehicleType);
};

const useLoadDimensionsVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['N', 'X', 'L'].includes(vehicleType);
};

const useTotalDimensionsVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['N', 'X', 'L'].includes(vehicleType);
};

const useBedCountVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return vehicleType === 'N';
};

// Fuel
const useWltpCo2EmissionsCombinedVisibility = (control: Control<PartialFormFields>): boolean => {
  const environmentalProtocol = useWatch({ control, name: 'fuel.environmentalProtocol' });
  return environmentalProtocol === 'wltp';
};

// Financing Offer
const useNetPriceVisibility = (): boolean => {
  const [{ vehicleType, userType, culture }] = useVehicleConfig();
  if (vehicleType === 'DSC') return false;
  if (userType !== 'D') return false;
  return ['nl-NL', 'fr-BE', 'nl-BE', 'de-DE', 'at-AT'].includes(culture);
};

const useVatRateVisibility = (): boolean => {
  const [{ vehicleType, userType, culture }] = useVehicleConfig();
  if (vehicleType === 'DSC') return false;
  if (userType !== 'D') return false;
  return ['nl-NL', 'fr-BE', 'nl-BE', 'de-DE', 'at-AT'].includes(culture);
};

const useTaxAndPriceNegotiableVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return vehicleType !== 'DSC';
};

const useClosingCostsVisibility = (): boolean => {
  const [{ userType, culture }] = useVehicleConfig();
  if (userType !== 'D') return false;
  return ['nl-NL', 'fr-BE', 'nl-BE', 'it-IT', 'de-DE'].includes(culture);
};

// Contact Information
const useContactInformationVisibility = (): boolean => {
  const [{ userType }] = useVehicleConfig();
  return userType !== 'D';
};

export {
  useAxleCountVisibility,
  useBedCountVisibility,
  useBodyColorNameVisibility,
  // Characteristics
  useBodyColorVisibility,
  useCarpassMileageUrlVisibility,
  useClosingCostsVisibility,
  // Contact Information
  useContactInformationVisibility,
  useGrossVehicleWeightVisibility,
  useHasCarRegistrationVisibility,
  useHsnVisibility,
  useInteriorColorVisibility,
  useLoadDimensionsVisibility,
  useMaximumTowingWeightVisibility,
  useModelNameVisibility,
  // Vehicle Data
  useModelVisibility,
  // Financing Offer
  useNetPriceVisibility,
  usePayloadVisibility,
  useProductionYearVisibility,
  useTaxAndPriceNegotiableVisibility,
  useTotalDimensionsVisibility,
  useUpholsteryVisibility,
  useVatRateVisibility,
  useVinVisibility,
  useWheelbaseVisibility,
  // Fuel
  useWltpCo2EmissionsCombinedVisibility,
};
