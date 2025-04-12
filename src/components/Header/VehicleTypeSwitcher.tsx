import { SegmentGroup } from '@chakra-ui/react';

const VehicleTypeSwitcher = () => {
  return (
    <SegmentGroup.Root defaultValue={'C'} size="xs">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items className="cursor-pointer" items={['B', 'C', 'X', 'N', 'L', 'DSC']} />
    </SegmentGroup.Root>
  );
};

export { VehicleTypeSwitcher };
