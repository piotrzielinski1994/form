import { ComplexForm } from '@/components/ComplexForm/ComplexForm';
import { withProviders } from '@/vitest.setup';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('ComplexForm', () => {
  // it('should have no accessibility violations', async () => {
  //   const { container } = render(withProviders(<ComplexForm />));
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });

  it('should match the snapshot', async () => {
    const { container } = await waitFor(() => render(withProviders(<ComplexForm />)));
    expect(container).toMatchSnapshot();
  });
});
