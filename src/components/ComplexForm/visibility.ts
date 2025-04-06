import { Control, useWatch } from 'react-hook-form';
import { useVehicleConfig } from '../VehicleConfigProvider';
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

export { useHsnVisibility, useWltpCo2EmissionsCombinedVisibility };
