import { useEffect } from 'react';
import { useFormRegistryActions } from '../../context/formRegistryContext';

type UseRegisterUncontrolledControlArgs = {
  name: string;
  isControlled: boolean;
  controlRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
};

export function useRegisterUncontrolledControl({
  name,
  isControlled,
  controlRef
}: UseRegisterUncontrolledControlArgs) {
  const { register, unregister } = useFormRegistryActions();

  useEffect(() => {
    const element = controlRef.current;

    if (!element) {
      return;
    }

    if (!isControlled) {
      register(element, name);

      return () => {
        unregister(element);
      };
    }

    unregister(element);
  }, [controlRef, isControlled, name, register, unregister]);
}
