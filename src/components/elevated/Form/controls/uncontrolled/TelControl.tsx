import { BaseInputControl, InputControlProps } from './BaseInputControl';

export function TelControl(props: InputControlProps) {
  return <BaseInputControl {...props} type="tel" />;
}
