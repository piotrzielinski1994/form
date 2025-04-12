'use client';

import { useVehicleConfig } from '@/providers/VehicleConfigProvider';
import { SegmentGroup } from '@chakra-ui/react';

const VehicleTypeSwitcher = () => {
  const setConfig = useVehicleConfig()[1];
  return (
    <SegmentGroup.Root
      defaultValue={'C'}
      size="xs"
      onValueChange={({ value }) => {
        if (value === null) return;
        setConfig((prev) => ({ ...prev, vehicleType: value }));
      }}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items className="cursor-pointer" items={['B', 'C', 'X', 'N', 'L', 'DSC']} />
    </SegmentGroup.Root>
  );
};

export { VehicleTypeSwitcher };
