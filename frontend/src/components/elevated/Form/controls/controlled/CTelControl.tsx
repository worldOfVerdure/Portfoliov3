import { CBaseInputControl, CInputControlProps } from './CBaseInputControl';

export function CTelControl(props: CInputControlProps) {
  return <CBaseInputControl {...props} type="tel" />;
}
