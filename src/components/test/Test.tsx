import { Header } from '@/components/test/header';
import { CustomButtons } from '@/components/test/customButtons';
import { CustomLinks } from '@/components/test/customLinks';
import { TestForm } from '@/components/test/testForm';
import { ControlledForm } from '@/components/test/controlledForm';

export const Test = () => {
  return (
    <>
      <Header />
      <CustomButtons />
      <CustomLinks />
      <TestForm />
      <ControlledForm />
    </>
  );
}
