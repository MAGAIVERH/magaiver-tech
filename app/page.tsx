import dynamic from 'next/dynamic';
import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';

const TechMarquee = dynamic(
  () =>
    import('@/components/sections/tech-marquee').then((m) => ({
      default: m.TechMarquee,
    })),
  { loading: () => <div className='min-h-[12vh]' aria-hidden /> },
);

const Stats = dynamic(
  () =>
    import('@/components/sections/stats').then((m) => ({ default: m.Stats })),
  { loading: () => <div className='min-h-[30vh]' aria-hidden /> },
);

const Intro = dynamic(
  () => import('@/components/sections/intro').then((m) => ({ default: m.Intro })),
  { loading: () => <div className='min-h-[40vh]' aria-hidden /> },
);

const Featured = dynamic(
  () =>
    import('@/components/sections/featured').then((m) => ({
      default: m.Featured,
    })),
  { loading: () => <div className='min-h-[50vh]' aria-hidden /> },
);

const Projects = dynamic(
  () =>
    import('@/components/sections/projects').then((m) => ({
      default: m.Projects,
    })),
  { loading: () => <div className='min-h-[60vh]' aria-hidden /> },
);

const Expertise = dynamic(
  () =>
    import('@/components/sections/expertise').then((m) => ({
      default: m.Expertise,
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
      <TechMarquee />
      <Stats />
      <Intro />
      <Featured />
      <Projects />
      <Expertise />
      <Contact />
    </main>
  );
}
