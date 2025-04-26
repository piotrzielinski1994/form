import { Steps as ChakraSteps } from '@chakra-ui/react';
import clsx from 'clsx';
import { LuCheck } from 'react-icons/lu';

type StepsProps = {
  steps: Array<{
    id: string;
    heading: string;
    isValid: boolean | undefined;
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
      <ChakraSteps.List className="gap gap-2">
        {steps.map((step, index) => {
          return (
            <ChakraSteps.Item
              key={index}
              index={index}
              title={step.heading}
              className={clsx({
                'text-red-500': step.isValid === false,
                'text-green-600': step.isValid === true,
              })}
            >
              <ChakraSteps.Trigger className="cursor-pointer">
                <div
                  className={clsx(
                    'w-10 h-10 rounded-full border-current border-1',
                    'grid place-items-center'
                  )}
                >
                  {step.isValid ? <LuCheck /> : index + 1}
                </div>
                <ChakraSteps.Title>{step.heading}</ChakraSteps.Title>
              </ChakraSteps.Trigger>
            </ChakraSteps.Item>
          );
        })}
      </ChakraSteps.List>
    </ChakraSteps.Root>
  );
};

export { Steps };
