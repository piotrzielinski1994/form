import { models } from '@/components/ComplexForm/constants';

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
