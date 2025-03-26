export type WithId = { id: string };
export type WithLabel = { label: string };
export type WithValue<T = string> = { value?: T };
export type WithPlaceholder = { placeholder?: string };
export type WithChildren<T = unknown> = { children?: T[] };
export type HasOptions<T = string> = { options: T[] };
export type WithStyle = { style?: Record<string, string> };

