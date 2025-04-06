import { Steps as ChakraSteps } from '@chakra-ui/react';
import clsx from 'clsx';

type StepsProps = {
  steps: Array<{
    id: string;
    heading: string;
  }>;
  onClick: (id: string) => void;
  className?: string;
};

const Steps = ({ steps, onClick, className }: StepsProps) => {
  return (
    <ChakraSteps.Root
      orientation="vertical"
      defaultStep={1}
      count={steps.length}
      className={clsx('!h-auto', className)}
      onStepChange={({ step }) => onClick(steps[step].id)}
    >
      <ChakraSteps.List>
        {steps.map((step, index) => (
          <ChakraSteps.Item key={index} index={index} title={step.heading}>
            <ChakraSteps.Trigger className="cursor-pointer my-2">
              <ChakraSteps.Indicator />
              <ChakraSteps.Title>{step.heading}</ChakraSteps.Title>
              {/* <ChakraSteps.Separator /> */}
            </ChakraSteps.Trigger>
          </ChakraSteps.Item>
        ))}
      </ChakraSteps.List>
    </ChakraSteps.Root>
  );
};

export { Steps };
