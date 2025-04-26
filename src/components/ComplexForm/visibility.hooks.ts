import { useVehicleConfig } from '@/providers/VehicleConfigProvider';
import { Control, useWatch } from 'react-hook-form';
import { PartialFormFields } from './schema';
import * as visibilityFunctions from './visibility';

// Vehicle Data =======================================================

const useModelVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isModelVisible(vehicleConfig);
};

const useModelNameVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isModelNameVisible(vehicleConfig);
};

const useHsnVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isHsnVisible(vehicleConfig);
};

const useTsnVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isTsnVisible(vehicleConfig);
};

const useVinVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isVinVisible(vehicleConfig);
};

const useCarpassMileageUrlVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isCarpassMileageUrlVisible(vehicleConfig);
};

const useLicencePlateNumberVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isLicencePlateNumberVisible(vehicleConfig);
};

const useOfferReferenceVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isOfferReferenceVisible(vehicleConfig);
};

// Characteristics =======================================================

const useBodyColorVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isBodyColorVisible(vehicleConfig);
};

const useBodyColorNameVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isBodyColorNameVisible(vehicleConfig);
};

const useUpholsteryVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isUpholsteryVisible(vehicleConfig);
};

const useInteriorColorVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isInteriorColorVisible(vehicleConfig);
};

const usePayloadVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isPayloadVisible(vehicleConfig);
};

const useGrossVehicleWeightVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isGrossVehicleWeightVisible(vehicleConfig);
};

const useProductionYearVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isProductionYearVisible(vehicleConfig);
};

const useAxleCountVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isAxleCountVisible(vehicleConfig);
};

const useWheelbaseVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isWheelbaseVisible(vehicleConfig);
};

const useMaximumTowingWeightVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isMaximumTowingWeightVisible(vehicleConfig);
};

const useHasCarRegistrationVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isHasCarRegistrationVisible(vehicleConfig);
};

const useLoadDimensionsVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isLoadDimensionsVisible(vehicleConfig);
};

const useTotalDimensionsVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isTotalDimensionsVisible(vehicleConfig);
};

const useBedCountVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isBedCountVisible(vehicleConfig);
};

// Fuel =======================================================

const useWltpCo2EmissionsCombinedVisibility = (control: Control<PartialFormFields>): boolean => {
  const environmentalProtocol = useWatch({ control, name: 'fuel.environmentalProtocol' });
  return visibilityFunctions.isWltpCo2EmissionsCombinedVisible(environmentalProtocol);
};

// Financing Offer =======================================================

const useNetPriceVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isNetPriceVisible(vehicleConfig);
};

const useVatRateVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isVatRateVisible(vehicleConfig);
};

const useTaxAndPriceNegotiableVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isTaxAndPriceNegotiableVisible(vehicleConfig);
};

const useClosingCostsVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isClosingCostsVisible(vehicleConfig);
};

// Contact Information =======================================================

const useContactInformationVisibility = (): boolean => {
  const [vehicleConfig] = useVehicleConfig();
  return visibilityFunctions.isContactInformationVisible(vehicleConfig);
};

export {
  useAxleCountVisibility,
  useBedCountVisibility,
  useBodyColorNameVisibility,
  useBodyColorVisibility,
  useCarpassMileageUrlVisibility,
  useClosingCostsVisibility,
  useContactInformationVisibility,
  useGrossVehicleWeightVisibility,
  useHasCarRegistrationVisibility,
  useHsnVisibility,
  useInteriorColorVisibility,
  useLicencePlateNumberVisibility,
  useLoadDimensionsVisibility,
  useMaximumTowingWeightVisibility,
  useModelNameVisibility,
  useModelVisibility,
  useNetPriceVisibility,
  useOfferReferenceVisibility,
  usePayloadVisibility,
  useProductionYearVisibility,
  useTaxAndPriceNegotiableVisibility,
  useTotalDimensionsVisibility,
  useTsnVisibility,
  useUpholsteryVisibility,
  useVatRateVisibility,
  useVinVisibility,
  useWheelbaseVisibility,
  useWltpCo2EmissionsCombinedVisibility,
};
