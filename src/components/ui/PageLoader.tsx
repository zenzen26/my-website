/**
 * PageLoader.tsx
 * Full-screen loading state used on Home, About, and Projects pages.
 * Replaces repeated:
 *   <div className="min-h-screen bg-white flex items-center justify-center pt-20">
 *     <div className="h2 animate-pulse text-amber">Loading...</div>
 *   </div>
 */

interface PageLoaderProps {
  /** Add top padding when nav is visible (default: true) */
  withNavOffset?: boolean;
}

export default function PageLoader({ withNavOffset = true }: PageLoaderProps) {
  return (
    <div className={`min-h-screen bg-white flex items-center justify-center ${withNavOffset ? 'pt-20' : ''}`}>
      <div className="h2 animate-pulse text-amber">Loading...</div>
    </div>
  );
}
