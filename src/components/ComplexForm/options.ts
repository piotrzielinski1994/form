import { useQuery } from '@tanstack/react-query';
import { Control, useWatch } from 'react-hook-form';
import { models } from './constants';
import { PartialFormFields } from './schema';

const useVehicleDataModelOptions = (control: Control<PartialFormFields>) => {
  const makeId = useWatch({ control, name: 'vehicleData.make' });
  const response = useQuery<{
    models: (typeof models)[string];
  }>({
    enabled: !!makeId,
    queryKey: ['GET', '/api/makes/{makeId}/models', makeId],
    queryFn: async () => {
      const response = await fetch(`/api/makes/${makeId}/models`);
      if (!response.ok) throw new Error('Failed to fetch vehicle models');
      return response.json();
    },
  });

  return {
    models: response.data?.models ?? [],
    isLoading: response.isLoading,
  };
};

export { useVehicleDataModelOptions };
