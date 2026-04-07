import { SmoothScroll } from '@/components/interactive/smooth-scroll';
import './globals.css';
import { ThemeProvider } from '@/components/common/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='relative'>
        <SmoothScroll />

        <ThemeProvider>
          <div className='relative z-10'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
