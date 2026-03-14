import styles from './page.module.css';
import { Test } from '@/components/test/Test';

export default function HomePage() {
  return (
    <main>
      <section className={`${styles.hero} grid items-center`}>
        <Test />
      </section>
    </main>
  );
}
