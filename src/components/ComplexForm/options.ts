import { primaryFuelTypes } from '@/app/api/fuel-categories/[fuelCategoryId]/primary-fuel-types/route';
import { models } from '@/app/api/makes/[makeId]/models/route';
import { useQuery } from '@tanstack/react-query';
import { Control, useWatch } from 'react-hook-form';
import { PartialFormFields } from './schema';

const useVehicleDataModelOptions = (control: Control<PartialFormFields>) => {
  const makeId = useWatch({ control, name: 'vehicleData.make' });
  return useQuery<(typeof models)[string]>({
    enabled: !!makeId,
    queryKey: ['/api/makes/{makeId}/models', { makeId }],
    queryFn: async () => {
      const response = await fetch(`/api/makes/${makeId}/models`);
      if (!response.ok) throw new Error('Failed to fetch vehicle models');
      const json = await response.json();
      return json.models;
    },
    initialData: [],
  });
};

const usePrimaryFuelTypeOptions = (control: Control<PartialFormFields>) => {
  const fuelCategoryId = useWatch({ control, name: 'fuel.fuelCategory' });
  return useQuery<(typeof primaryFuelTypes)[string]>({
    enabled: !!fuelCategoryId,
    queryKey: ['/api/fuel-categories/{fuelCategoryId}/primary-fuel-types', { fuelCategoryId }],
    queryFn: async () => {
      const response = await fetch(`/api/fuel-categories/${fuelCategoryId}/primary-fuel-types`);
      if (!response.ok) throw new Error('Failed to fetch primary fuel types');
      const json = await response.json();
      return json.primaryFuelTypes;
    },
    initialData: [],
  });
};

export { usePrimaryFuelTypeOptions, useVehicleDataModelOptions };
