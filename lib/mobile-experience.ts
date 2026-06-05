export function isMobileExperience(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(pointer: coarse), (hover: none)').matches ||
    window.matchMedia('(max-width: 767px)').matches
  );
}
