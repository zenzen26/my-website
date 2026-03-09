import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { name: 'HealthTech', color: 'green', tagline: 'Impact through data' },
  { name: 'EdTech', color: 'amber', tagline: 'Learning should be beautiful' },
  { name: 'Creative Tools', color: 'red', tagline: 'Building for makers' },
  { name: 'FinTech', color: 'green', tagline: 'Complex made simple' },
  { name: 'Data Viz', color: 'black', tagline: 'Making sense of complexity' },
];

const skills = {
  Frontend: { color: 'green', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  'Data & Viz': { color: 'amber', items: ['Python', 'Tableau', 'D3.js', 'Pandas', 'SQL'] },
  'AI/ML': { color: 'black', items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'NLP'] },
  'Tools': { color: 'red', items: ['Git', 'Figma', 'Docker', 'AWS', 'Vercel'] },
};

export default function IndustriesTech() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.industry-card',
        { y: 50, opacity: 0, rotation: () => Math.random() * 10 - 5 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo('.skill-category',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15,
          scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const colorMap = {
    green: 'bg-[#519A66] text-white',
    amber: 'bg-[#FFAA00] text-black',
    red: 'bg-[#DA3D20] text-white',
    black: 'bg-black text-white',
  };

  return (
    <section id="industries" ref={sectionRef} className="py-20 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24">
        
        <div className="mb-20">
          <h2 className="h2 text-center mb-12">
            Target <span className="text-[#FFAA00]">Industries</span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className={`industry-card ${colorMap[industry.color as keyof typeof colorMap]} p-6 text-center border-2 border-black transform transition-all duration-300 hover:-translate-y-2 hover:rotate-2 hover:shadow-lg cursor-default`}
              >
                <h3 className="h4 mb-2">{industry.name}</h3>
                <p className="b3 opacity-80">{industry.tagline}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="h2 text-center mb-12">
            Tech <span className="text-[#519A66]">Arsenal</span>
          </h2>
          
          <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, data]) => {
              const borderColor = { green: 'border-[#519A66]', amber: 'border-[#FFAA00]', red: 'border-[#DA3D20]', black: 'border-black' };
              return (
                <div 
                  key={category} 
                  className={`skill-category ${borderColor[data.color as keyof typeof borderColor]} border-2 p-6 bg-gray-50`}
                >
                  <h3 className="h4 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.items.map((skill) => (
                      <span 
                        key={skill}
                        className="b3 px-3 py-1 bg-white border border-black/20 hover:bg-[#FFAA00] hover:border-[#FFAA00] transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}