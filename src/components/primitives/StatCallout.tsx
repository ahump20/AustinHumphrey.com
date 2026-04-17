type Variant = 'burnt' | 'ink' | 'emerald';

type Props = {
  value: string;
  label: string;
  variant?: Variant;
};

export default function StatCallout({ value, label, variant = 'burnt' }: Props) {
  const extra =
    variant === 'ink'
      ? 'stat-callout--ink'
      : variant === 'emerald'
        ? 'stat-callout--emerald'
        : '';
  return (
    <div className={`stat-callout ${extra}`}>
      <span className="stat-callout__value tabular-figs">{value}</span>
      <span className="stat-callout__label">{label}</span>
    </div>
  );
}
