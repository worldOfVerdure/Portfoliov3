import { Button } from '@/components/primitives/Button';
import { CustomStackContent } from '../reuseables/';
import { SectionHeading } from '@/components/test/reuseables/';
import styles from './styles/customButtons.module.css';

export const CustomButtons = () => {
  return (
    <>
      <SectionHeading>Buttons</SectionHeading>
      <CustomStackContent>
        <Button className={styles.actionsContent} size="sm" type="button" >Primary</Button>
        <Button
          className={styles.actionsContent}
          size="md"
          type="button"
          variant="secondary"
        >
          Secondary
        </Button>
        <Button
          className={styles.actionsContent}
          size="md"
          type="button"
          variant="ghost"
          vars={{ '--btn-border': 'var(--color-primary)', '--btn-color': 'var(--color-primary)' }}
        >
          Token override
        </Button>
      </CustomStackContent>
    </>
  );
}
