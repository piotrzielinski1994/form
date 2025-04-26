import { useVehicleConfig } from '@/providers/VehicleConfigProvider';

const useNetPriceDisabled = (): boolean => {
  const [{ userType, culture }] = useVehicleConfig();
  if (culture === 'nl-NL' && userType === 'D') return false;
  if (culture === 'at-AT' && userType === 'D') return false;
  return true;
};

export { useNetPriceDisabled };
