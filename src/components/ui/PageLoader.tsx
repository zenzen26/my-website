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
