import { BaseInputControl, InputControlProps } from './baseInputControl';

export function EmailControl(props: InputControlProps) {
  return <BaseInputControl {...props} type="email" />;
}
