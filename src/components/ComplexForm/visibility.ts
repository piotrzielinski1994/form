import { useVehicleConfig } from '@/providers/VehicleConfigProvider';
import { Control, useWatch } from 'react-hook-form';
import { PartialFormFields } from './schema';

// Vehicle Data =======================================================

const useModelVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return !['N', 'X', 'L'].includes(vehicleType);
};

const useModelNameVisibility = (): boolean => {
  const [{ vehicleType, userType }] = useVehicleConfig();
  return ['N', 'X', 'L'].includes(vehicleType) || userType === 'D';
};

const useHsnVisibility = (): boolean => {
  const [{ vehicleType, userType, culture }] = useVehicleConfig();
  if (['B', 'DSC'].includes(vehicleType)) return false;
  if (vehicleType === 'C') return userType === 'D' && culture === 'de-DE';
  return culture === 'de-DE';
};

const useTsnVisibility = (): boolean => {
  const [{ vehicleType, culture }] = useVehicleConfig();
  if (['B', 'DSC'].includes(vehicleType)) return false;
  return culture === 'de-DE';
};

const useVinVisibility = (): boolean => {
  const [{ userType, vehicleType }] = useVehicleConfig();
  if (vehicleType === 'DSC') return false;
  if (['N', 'X', 'L'].includes(vehicleType)) return false;
  return userType === 'D';
};

const useCarpassMileageUrlVisibility = (): boolean => {
  const [{ vehicleType, userType, culture }] = useVehicleConfig();
  if (['N', 'X', 'L'].includes(vehicleType)) return false;
  if (!['fr-BE', 'nl-BE'].includes(culture)) return false;
  return userType === 'D';
};

const useLicencePlateNumberVisibility = (): boolean => {
  const [{ culture }] = useVehicleConfig();
  return culture === 'nl-NL';
};

const useOfferReferenceVisibility = (): boolean => {
  const [{ userType, vehicleType }] = useVehicleConfig();
  if (vehicleType === 'DSC') return false;
  if (['N', 'X', 'L'].includes(vehicleType)) return false;
  return userType === 'D';
};

// Characteristics =======================================================

const useBodyColorVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return !['L'].includes(vehicleType);
};

const useBodyColorNameVisibility = (): boolean => {
  const [{ vehicleType, userType }] = useVehicleConfig();
  if (['N', 'X', 'L'].includes(vehicleType)) return true;
  if (['C', 'B'].includes(vehicleType)) return userType === 'D';
  return false;
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
  return ['N', 'X', 'L'].includes(vehicleType);
};

const useGrossVehicleWeightVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return ['N', 'X', 'L'].includes(vehicleType);
};

const useProductionYearVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return !['B', 'C'].includes(vehicleType);
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

// Fuel =======================================================

const useWltpCo2EmissionsCombinedVisibility = (control: Control<PartialFormFields>): boolean => {
  const environmentalProtocol = useWatch({ control, name: 'fuel.environmentalProtocol' });
  return environmentalProtocol === 'wltp';
};

// Financing Offer =======================================================

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

// Contact Information =======================================================

const useContactInformationVisibility = (): boolean => {
  const [{ userType }] = useVehicleConfig();
  return userType !== 'D';
};

export {
  useAxleCountVisibility,
  useBedCountVisibility,
  useBodyColorNameVisibility,
  useBodyColorVisibility,
  useCarpassMileageUrlVisibility,
  useClosingCostsVisibility,
  useContactInformationVisibility,
  useGrossVehicleWeightVisibility,
  useHasCarRegistrationVisibility,
  useHsnVisibility,
  useInteriorColorVisibility,
  useLicencePlateNumberVisibility,
  useLoadDimensionsVisibility,
  useMaximumTowingWeightVisibility,
  useModelNameVisibility,
  useModelVisibility,
  useNetPriceVisibility,
  useOfferReferenceVisibility,
  usePayloadVisibility,
  useProductionYearVisibility,
  useTaxAndPriceNegotiableVisibility,
  useTotalDimensionsVisibility,
  useTsnVisibility,
  useUpholsteryVisibility,
  useVatRateVisibility,
  useVinVisibility,
  useWheelbaseVisibility,
  useWltpCo2EmissionsCombinedVisibility,
};
