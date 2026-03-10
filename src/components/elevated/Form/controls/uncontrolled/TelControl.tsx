import { BaseInputControl, InputControlProps } from './baseInputControl';

export function TelControl(props: InputControlProps) {
  return <BaseInputControl {...props} type="tel" />;
}
