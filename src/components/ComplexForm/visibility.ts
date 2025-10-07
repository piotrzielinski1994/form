import { VehicleConfig } from '@/providers/VehicleConfigProvider';
import { FormFields } from './schema';

// Vehicle Data =======================================================

const isModelVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return !['N', 'X', 'L'].includes(vehicleType);
};

const isModelNameVisible = ({ userType, vehicleType }: VehicleConfig): boolean => {
  return ['N', 'X', 'L'].includes(vehicleType) || userType === 'D';
};

const isHsnVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (['B', 'DSC'].includes(vehicleType)) return false;
  if (vehicleType === 'C') return userType === 'D' && culture === 'de-DE';
  return culture === 'de-DE';
};

const isTsnVisible = ({ culture, vehicleType }: VehicleConfig): boolean => {
  if (['B', 'DSC'].includes(vehicleType)) return false;
  return culture === 'de-DE';
};

const isVinVisible = ({ userType, vehicleType }: VehicleConfig): boolean => {
  if (vehicleType === 'DSC') return false;
  if (['N', 'X', 'L'].includes(vehicleType)) return false;
  return userType === 'D';
};

const isCarpassMileageUrlVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (['N', 'X', 'L'].includes(vehicleType)) return false;
  if (!['fr-BE', 'nl-BE'].includes(culture)) return false;
  return userType === 'D';
};

const isLicencePlateNumberVisible = ({ culture }: VehicleConfig): boolean => {
  return culture === 'nl-NL';
};

const isOfferReferenceVisible = ({ userType, vehicleType }: VehicleConfig): boolean => {
  if (vehicleType === 'DSC') return false;
  if (['N', 'X', 'L'].includes(vehicleType)) return false;
  return userType === 'D';
};

const isModelYearVisible = ({ culture }: VehicleConfig): boolean => {
  return ['en-CA', 'fr-CA'].includes(culture);
};

const isStyleIdVisible = ({ userType, culture }: VehicleConfig): boolean => {
  if (userType !== 'D') return false;
  return ['en-CA', 'fr-CA'].includes(culture);
};

const isTrimVisible = ({ userType, culture }: VehicleConfig): boolean => {
  if (userType !== 'D') return false;
  return ['en-CA', 'fr-CA'].includes(culture);
};

// Characteristics =======================================================

const isBodyColorVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return vehicleType !== 'DSC';
};

const isBodyColorNameVisible = ({ userType, vehicleType }: VehicleConfig): boolean => {
  if (['N', 'X', 'L'].includes(vehicleType)) return true;
  if (['C', 'B'].includes(vehicleType)) return userType === 'D';
  return false;
};

const isSeatsVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return !['B', 'L'].includes(vehicleType);
};

const isDoorsVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return !['B', 'L'].includes(vehicleType);
};

const isMetallicVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (['DSC', 'L'].includes(vehicleType)) return false;
  // Not visible for Canadian dealers
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return false;
  return true;
};

const isUpholsteryVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (['B', 'L', 'DSC'].includes(vehicleType)) return false;
  // Not visible for Canadian dealers
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return false;
  return true;
};

const isInteriorColorVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return !['B', 'DSC'].includes(vehicleType);
};

const isPayloadVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return ['N', 'X', 'L'].includes(vehicleType);
};

const isGrossVehicleWeightVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return ['N', 'X', 'L'].includes(vehicleType);
};

const isProductionYearVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return !['B', 'C'].includes(vehicleType);
};

const isAxleCountVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return ['N', 'X', 'L'].includes(vehicleType);
};

const isWheelbaseVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return ['N', 'X', 'L'].includes(vehicleType);
};

const isMaximumTowingWeightVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return ['C', 'X', 'L'].includes(vehicleType);
};

const isHasCarRegistrationVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return ['C', 'B'].includes(vehicleType);
};

const isLoadDimensionsVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return ['N', 'X', 'L'].includes(vehicleType);
};

const isTotalDimensionsVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return ['N', 'X', 'L'].includes(vehicleType);
};

const isBedCountVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return vehicleType === 'N';
};

// Fuel =======================================================

const isWltpCo2EmissionsCombinedVisible = (
  environmentalProtocol: FormFields['fuel']['environmentalProtocol']
): boolean => {
  return environmentalProtocol === 'wltp';
};

// Financing Offer =======================================================

const isNetPriceVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (vehicleType === 'DSC') return false;
  if (userType !== 'D') return false;
  return ['nl-NL', 'fr-BE', 'nl-BE', 'de-DE', 'de-AT'].includes(culture);
};

const isVatRateVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (vehicleType === 'DSC') return false;
  if (userType !== 'D') return false;
  return ['nl-NL', 'fr-BE', 'nl-BE', 'de-DE', 'de-AT'].includes(culture);
};

const isTaxAndPriceNegotiableVisible = ({ vehicleType }: VehicleConfig): boolean => {
  return vehicleType !== 'DSC';
};

const isClosingCostsVisible = ({ userType, culture }: VehicleConfig): boolean => {
  if (userType !== 'D') return false;
  return ['nl-NL', 'fr-BE', 'nl-BE', 'it-IT', 'de-DE'].includes(culture);
};

// Contact Information =======================================================

const isContactInformationVisible = ({ userType }: VehicleConfig): boolean => {
  return userType !== 'D';
};

export {
  isAxleCountVisible,
  isBedCountVisible,
  isBodyColorNameVisible,
  isBodyColorVisible,
  isCarpassMileageUrlVisible,
  isClosingCostsVisible,
  isContactInformationVisible,
  isDoorsVisible,
  isGrossVehicleWeightVisible,
  isHasCarRegistrationVisible,
  isHsnVisible,
  isInteriorColorVisible,
  isLicencePlateNumberVisible,
  isLoadDimensionsVisible,
  isMaximumTowingWeightVisible,
  isMetallicVisible,
  isModelNameVisible,
  isModelVisible,
  isModelYearVisible,
  isNetPriceVisible,
  isOfferReferenceVisible,
  isPayloadVisible,
  isProductionYearVisible,
  isSeatsVisible,
  isStyleIdVisible,
  isTaxAndPriceNegotiableVisible,
  isTotalDimensionsVisible,
  isTrimVisible,
  isTsnVisible,
  isUpholsteryVisible,
  isVatRateVisible,
  isVinVisible,
  isWheelbaseVisible,
  isWltpCo2EmissionsCombinedVisible,
};
