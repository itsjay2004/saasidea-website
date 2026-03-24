'use client';

export default function IdeaError({ error }: { error: Error }) {
  return <div className="mx-auto max-w-3xl p-6 text-danger">Failed to load idea: {error.message}</div>;
}
