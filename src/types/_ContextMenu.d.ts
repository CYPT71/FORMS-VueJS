import type { HasOptions } from './_Common';

export type ContextListProps = HasOptions<string>;
export type ContextListEmits = {
  (e: 'select', value: string): void;
};
