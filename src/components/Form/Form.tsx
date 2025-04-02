'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { defaultValues, FormFields, schema } from './schema';
import { TextInput } from './TextInput';

const Form = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });
  const hasAddress = watch('personalDetails.hasAddress');

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <fieldset>
        <legend>Personal Details</legend>
        <TextInput
          id="name"
          label="Name"
          {...register('personalDetails.name')}
          error={errors.personalDetails?.name?.message}
        />
        <TextInput
          id="surname"
          label="Surname"
          {...register('personalDetails.surname')}
          error={errors.personalDetails?.surname?.message}
        />
        <TextInput
          id="email"
          label="Email"
          {...register('personalDetails.email')}
          error={errors.personalDetails?.email?.message}
        />
        <label>
          <input type="checkbox" {...register('personalDetails.hasAddress')} />
          Has Address
        </label>
      </fieldset>

      {hasAddress && (
        <fieldset>
          <legend>Address</legend>
          <TextInput
            id="street"
            label="Street"
            {...register('address.street')}
            error={errors.address?.street?.message}
          />
          <TextInput
            id="city"
            label="City"
            {...register('address.city')}
            error={errors.address?.city?.message}
          />
          <TextInput
            id="zipCode"
            label="Zip Code"
            {...register('address.zipCode')}
            error={errors.address?.zipCode?.message}
          />
          <TextInput
            id="country"
            label="Country"
            {...register('address.country')}
            error={errors.address?.country?.message}
          />
        </fieldset>
      )}

      <fieldset>
        <legend>Phone Details</legend>
        <TextInput
          id="countryCode"
          label="Country Code"
          {...register('phoneDetails.countryCode')}
          error={errors.phoneDetails?.countryCode?.message}
        />
        <TextInput
          id="areaCode"
          label="Area Code"
          {...register('phoneDetails.areaCode')}
          error={errors.phoneDetails?.areaCode?.message}
        />
        <TextInput
          id="phoneNumber"
          label="Phone Number"
          {...register('phoneDetails.phoneNumber')}
          error={errors.phoneDetails?.phoneNumber?.message}
        />
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export { Form };
