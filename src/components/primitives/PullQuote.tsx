import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  cite?: string;
};

export default function PullQuote({ children, cite }: Props) {
  return (
    <blockquote className="pull-quote-v2">
      <p className="pull-quote-v2__text">{children}</p>
      {cite ? <cite className="pull-quote-v2__cite">{cite}</cite> : null}
    </blockquote>
  );
}
