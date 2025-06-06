import { Steps as ChakraSteps } from '@chakra-ui/react';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import { LuCheck } from 'react-icons/lu';

type StepsProps = {
  steps: Array<{
    id: string;
    heading: string;
    isValid: boolean | undefined;
  }>;
  onClick: (id: string) => void;
  className?: string;
  style?: CSSProperties;
};

const Steps = ({ steps, onClick, className, style }: StepsProps) => {
  return (
    <ChakraSteps.Root
      orientation="vertical"
      count={steps.length}
      className={clsx('!h-auto', className)}
      style={style}
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
              style={{
                color: (() => {
                  if (step.isValid === true) return 'var(--chakra-colors-fg-success)';
                  if (step.isValid === false) return 'var(--chakra-colors-fg-error)';
                  return 'inherit';
                })(),
              }}
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
                <ChakraSteps.Title className="sr-only sm:not-sr-only">
                  {step.heading}
                </ChakraSteps.Title>
              </ChakraSteps.Trigger>
            </ChakraSteps.Item>
          );
        })}
      </ChakraSteps.List>
    </ChakraSteps.Root>
  );
};

export { Steps };
