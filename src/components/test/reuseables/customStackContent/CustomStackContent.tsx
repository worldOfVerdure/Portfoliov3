import { Stack } from '@/components/primitives/Stack/Stack';
import styles from './styles/customStackContent.module.css';

export const CustomStackContent = ({children}: {children: React.ReactNode}) => {
  return (
    <Stack as="article" className={styles.actions} direction="row" gap="var(--space-3)" wrap="wrap" >
      {children}
    </Stack>
  );
}
