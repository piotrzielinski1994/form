import { useLocale } from 'next-intl';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type VehicleConfig = {
  culture: string;
  userType: string;
  vehicleType: string;
};

const VehicleConfigContext = createContext<
  [VehicleConfig, Dispatch<SetStateAction<VehicleConfig>>] | undefined
>(undefined);

const VehicleConfigProvider = ({ children }: PropsWithChildren) => {
  const locale = useLocale();
  const state = useState<VehicleConfig>({
    culture:
      Object.entries(localePerCulture)
        .find((it) => it[1] === locale)
        ?.at(0) ?? 'en-US',
    userType: 'P',
    vehicleType: 'C',
  });

  return <VehicleConfigContext.Provider value={state}>{children}</VehicleConfigContext.Provider>;
};

const useVehicleConfig = () => {
  const context = useContext(VehicleConfigContext);
  if (!context) throw new Error('useVehicleConfig must be used within a VehicleConfigProvider');
  return context;
};

const localePerCulture: Record<string, string> = {
  'de-DE': 'de',
  'es-ES': 'es',
  'fr-FR': 'fr',
  'it-IT': 'it',
  'nl-NL': 'nl',
};

export { useVehicleConfig, VehicleConfigProvider, type VehicleConfig };
