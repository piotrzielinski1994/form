import { z } from 'zod';

type FormFields = z.infer<typeof schema>;

const schema = z
  .object({
    personalDetails: z.object({
      name: z.string().min(1),
      surname: z.string().min(1),
      email: z.string().email(),
      hasAddress: z.boolean(),
    }),
    address: z
      .object({
        street: z.string().min(1),
        city: z.string().min(1),
        zipCode: z.string().min(1),
        country: z.string().min(1),
      })
      .optional(),
    phoneDetails: z.object({
      countryCode: z.string().min(1),
      areaCode: z.string().min(1),
      phoneNumber: z.string().min(1),
    }),
  })
  .refine((data) => (data.personalDetails.hasAddress ? data.address !== undefined : true), {
    message: "Address is required if 'hasAddress' is selected",
    path: ['address'],
  });

const defaultValues: FormFields = {
  personalDetails: {
    name: '',
    surname: '',
    email: '',
    hasAddress: false,
  },
  phoneDetails: {
    countryCode: '',
    areaCode: '',
    phoneNumber: '',
  },
};

export { defaultValues, schema, type FormFields };
