import { ComplexForm } from '@/components/ComplexForm/ComplexForm';
import en from '@/messages/en.json';
import { withProviders } from '@/vitest.setup';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { describe, it } from 'vitest';

const t = en.ComplexForm;

describe('ComplexForm > Validation', () => {
  it('should trigger validation on submit', async () => {
    // Arrange
    const { getByRole, queryAllByRole } = render(withProviders(<ComplexForm />));
    const errorsBefore = queryAllByRole('alert').length;

    // Act
    await waitFor(() => getByRole('button', { name: t.submit }).click());

    // Assert
    expect(errorsBefore).toBe(0);
    expect(queryAllByRole('alert').length).not.toBe(0);
  });

  describe('vehicleData', () => {
    describe('make', () => {
      it('should not be empty', async () => {
        // Arrange
        const { getByRole } = render(withProviders(<ComplexForm />));
        const input = getByRole('combobox', { name: t.vehicleData.make }) as HTMLSelectElement;
        const field = input.closest('[data-part="root"]') as HTMLElement;
        const errorBefore = within(field).queryByRole('alert');

        // Act
        await waitFor(() => getByRole('button', { name: t.submit }).click());

        // Assert
        const errorAfter = within(field).queryByRole('alert');
        expect(errorBefore).toBeFalsy();
        expect(errorAfter).toBeTruthy();
        expect(errorAfter).toHaveTextContent(en.zod.invalid_type_received_undefined);
      });

      it('should not show an error if the value is correct', async () => {
        // Arrange
        const { getByRole } = render(withProviders(<ComplexForm />));
        const input = getByRole('combobox', { name: t.vehicleData.make }) as HTMLSelectElement;
        const field = input.closest('[data-part="root"]') as HTMLElement;
        const errorBefore = within(field).queryByRole('alert');

        // Act
        fireEvent.change(input, { target: { value: [...input.options][1].value } });
        await waitFor(() => getByRole('button', { name: t.submit }).click());

        // Assert
        expect(errorBefore).toBeFalsy();
        expect(within(field).queryByRole('alert')).toBeFalsy();
      });
    });
  });
});
