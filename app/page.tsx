import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';

export default function Home() {
  return (
    <main className='bg-[rgb(var(--background))] text-[rgb(var(--foreground))] min-h-screen'>
      <Header />
      <Hero />
    </main>
  );
}
