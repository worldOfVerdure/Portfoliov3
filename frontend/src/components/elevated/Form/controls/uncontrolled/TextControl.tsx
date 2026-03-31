import { BaseInputControl, InputControlProps } from './BaseInputControl';

export function TextControl(props: InputControlProps) {
  return <BaseInputControl {...props} type="text" />;
}
