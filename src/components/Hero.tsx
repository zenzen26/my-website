import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { ArrowDown } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

const FallbackCrystal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let rotation = 0;
    let animationId: number;
    let isActive = true;
    
    const draw = () => {
      if (!isActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);
      
      ctx.beginPath();
      ctx.moveTo(0, -100);
      ctx.lineTo(87, -50);
      ctx.lineTo(87, 50);
      ctx.lineTo(0, 100);
      ctx.lineTo(-87, 50);
      ctx.lineTo(-87, -50);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(-87, -100, 87, 100);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.5, '#FFAA00');
      gradient.addColorStop(1, '#519A66');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#FFAA00';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.restore();
      rotation += 0.005;
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => { isActive = false; cancelAnimationFrame(animationId); };
  }, []);
  
  return <canvas ref={canvasRef} width={400} height={400} className="w-full h-full max-w-[400px] max-h-[400px]" />;
};

const SplineCrystal = ({ onError }: { onError: () => void }) => (
  <Spline 
    scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
    onError={onError}
    className="w-full h-full"
  />
);

export default function Hero() {
  const [splineError, setSplineError] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      @keyframes pulse { 0%, 100% { transform: scale(1) rotate(-6deg); } 50% { transform: scale(1.05) rotate(-6deg); } }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      .animate-float { animation: float 4s ease-in-out infinite; }
      .animate-pulse-rotate { animation: pulse 2s ease-in-out infinite; }
      .animate-bounce-slow { animation: bounce 1.5s ease-in-out infinite; }
    `;
    document.head.appendChild(style);

    if (contentRef.current) {
      const children = contentRef.current.children;
      Array.from(children).forEach((child, index) => {
        (child as HTMLElement).style.opacity = '0';
        (child as HTMLElement).style.transform = 'translateY(20px)';
        (child as HTMLElement).style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        setTimeout(() => {
          (child as HTMLElement).style.opacity = '1';
          (child as HTMLElement).style.transform = 'translateY(0)';
        }, 100);
      });
    }

    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <section className="min-h-screen pt-20 lg:pt-0 flex items-center bg-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-5rem)] lg:min-h-screen">
          
          <div className="lg:col-span-7 xl:col-span-6 relative order-2 lg:order-1">
            <div className="animate-float relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] flex items-center justify-center">
              <div className="spline-container absolute inset-0 lg:-left-12 xl:-left-24 flex items-center justify-center">
                {!splineError ? (
                  <Suspense fallback={<FallbackCrystal />}>
                    <SplineCrystal onError={() => setSplineError(true)} />
                  </Suspense>
                ) : (
                  <FallbackCrystal />
                )}
              </div>
              <div className="absolute top-10 right-10 w-20 h-20 bg-[#FFAA00]/20 rounded-full blur-xl animate-pulse pointer-events-none" />
              <div className="absolute bottom-20 left-10 w-16 h-16 bg-[#519A66]/20 rounded-full blur-xl animate-pulse delay-700 pointer-events-none" />
            </div>
          </div>

          <div ref={contentRef} className="lg:col-span-5 xl:col-span-6 order-1 lg:order-2 hero-content">
            <div className="inline-block mb-6 animate-pulse-rotate">
              <div className="bg-[#519A66] text-white b2 px-4 py-2 border-4 border-[#519A66] border-dashed">
                OPEN TO WORK
              </div>
            </div>

            <h1 className="h1 leading-none mb-4 text-shadow-retro">
              ZEN<span className="text-[#FFAA00]">ZEN</span>
            </h1>

            <p className="b1 text-[#FFAA00] mb-6">
              Full Stack Developer & Data Alchemist
            </p>

            <p className="b1 text-black/80 max-w-md mb-8 leading-relaxed">
              Building digital experiences that bridge creative design and technical precision. 
              Specializing in React ecosystems and data visualization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-[#519A66] text-white b2 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <span className="relative z-10">View Work</span>
                <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-[#FFAA00] text-black b2 hover:bg-[#FFAA00] hover:text-black transition-all hover:-translate-y-1"
              >
                Contact Me
              </button>
            </div>

            <div className="flex flex-wrap gap-2 b3">
              {['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-black/5 border border-black/10 hover:bg-[#FFAA00]/20 hover:border-[#FFAA00] transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}