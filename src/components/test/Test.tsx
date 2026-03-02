import { Header } from '@/components/test/header';
import { TestContactForm } from './testContactForm';
import { CustomButtons } from '@/components/test/customButtons';
import { CustomLinks } from '@/components/test/customLinks';

export const Test = () => {
  return (
    <>
      <Header />
      <CustomButtons />
      <CustomLinks />
      <TestContactForm />
    </>
  );
}
