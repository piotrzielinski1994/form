import { Steps as ChakraSteps } from '@chakra-ui/react';
import clsx from 'clsx';

type StepsProps = {
  steps: Array<{
    id: string;
    heading: string;
    isValid: boolean;
  }>;
  onClick: (id: string) => void;
  className?: string;
};

const Steps = ({ steps, onClick, className }: StepsProps) => {
  return (
    <ChakraSteps.Root
      orientation="vertical"
      count={steps.length}
      className={clsx('!h-auto', className)}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        const step = target.closest('button')?.id.split(':trigger:').at(1);
        if (step === undefined) return;
        onClick(steps[Number(step)].id);
      }}
    >
      <ChakraSteps.List>
        {steps.map((step, index) => (
          <ChakraSteps.Item
            key={index}
            index={index}
            title={step.heading}
            className={clsx({ 'text-red-500': !step.isValid })}
          >
            <ChakraSteps.Trigger className="cursor-pointer my-2">
              <ChakraSteps.Indicator />
              <ChakraSteps.Title>
                {step.heading}
                {step.isValid ? '' : '*'}
              </ChakraSteps.Title>
            </ChakraSteps.Trigger>
          </ChakraSteps.Item>
        ))}
      </ChakraSteps.List>
    </ChakraSteps.Root>
  );
};

export { Steps };
