import { Control, useWatch } from 'react-hook-form';
import { useVehicleConfig } from '../../providers/VehicleConfigProvider';
import { PartialFormFields } from './schema';

const useWltpCo2EmissionsCombinedVisibility = (control: Control<PartialFormFields>): boolean => {
  const environmentalProtocol = useWatch({ control, name: 'fuel.environmentalProtocol' });
  return environmentalProtocol === 'wltp';
};

const useHsnVisibility = (): boolean => {
  const { vehicleType, userType, culture } = useVehicleConfig();
  if (['B', 'DSC'].includes(vehicleType)) return false;
  if (vehicleType !== 'C') return culture === 'de-DE';
  return userType === 'D' && culture === 'de-DE';
};

const useModelVisibility = (): boolean => {
  const { vehicleType } = useVehicleConfig();
  return !['N', 'X', 'L'].includes(vehicleType);
};

const useModelNameVisibility = (): boolean => {
  const { vehicleType, userType } = useVehicleConfig();
  return !['N', 'X', 'L'].includes(vehicleType) && userType === 'D';
};

const useVinVisibility = (): boolean => {
  const { userType, vehicleType } = useVehicleConfig();
  return userType === 'P' && vehicleType === 'C';
};

const useCarpassMileageUrlVisibility = (): boolean => {
  const { vehicleType, userType, culture } = useVehicleConfig();
  if (['N', 'X', 'L'].includes(vehicleType)) return false;
  if (!['fr-BE', 'nl-BE'].includes(culture)) return false;
  if (userType !== 'D') return false;
  return true;
};

export {
  useCarpassMileageUrlVisibility,
  useHsnVisibility,
  useModelNameVisibility,
  useModelVisibility,
  useVinVisibility,
  useWltpCo2EmissionsCombinedVisibility,
};
