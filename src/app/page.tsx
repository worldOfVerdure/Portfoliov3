import { About } from '../components/project/about';
import { Hero } from '../components/project/hero';
import { Projects } from '../components/project/projects';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <About />
      </main>
    </>
  );
}
