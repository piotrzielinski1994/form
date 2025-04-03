import { Control, useWatch } from 'react-hook-form';
import { FormFields } from './schema';

export const useWltpCo2EmissionsCombinedVisibility = (control: Control<FormFields>) => {
  const fuelCategory = useWatch({ control, name: 'fuel.fuelType' });
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });

  return fuelCategory && primaryFuelType !== 'electric';
};

export const useElectricRangeVisibility = (control: Control<FormFields>) => {
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });

  return primaryFuelType === 'electric';
};

export const useAndroidAutoVisibility = (control: Control<FormFields>) => {
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });

  return primaryFuelType === 'electric';
};

export const useWltpConsumptionCombinedVisibility = (control: Control<FormFields>) => {
  const fuelCategory = useWatch({ control, name: 'fuel.fuelType' });
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });

  return fuelCategory && primaryFuelType !== 'electric';
};

export const useChargingTimeVisibility = (control: Control<FormFields>) => {
  const primaryFuelType = useWatch({ control, name: 'fuel.primaryFuelType' });

  return primaryFuelType === 'electric';
};
