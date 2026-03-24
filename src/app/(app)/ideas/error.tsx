'use client';

export default function IdeasError({ error }: { error: Error }) {
  return <div className="mx-auto max-w-7xl p-6 text-danger">Failed to load ideas: {error.message}</div>;
}
