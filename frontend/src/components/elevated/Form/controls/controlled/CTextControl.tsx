import { CBaseInputControl, CInputControlProps } from './CBaseInputControl';

export function CTextControl(props: CInputControlProps) {
  return <CBaseInputControl {...props} type="text" />;
}
