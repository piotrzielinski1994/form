import { Control, useWatch } from 'react-hook-form';
import { PartialFormFields } from './schema';

export const useWltpCo2EmissionsCombinedVisibility = (
  control: Control<PartialFormFields>
): boolean => {
  const fuelCategory = useWatch({ control, name: 'fuel.fuelType' });
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });
  return !!fuelCategory && primaryFuelType !== 'electric';
};

export const useElectricRangeVisibility = (control: Control<PartialFormFields>): boolean => {
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });
  return primaryFuelType === 'electric';
};

export const useAndroidAutoVisibility = (control: Control<PartialFormFields>): boolean => {
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });
  return primaryFuelType === 'electric';
};

export const useWltpConsumptionCombinedVisibility = (
  control: Control<PartialFormFields>
): boolean => {
  const fuelCategory = useWatch({ control, name: 'fuel.fuelType' });
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });
  return !!fuelCategory && primaryFuelType !== 'electric';
};

export const useChargingTimeVisibility = (control: Control<PartialFormFields>): boolean => {
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });
  return primaryFuelType === 'electric';
};
