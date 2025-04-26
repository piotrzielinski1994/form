import { makes } from '@/components/ComplexForm/constants';

export const models = Object.fromEntries(
  makes.map((make) => [
    make.value,
    [
      { value: `${make.value}-model-1`, label: `${make.label} | Model 1` },
      { value: `${make.value}-model-2`, label: `${make.label} | Model 2` },
    ],
  ])
);

export async function GET(req: Request, { params }: { params: Promise<{ makeId: string }> }) {
  const { makeId } = await params;

  if (!makeId || !models[makeId]) {
    return new Response(JSON.stringify({ errors: { _default: 'Make not found or invalid' } }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ models: models[makeId] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
