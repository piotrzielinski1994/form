import { fuelCategoryOptions } from '@/components/ComplexForm/constants';

const primaryFuelTypes = Object.fromEntries(
  fuelCategoryOptions.map((category) => [
    category.value,
    [
      { value: `${category.value}-gasoline`, label: `${category.label} | Gasoline` },
      { value: `${category.value}-diesel`, label: `${category.label} | Diesel` },
      { value: `${category.value}-electric`, label: `${category.label} | Electric` },
    ],
  ])
);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ fuelCategoryId: string }> }
) {
  const { fuelCategoryId } = await params;

  if (!fuelCategoryId || !primaryFuelTypes[fuelCategoryId]) {
    return new Response(
      JSON.stringify({ errors: { _default: 'Fuel category not found or invalid' } }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(JSON.stringify({ primaryFuelTypes: primaryFuelTypes[fuelCategoryId] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export { primaryFuelTypes };
