import { useFormRegistryCount } from '../context/formRegistryContext';
import { useAutofillReconciliation } from './useAutofillReconciliation';

type AutofillManagerProps = {
  formRootRef: React.RefObject<HTMLFormElement | null>;
  messageFieldName?: string;
  autoFocusMessage?: boolean;
};

export function AutofillManager({ formRootRef, messageFieldName, autoFocusMessage = false }: AutofillManagerProps) {
  const uncontrolledControlCount = useFormRegistryCount();

  useAutofillReconciliation({
    formRootRef,
    messageFieldName,
    autoFocusMessage,
    enabled: uncontrolledControlCount > 0
  });

  return null;
}
