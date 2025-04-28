import { localePerCulture } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { toPairs } from 'ramda';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type VehicleConfig = {
  culture: keyof typeof localePerCulture;
  userType: 'D' | 'P' | 'B';
  vehicleType: 'B' | 'C' | 'X' | 'N' | 'L' | 'DSC';
};

const VehicleConfigContext = createContext<
  [VehicleConfig, Dispatch<SetStateAction<VehicleConfig>>] | undefined
>(undefined);

const VehicleConfigProvider = ({ children }: PropsWithChildren) => {
  const locale = useLocale();
  const state = useState<VehicleConfig>({
    culture: toPairs(localePerCulture).find((it) => it[1] === locale)?.[0] ?? 'en-US',
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

export { useVehicleConfig, VehicleConfigProvider, type VehicleConfig };
