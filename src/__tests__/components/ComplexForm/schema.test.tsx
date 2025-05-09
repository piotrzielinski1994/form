import { ComplexForm } from '@/components/ComplexForm/ComplexForm';
import en from '@/messages/en.json';
import { withProviders } from '@/vitest.setup';
import { render, waitFor } from '@testing-library/react';
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
});
