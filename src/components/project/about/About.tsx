 //components
import { Stack } from '@/components/primitives/stack';
import { SvgPlusLink } from './reuseables/about-link';
//data
import { codeLinkData, workLinkData } from './reuseables/about-link/';

export const About = () => {
  return (
    <section className="full-width sectionContainer" id="about">
      <span
        aria-hidden="true"
        className="navSectionSentinel"
        data-nav-active="#about"
        data-nav-theme="dark"
        data-nav-sentinel
      />
      <h2 className="sectionH2">About Me</h2>
      <Stack>
        <div>
          <p>I believe in the importance of self-learning, in all phases of life. Web development
            excites me because technology is accessible to anyone with a computer and an internet
            connection. I am thankful that there is always more to learn and learning immediately
            translates to an improved web experience for devleoper and client. When I am away from
            the computer, I like to stay fit, be out in nature and spend time with my affectionate
            cat <span>&#x1F408;</span>.
          </p>
          <Stack>
            <p>Learn more about my web dev experience</p>
            <Stack as="ul" direction="row" ><SvgPlusLink {...codeLinkData} /></Stack>
          </Stack>
        </div>
      </Stack>
    </section>
  );
}
