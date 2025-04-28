'use client';

import { useVehicleConfig, VehicleConfig } from '@/providers/VehicleConfigProvider';
import { SegmentGroup } from '@chakra-ui/react';

const vehicleTypes: VehicleConfig['vehicleType'][] = ['B', 'C', 'X', 'N', 'L', 'DSC'];

const VehicleTypeSwitcher = () => {
  const setConfig = useVehicleConfig()[1];
  return (
    <SegmentGroup.Root
      defaultValue={'C'}
      size="xs"
      onValueChange={({ value }) => {
        if (value === null) return;
        setConfig((prev) => ({ ...prev, vehicleType: value as VehicleConfig['vehicleType'] }));
      }}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items className="cursor-pointer" items={vehicleTypes} />
    </SegmentGroup.Root>
  );
};

export { VehicleTypeSwitcher };
