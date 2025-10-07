'use client';

import { useVehicleConfig, VehicleConfig } from '@/providers/VehicleConfigProvider';
import { SegmentGroup } from '@chakra-ui/react';

const userTypes: VehicleConfig['userType'][] = ['D', 'P', 'B'];

const UserTypeSwitcher = () => {
  const setConfig = useVehicleConfig()[1];
  return (
    <SegmentGroup.Root
      defaultValue={'P'}
      size="xs"
      onValueChange={({ value }) => {
        if (value === null) return;
        setConfig((prev) => ({ ...prev, userType: value as VehicleConfig['userType'] }));
      }}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items suppressHydrationWarning className="cursor-pointer" items={userTypes} />
    </SegmentGroup.Root>
  );
};

export { UserTypeSwitcher };
