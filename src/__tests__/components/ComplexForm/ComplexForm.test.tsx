import { ComplexForm } from '@/components/ComplexForm/ComplexForm';
import en from '@/messages/en.json';
import { withProviders } from '@/vitest.setup';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const t = en.ComplexForm;

describe('ComplexForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    
    // Mock fetch for API calls
    global.fetch = vi.fn((url: RequestInfo | URL) => {
      const urlString = url.toString();
      console.log('Fetch called with URL:', urlString);
      
      if (urlString.includes('/api/makes/13/models')) {
        console.log('Returning BMW models');
        return Promise.resolve({
          ok: true,
          json: async () => ({
            models: [
              { value: '13-model-1', label: 'BMW | Model 1' },
              { value: '13-model-2', label: 'BMW | Model 2' },
            ],
          }),
        } as Response);
      }
      if (urlString.includes('/api/fuel-categories/')) {
        console.log('Returning fuel types');
        return Promise.resolve({
          ok: true,
          json: async () => ({
            primaryFuelTypes: [
              { value: 'fuel-1', label: 'Fuel Type 1' },
              { value: 'fuel-2', label: 'Fuel Type 2' },
            ],
          }),
        } as Response);
      }
      console.log('Unmocked URL:', urlString);
      return Promise.reject(new Error(`Unmocked URL: ${urlString}`));
    }) as typeof fetch;
  });

  it('should match the snapshot', async () => {
    const { container } = await waitFor(() => render(withProviders(<ComplexForm />)));
    expect(container).toMatchSnapshot();
  });

  it(
    'should fill out all sections and submit the form successfully',
    { timeout: 30000 },
    async () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const { getByRole } = render(withProviders(<ComplexForm />));

      const makeSelect = getByRole('combobox', { name: t.vehicleData.make }) as HTMLSelectElement;
      fireEvent.change(makeSelect, { target: { value: '13' } });
      
      // Give React Query time to trigger the fetch
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Wait for the model select to populate with options
      await waitFor(
        async () => {
          const modelSelect = getByRole('combobox', { name: t.vehicleData.model }) as HTMLSelectElement;
          console.log('Model select options:', modelSelect.options.length);
          expect(modelSelect.options.length).toBeGreaterThan(1);
        },
        { timeout: 5000 }
      );

      const modelSelect = getByRole('combobox', { name: t.vehicleData.model }) as HTMLSelectElement;
      fireEvent.change(modelSelect, { target: { value: '13-model-1' } });

      const modelVersionInput = getByRole('textbox', {
        name: t.vehicleData.modelVersion,
      }) as HTMLInputElement;
      fireEvent.change(modelVersionInput, { target: { value: 'Test Version 1.0' } });

      const bodyTypeSelect = getByRole('combobox', {
        name: t.characteristics.bodyType,
      }) as HTMLSelectElement;
      fireEvent.change(bodyTypeSelect, { target: { value: [...bodyTypeSelect.options][1].value } });

      const offerTypeSelect = getByRole('combobox', {
        name: t.condition.vehicleOfferType,
      }) as HTMLSelectElement;
      fireEvent.change(offerTypeSelect, {
        target: { value: [...offerTypeSelect.options][1].value },
      });

      const mileageInput = getByRole('spinbutton', {
        name: t.condition.mileage,
      }) as HTMLInputElement;
      fireEvent.change(mileageInput, { target: { value: '50000' } });

      const firstRegMonthSelect = getByRole('combobox', {
        name: t.condition.firstRegistrationMonth,
      }) as HTMLSelectElement;
      fireEvent.change(firstRegMonthSelect, {
        target: { value: [...firstRegMonthSelect.options][1].value },
      });

      const firstRegYearSelect = getByRole('combobox', {
        name: t.condition.firstRegistrationYear,
      }) as HTMLSelectElement;
      fireEvent.change(firstRegYearSelect, {
        target: { value: [...firstRegYearSelect.options][1].value },
      });

      const ownersInput = getByRole('spinbutton', { name: t.condition.owners }) as HTMLInputElement;
      fireEvent.change(ownersInput, { target: { value: '2' } });

      const nextInspMonthSelect = getByRole('combobox', {
        name: t.condition.nextInspectionMonth,
      }) as HTMLSelectElement;
      fireEvent.change(nextInspMonthSelect, {
        target: { value: [...nextInspMonthSelect.options][1].value },
      });

      const nextInspYearSelect = getByRole('combobox', {
        name: t.condition.nextInspectionYear,
      }) as HTMLSelectElement;
      fireEvent.change(nextInspYearSelect, {
        target: { value: [...nextInspYearSelect.options][1].value },
      });

      const lastTechMonthSelect = getByRole('combobox', {
        name: t.condition.lastTechnicalServiceMonth,
      }) as HTMLSelectElement;
      fireEvent.change(lastTechMonthSelect, {
        target: { value: [...lastTechMonthSelect.options][1].value },
      });

      const lastTechYearSelect = getByRole('combobox', {
        name: t.condition.lastTechnicalServiceYear,
      }) as HTMLSelectElement;
      fireEvent.change(lastTechYearSelect, {
        target: { value: [...lastTechYearSelect.options][1].value },
      });

      const lastCamMonthSelect = getByRole('combobox', {
        name: t.condition.lastCamBeltServiceMonth,
      }) as HTMLSelectElement;
      fireEvent.change(lastCamMonthSelect, {
        target: { value: [...lastCamMonthSelect.options][1].value },
      });

      const lastCamYearSelect = getByRole('combobox', {
        name: t.condition.lastCamBeltServiceYear,
      }) as HTMLSelectElement;
      fireEvent.change(lastCamYearSelect, {
        target: { value: [...lastCamYearSelect.options][1].value },
      });

      const damagedVehicleSelect = getByRole('combobox', {
        name: t.condition.damagedVehicle,
      }) as HTMLSelectElement;
      fireEvent.change(damagedVehicleSelect, { target: { value: 'true' } });

      const accidentVehicleSelect = getByRole('combobox', {
        name: t.condition.accidentVehicle,
      }) as HTMLSelectElement;
      fireEvent.change(accidentVehicleSelect, { target: { value: 'true' } });

      const roadWorthinessSelect = getByRole('combobox', {
        name: t.condition.roadWorthiness,
      }) as HTMLSelectElement;
      fireEvent.change(roadWorthinessSelect, { target: { value: 'true' } });

      const driveTypeSelect = getByRole('combobox', {
        name: t.motor.driveType,
      }) as HTMLSelectElement;
      fireEvent.change(driveTypeSelect, {
        target: { value: [...driveTypeSelect.options][1].value },
      });

      const transmissionSelect = getByRole('combobox', {
        name: t.motor.transmission,
      }) as HTMLSelectElement;
      fireEvent.change(transmissionSelect, {
        target: { value: [...transmissionSelect.options][1].value },
      });

      const powerKWInput = getByRole('spinbutton', { name: t.motor.powerKW }) as HTMLInputElement;
      fireEvent.change(powerKWInput, { target: { value: '110' } });

      const powerHPInput = getByRole('spinbutton', { name: t.motor.powerHP }) as HTMLInputElement;
      fireEvent.change(powerHPInput, { target: { value: '150' } });

      const emptyWeightInput = getByRole('spinbutton', {
        name: t.motor.emptyWeight,
      }) as HTMLInputElement;
      fireEvent.change(emptyWeightInput, { target: { value: '1500' } });

      const fuelCategorySelect = getByRole('combobox', {
        name: t.fuel.fuelCategory,
      }) as HTMLSelectElement;
      fireEvent.change(fuelCategorySelect, {
        target: { value: [...fuelCategorySelect.options][1].value },
      });

      const nedcRadio = getByRole('radio', { name: t.fuel.environmentalProtocolOptions.nedc });
      fireEvent.click(nedcRadio);

      const consumptionInput = getByRole('spinbutton', {
        name: t.fuel.consumptionCombined,
      }) as HTMLInputElement;
      fireEvent.change(consumptionInput, { target: { value: '6.5' } });

      const pollutionClassSelect = getByRole('combobox', {
        name: t.fuel.pollutionClassLabel,
      }) as HTMLSelectElement;
      fireEvent.change(pollutionClassSelect, {
        target: { value: [...pollutionClassSelect.options][1].value },
      });

      const descriptionInput = getByRole('textbox', {
        name: t.description.description,
      }) as HTMLInputElement;
      fireEvent.change(descriptionInput, {
        target: { value: 'This is a test vehicle description.' },
      });

      const priceInput = getByRole('spinbutton', {
        name: t.financingOffer.price,
      }) as HTMLInputElement;
      fireEvent.change(priceInput, { target: { value: '25000' } });

      const durationInput = getByRole('spinbutton', {
        name: t.financingOffer.duration,
      }) as HTMLInputElement;
      fireEvent.change(durationInput, { target: { value: '60' } });

      const monthlyRateInput = getByRole('spinbutton', {
        name: t.financingOffer.monthlyRate,
      }) as HTMLInputElement;
      fireEvent.change(monthlyRateInput, { target: { value: '450' } });

      const annualRateInput = getByRole('spinbutton', {
        name: t.financingOffer.annualPercentageRate,
      }) as HTMLInputElement;
      fireEvent.change(annualRateInput, { target: { value: '3.9' } });

      const initialPaymentInput = getByRole('spinbutton', {
        name: t.financingOffer.initialPayment,
      }) as HTMLInputElement;
      fireEvent.change(initialPaymentInput, { target: { value: '5000' } });

      const endingRateInput = getByRole('spinbutton', {
        name: t.financingOffer.endingRate,
      }) as HTMLInputElement;
      fireEvent.change(endingRateInput, { target: { value: '10000' } });

      const postalCodeInput = getByRole('textbox', {
        name: t.contactInformation.postalCode,
      }) as HTMLInputElement;
      fireEvent.change(postalCodeInput, { target: { value: '12345' } });

      const cityInput = getByRole('textbox', {
        name: t.contactInformation.city,
      }) as HTMLInputElement;
      fireEvent.change(cityInput, { target: { value: 'Test City' } });

      const phoneCountryCodeSelect = getByRole('combobox', {
        name: t.contactInformation.phoneCountryCode,
      }) as HTMLSelectElement;
      fireEvent.change(phoneCountryCodeSelect, {
        target: { value: [...phoneCountryCodeSelect.options][1].value },
      });

      const phoneAreaCodeInput = getByRole('textbox', {
        name: t.contactInformation.phoneAreaCode,
      }) as HTMLInputElement;
      fireEvent.change(phoneAreaCodeInput, { target: { value: '123' } });

      const phoneSubscriberInput = getByRole('textbox', {
        name: t.contactInformation.phoneSubscriberNumber,
      }) as HTMLInputElement;
      fireEvent.change(phoneSubscriberInput, { target: { value: '4567890' } });

      const submitButton = getByRole('button', { name: t.submit });
      fireEvent.click(submitButton);

      await new Promise(resolve => setTimeout(resolve, 500));

      const alerts = document.querySelectorAll('[role="alert"]');
      console.log(`Found ${alerts.length} validation errors`);
      alerts.forEach((alert, i) => {
        const fieldContainer = alert.closest('[data-part="root"]');
        const label = fieldContainer?.querySelector('label');
        console.log(`Error ${i + 1} - Field: ${label?.textContent || 'unknown'}, Message: ${alert.textContent}`);
      });

      await waitFor(
        () => {
          expect(consoleLogSpy).toHaveBeenCalled();
        },
        { timeout: 5000 }
      );

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          vehicleData: expect.objectContaining({
            modelVersion: 'Test Version 1.0',
          }),
          condition: expect.objectContaining({
            mileage: 50000,
            owners: 2,
          }),
          description: expect.objectContaining({
            description: 'This is a test vehicle description.',
          }),
        })
      );

      consoleLogSpy.mockRestore();
    }
  );
});
