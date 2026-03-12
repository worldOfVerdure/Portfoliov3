import { BaseInputControl, InputControlProps } from './BaseInputControl';

export function EmailControl(props: InputControlProps) {
  return <BaseInputControl {...props} type="email" />;
}
