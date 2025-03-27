import type { WithPlaceholder, WithLabel, WithValue } from './_Common';

export type InputType = "text" | "file" | "checkbox" | "submit" | "email";

export type InputField<T = string> =
  WithPlaceholder & WithValue<T> & WithLabel & {
    inputType: InputType;
    fileID?: string;
  };

export type InputFieldInner<T = string> = InputField<T> & {
  onChange?: (e: Event) => void;
};
