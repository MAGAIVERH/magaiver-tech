import dynamic from 'next/dynamic';
import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';

const Intro = dynamic(
  () => import('@/components/sections/intro').then((m) => ({ default: m.Intro })),
  { loading: () => <div className='min-h-[40vh]' aria-hidden /> },
);

const Projects = dynamic(
  () =>
    import('@/components/sections/projects').then((m) => ({
      default: m.Projects,
    })),
  { loading: () => <div className='min-h-[60vh]' aria-hidden /> },
);

const AboutRadial = dynamic(
  () =>
    import('@/components/sections/about-radial').then((m) => ({
      default: m.AboutRadial,
    })),
  { loading: () => <div className='min-h-[50vh]' aria-hidden /> },
);

const Contact = dynamic(
  () =>
    import('@/components/sections/contact').then((m) => ({
      default: m.Contact,
    })),
  { loading: () => <div className='min-h-[40vh]' aria-hidden /> },
);

export default function Home() {
  return (
    <main className='bg-[rgb(var(--background))] text-[rgb(var(--foreground))] min-h-screen overflow-x-clip'>
      <Header />
      <Hero />
      <Intro />
      <Projects />
      <AboutRadial />
      <Contact />
    </main>
  );
}
