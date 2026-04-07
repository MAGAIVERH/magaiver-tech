import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';

export default function Home() {
  return (
    <main className='bg-[rgb(var(--background))] text-[rgb(var(--foreground))] min-h-screen'>
      <Header />
      <Hero />
      <Projects />
    </main>
  );
}
