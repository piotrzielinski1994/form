import { ComplexForm } from '@/components/ComplexForm/ComplexForm';
import en from '@/messages/en.json';
import { withProviders } from '@/vitest.setup';
import { render, waitFor, within } from '@testing-library/react';
import { describe, it } from 'vitest';

describe('ComplexForm > Validation', () => {
  it('should trigger validation on submit', async () => {
    // Arrange
    const { getByRole, queryAllByRole } = render(withProviders(<ComplexForm />));
    const errorsBefore = queryAllByRole('alert').length;

    // Act
    await waitFor(() => getByRole('button', { name: en.ComplexForm.submit }).click());

    // Assert
    expect(errorsBefore).toBe(0);
    expect(queryAllByRole('alert').length).not.toBe(0);
  });

  describe('vehicleData', () => {
    describe('make', () => {
      it('should not be empty', async () => {
        // Arrange
        const { getByRole } = render(withProviders(<ComplexForm />));
        const input = getByRole('combobox', { name: en.ComplexForm.vehicleData.make });
        const field = input.closest('[data-part="root"]') as HTMLElement;
        const errorBefore = within(field).queryByRole('alert');

        // Act
        await waitFor(() => getByRole('button', { name: en.ComplexForm.submit }).click());

        // Assert
        const errorAfter = within(field).queryByRole('alert');
        expect(errorBefore).toBeFalsy();
        expect(errorAfter).toBeTruthy();
        expect(errorAfter).toHaveTextContent(en.zod.invalid_type_received_undefined);
      });
    });
  });
});
