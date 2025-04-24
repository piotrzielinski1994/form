import { useVehicleConfig } from '@/providers/VehicleConfigProvider';
import { Control, useWatch } from 'react-hook-form';
import { PartialFormFields } from './schema';

const useWltpCo2EmissionsCombinedVisibility = (control: Control<PartialFormFields>): boolean => {
  const environmentalProtocol = useWatch({ control, name: 'fuel.environmentalProtocol' });
  return environmentalProtocol === 'wltp';
};

const useHsnVisibility = (): boolean => {
  const [{ vehicleType, userType, culture }] = useVehicleConfig();
  if (['B', 'DSC'].includes(vehicleType)) return false;
  if (vehicleType !== 'C') return culture === 'de-DE';
  return userType === 'D' && culture === 'de-DE';
};

const useModelVisibility = (): boolean => {
  const [{ vehicleType }] = useVehicleConfig();
  return !['N', 'X', 'L'].includes(vehicleType);
};

const useModelNameVisibility = (): boolean => {
  const [{ vehicleType, userType }] = useVehicleConfig();
  return !['N', 'X', 'L'].includes(vehicleType) && userType === 'D';
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

export {
  useCarpassMileageUrlVisibility,
  useClosingCostsVisibility,
  useHsnVisibility,
  useModelNameVisibility,
  useModelVisibility,
  useNetPriceVisibility,
  useTaxAndPriceNegotiableVisibility,
  useVatRateVisibility,
  useVinVisibility,
  useWltpCo2EmissionsCombinedVisibility,
};
