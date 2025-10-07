import { VehicleConfig } from '@/providers/VehicleConfigProvider';

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

// Condition =======================================================

const isNonSmokingVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return false;
  if (vehicleType === 'DSC') return false;
  return ['C', 'N'].includes(vehicleType);
};

const isFullServiceHistoryVisible = ({
  userType,
  culture,
  vehicleType,
}: VehicleConfig): boolean => {
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return false;
  if (vehicleType === 'DSC') return false;
  return true;
};

const isDamagedVehicleVisible = ({ vehicleType }: VehicleConfig): boolean => {
  if (vehicleType === 'DSC') return false;
  return true;
};

const isAccidentVehicleVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return false;
  if (vehicleType === 'DSC') return false;
  return true;
};

const isRoadWorthinessVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return false;
  if (vehicleType === 'DSC') return false;
  return true;
};

const isPreviousOwnersVisible = (vehicleOfferType: string): boolean => {
  return vehicleOfferType !== 'N';
};

const isPowerKWVisible = ({ culture }: VehicleConfig): boolean => {
  return !['en-CA', 'fr-CA'].includes(culture);
};

const isCylindersVisible = (fuelCategory: string): boolean => {
  return fuelCategory !== 'E';
};

const isEngineCapacityVisible = (fuelCategory: string): boolean => {
  return fuelCategory !== 'E';
};

const isGearsVisible = (fuelCategory: string): boolean => {
  return fuelCategory !== 'E';
};

const isPriceVisible = ({ userType, culture }: VehicleConfig): boolean => {
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return false;
  return true;
};

const isAskingPriceVisible = ({ userType, culture }: VehicleConfig): boolean => {
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return true;
  return false;
};

const isMsrpPriceVisible = ({ userType, culture }: VehicleConfig): boolean => {
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return true;
  return false;
};

const isPriceNegotiableVisible = ({ userType, culture, vehicleType }: VehicleConfig): boolean => {
  if (vehicleType === 'DSC') return false;
  if (['en-CA', 'fr-CA'].includes(culture) && userType === 'D') return false;
  return true;
};

const isTaxDeductibleVisible = ({ culture, vehicleType }: VehicleConfig): boolean => {
  if (vehicleType === 'DSC') return false;
  if (['en-CA', 'fr-CA'].includes(culture)) return false;
  return true;
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

// Fuel data
const isPrimaryFuelTypeVisible = (config: VehicleConfig): boolean => {
  return config.vehicleType === 'C';
};

const isSootParticlesVisible = (config: VehicleConfig, fuelCategory?: string): boolean => {
  return ['D', 'ED'].includes(fuelCategory || '');
};

const isAdditionalFuelTypesVisible = (config: VehicleConfig): boolean => {
  return config.vehicleType === 'C';
};

const isPluginHybridVisible = (config: VehicleConfig, fuelCategory?: string): boolean => {
  return config.vehicleType === 'C' && ['ED', 'EB', 'O'].includes(fuelCategory || '');
};

const isCo2Visible = (
  config: VehicleConfig,
  fuelData?: {
    primaryFuelType?: string;
    additionalFuelTypes?: string[];
    environmentalProtocol?: string;
  }
): boolean => {
  const isNotDealerBike = config.vehicleType !== 'B' || config.userType !== 'D';
  const isNEDC = fuelData?.environmentalProtocol === 'nedc';
  const isNotEV = !(
    fuelData?.primaryFuelType === '2' &&
    (!fuelData?.additionalFuelTypes || fuelData.additionalFuelTypes.length === 0)
  );
  return isNotDealerBike && isNEDC && isNotEV;
};

const isElectricRangeVisible = (
  config: VehicleConfig,
  fuelData?: { pluginHybrid?: boolean; primaryFuelType?: string }
): boolean => {
  const isEVorPHEV = fuelData?.pluginHybrid || fuelData?.primaryFuelType === '2';
  return config.vehicleType === 'C' && isEVorPHEV;
};

const isEmissionStickerVisible = (config: VehicleConfig): boolean => {
  return config.culture === 'de-DE' && config.vehicleType !== 'B';
};

const isEfficiencyClassVisible = (
  config: VehicleConfig,
  environmentalProtocol?: string
): boolean => {
  return (
    config.culture === 'de-DE' && config.vehicleType !== 'B' && environmentalProtocol === 'nedc'
  );
};

const isWltpCo2ClassVisible = (config: VehicleConfig, environmentalProtocol?: string): boolean => {
  return config.vehicleType === 'C' && environmentalProtocol === 'wltp';
};

const isWltpCo2ClassDischargedVisible = (
  config: VehicleConfig,
  fuelData?: { pluginHybrid?: boolean; environmentalProtocol?: string }
): boolean => {
  return (
    config.vehicleType === 'C' &&
    fuelData?.pluginHybrid === true &&
    fuelData?.environmentalProtocol === 'wltp'
  );
};

const isWltpCo2EmissionsCombinedVisible = (
  config: VehicleConfig,
  fuelData?: { pluginHybrid?: boolean; primaryFuelType?: string; environmentalProtocol?: string }
): boolean => {
  const isNotEVorPHEV = !(fuelData?.pluginHybrid || fuelData?.primaryFuelType === '2');
  return config.vehicleType === 'C' && isNotEVorPHEV && fuelData?.environmentalProtocol === 'wltp';
};

const isElectricConsumptionCombinedVisible = (
  config: VehicleConfig,
  fuelData?: { pluginHybrid?: boolean; primaryFuelType?: string; environmentalProtocol?: string }
): boolean => {
  const isEVorPHEV = fuelData?.pluginHybrid || fuelData?.primaryFuelType === '2';
  return (
    config.culture === 'de-DE' &&
    config.vehicleType !== 'B' &&
    fuelData?.environmentalProtocol === 'nedc' &&
    isEVorPHEV
  );
};

// Contact Information =======================================================

const isContactInformationVisible = ({ userType }: VehicleConfig): boolean => {
  return userType !== 'D';
};

export {
  isAccidentVehicleVisible,
  isAdditionalFuelTypesVisible,
  isAskingPriceVisible,
  isAxleCountVisible,
  isBedCountVisible,
  isBodyColorNameVisible,
  isBodyColorVisible,
  isCarpassMileageUrlVisible,
  isClosingCostsVisible,
  isCo2Visible,
  isContactInformationVisible,
  isCylindersVisible,
  isDamagedVehicleVisible,
  isDoorsVisible,
  isEfficiencyClassVisible,
  isElectricConsumptionCombinedVisible,
  isElectricRangeVisible,
  isEmissionStickerVisible,
  isEngineCapacityVisible,
  isFullServiceHistoryVisible,
  isGearsVisible,
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
  isMsrpPriceVisible,
  isNetPriceVisible,
  isNonSmokingVisible,
  isOfferReferenceVisible,
  isPayloadVisible,
  isPluginHybridVisible,
  isPowerKWVisible,
  isPreviousOwnersVisible,
  isPriceNegotiableVisible,
  isPriceVisible,
  isPrimaryFuelTypeVisible,
  isProductionYearVisible,
  isRoadWorthinessVisible,
  isSeatsVisible,
  isSootParticlesVisible,
  isStyleIdVisible,
  isTaxAndPriceNegotiableVisible,
  isTaxDeductibleVisible,
  isTotalDimensionsVisible,
  isTrimVisible,
  isTsnVisible,
  isUpholsteryVisible,
  isVatRateVisible,
  isVinVisible,
  isWheelbaseVisible,
  isWltpCo2ClassDischargedVisible,
  isWltpCo2ClassVisible,
  isWltpCo2EmissionsCombinedVisible,
};
