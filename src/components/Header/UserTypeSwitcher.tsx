'use client';

import { useVehicleConfig } from '@/providers/VehicleConfigProvider';
import { SegmentGroup } from '@chakra-ui/react';

const UserTypeSwitcher = () => {
  const setConfig = useVehicleConfig()[1];
  return (
    <SegmentGroup.Root
      defaultValue={'P'}
      size="xs"
      onValueChange={({ value }) => {
        if (value === null) return;
        setConfig((prev) => ({ ...prev, userType: value }));
      }}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items className="cursor-pointer" items={['D', 'P', 'B']} />
    </SegmentGroup.Root>
  );
};

export { UserTypeSwitcher };
