export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl text-forest-900 sm:text-4xl">{title}</h2>
    </div>
  );
}
