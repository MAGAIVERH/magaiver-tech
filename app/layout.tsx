import { SmoothScroll } from '@/components/interactive/smooth-scroll';
import './globals.css';
import { ThemeProvider } from '@/components/common/theme-provider';
import { Cursor } from '@/components/interactive/cursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='relative'>
        <SmoothScroll />
        <Cursor />
        <ThemeProvider>
          <div className='relative z-10'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
