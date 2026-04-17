import { ReactNode } from 'react';

type Variant = 'solid' | 'outline';

type Props = {
  children: ReactNode;
  variant?: Variant;
  rotated?: boolean;
  withDot?: boolean;
  className?: string;
};

export default function SectionStamp({
  children,
  variant = 'solid',
  rotated = false,
  withDot = false,
  className = '',
}: Props) {
  const cls = [
    'stamp',
    variant === 'outline' ? 'stamp--outline' : '',
    rotated ? 'stamp--rotated' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls}>
      {withDot && <span className="stamp__dot" aria-hidden />}
      {children}
    </span>
  );
}
