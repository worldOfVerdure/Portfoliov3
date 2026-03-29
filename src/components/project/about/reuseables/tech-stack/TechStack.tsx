//components
import { Stack } from '@/components/primitives/Stack';
import { Tech } from './techStackReuseables/';
//data and types
import { techStackData, type TechStackData } from './tech-stack-data/techStackData';
//styles
import styles from './styles/techStack.module.css';

export const TechStack = () => {
  return (
    <div className={styles.techStackContainer} >
      <div className={styles.techStack}>
        <Stack className={styles.renderListContainer} direction="row">
          {techStackData.map((techArray: TechStackData[], index: number) => {
            return <Tech key={`col-${index}`} colEntires={techArray} />
          })}
        </Stack>
      </div>
    </div>
  );
}
