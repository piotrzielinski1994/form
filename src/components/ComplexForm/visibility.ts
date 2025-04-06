import { Control, useWatch } from 'react-hook-form';
import { PartialFormFields } from './schema';

export const useWltpCo2EmissionsCombinedVisibility = (
  control: Control<PartialFormFields>
): boolean => {
  const environmentalProtocol = useWatch({ control, name: 'fuel.environmentalProtocol' });
  return environmentalProtocol === 'wltp';
};
