import { BaseInputControl, InputControlProps } from './baseInputControl';

export function TextControl(props: InputControlProps) {
  return <BaseInputControl {...props} type="text" />;
}
