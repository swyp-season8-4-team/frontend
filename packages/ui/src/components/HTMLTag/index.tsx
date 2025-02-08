import { type JSX } from 'react';
import type { WithChildren, WithRef } from '../../..';

type Tags = keyof Pick<
  JSX.IntrinsicElements,
  'div' | 'section' | 'details' | 'span'
>;

interface Props extends WithChildren, WithRef<HTMLElement> {
  as?: Tags;
}

// FIXME: any 말고 가능한거 있을까 잘안됨
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HTMLTag({ as = 'div', ref, ...props }: Props & any) {
  const HTMLTag = `${as}` as Tags;

  return <HTMLTag ref={ref} {...props} />;
}
