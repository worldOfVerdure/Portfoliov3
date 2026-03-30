//components
import { About } from '../components/project/about';
import { Contact } from '../components/project/contact';
import { Hero } from '../components/project/hero';
import { Projects } from '../components/project/projects';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
