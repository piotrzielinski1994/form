import React, { createContext, useContext } from 'react';

type VehicleConfig = {
  culture: string;
  userType: string;
  vehicleType: string;
};

type VehicleConfigProviderProps = {
  children: React.ReactNode;
  config: VehicleConfig;
};

const VehicleConfigContext = createContext<VehicleConfig | undefined>(undefined);

const VehicleConfigProvider = ({ children, config }: VehicleConfigProviderProps) => {
  return <VehicleConfigContext.Provider value={config}>{children}</VehicleConfigContext.Provider>;
};

const useVehicleConfig = () => {
  const context = useContext(VehicleConfigContext);
  if (!context) throw new Error('useVehicleConfig must be used within a VehicleConfigProvider');
  return context;
};

export { useVehicleConfig, VehicleConfigProvider, type VehicleConfig };
