export function LabelError({ error }: { error: string }) {
  return (
    <div className="flex items-center">
      <span className="text-xs text-red-base">{error}</span>
    </div>
  );
}