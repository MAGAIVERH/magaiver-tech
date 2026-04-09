import { AboutRadial } from '@/components/sections/about-radial';
import { Contact } from '@/components/sections/contact';
import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { Intro } from '@/components/sections/intro';
import { Projects } from '@/components/sections/projects';

export default function Home() {
  return (
    <main className='bg-[rgb(var(--background))] text-[rgb(var(--foreground))] min-h-screen'>
      <Header />
      <Hero />
      <Intro />
      <Projects />
      <AboutRadial />
      <Contact />
    </main>
  );
}
