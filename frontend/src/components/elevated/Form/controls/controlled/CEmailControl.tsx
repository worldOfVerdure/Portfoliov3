import { CBaseInputControl, CInputControlProps } from './CBaseInputControl';

export function CEmailControl(props: CInputControlProps) {
  return <CBaseInputControl {...props} type="email" />;
}
