import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Experience } from '@/types';
import ExperiencePopup from './ExperiencePopup';

gsap.registerPlugin(ScrollTrigger);

interface StickyExperienceProps {
  experiences: Experience[];
  showEndCard?: boolean;
}

export default function StickyExperience({ experiences, showEndCard = true }: StickyExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth + 200;

      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      gsap.fromTo('.ticket-card',
        { y: 100, opacity: 0, rotation: -5 },
        {
          y: 0,
          opacity: 1,
          rotation: -1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [experiences]);

  const colorClasses = {
    green: 'border-l-green',
    amber: 'border-l-amber',
    red: 'border-l-red',
    black: 'border-l-black',
  };

  const badgeClasses = {
    green: 'bg-green',
    amber: 'bg-amber',
    red: 'bg-red',
    black: 'bg-black',
  };

  return (
    <>
      <section 
        ref={sectionRef}
        className="min-h-screen bg-gray-50 overflow-hidden"
      >
        <div className="h-screen flex flex-col justify-center py-20">
          
          {/* Header - Aligned with mx-auto container */}
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24 w-full mb-8">
            <div className="ticket-line mb-8" />
            
            <div className="mb-4">
              <h2 className="h2">
                Work <span className="text-green">Experience</span>
              </h2>
            </div>
            <p className="b1 text-black/60 max-w-xl">
              Scroll horizontally to explore my journey. Click any ticket for details.
            </p>
          </div>

          {/* Horizontal Scrolling Container - Starts at mx-auto */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 will-change-transform pl-4 sm:pl-6 lg:pl-8 xl:pl-12 2xl:pl-16 4xl:pl-24"
            style={{ width: 'max-content' }}
          >
            {/* Left spacer to align with container */}
            <div className="w-0 sm:w-0 lg:w-0 xl:w-0 2xl:w-0 flex-shrink-0" />
            
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExp(exp)}
                className={`ticket-card chef-ticket w-[300px] sm:w-[340px] flex-shrink-0 cursor-pointer group ${colorClasses[exp.color]} border-l-4`}
                style={{ 
                  marginTop: index % 2 === 0 ? '0px' : '30px',
                  transform: `rotate(${-2 + index}deg)`
                }}
              >
                {/* Ticket Content */}
                <div className="p-5 pt-8">
                  {/* Type Badge */}
                  <span className={`${badgeClasses[exp.color]} text-white b3 px-2 py-1 inline-block mb-3`}>
                    {exp.type}
                  </span>

                  {/* Role & Company */}
                  <h3 className="h4 mb-1 group-hover:text-amber transition-colors">
                    {exp.role}
                  </h3>
                  <p className="b1 text-amber mb-3">@ {exp.company}</p>
                  
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-black/50 b2 mb-3">
                    <Calendar size={14} />
                    {exp.duration}
                  </div>
                  
                  {/* Description */}
                  <p className="b2 text-black/70 line-clamp-3 mb-4 border-t border-dashed border-black/20 pt-3">
                    {exp.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1">
                    {exp.tech_stack.split(',').slice(0, 3).map((tech) => (
                      <span key={tech} className="b3 px-2 py-0.5 bg-black/5 border border-black/10">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Click hint */}
                  <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
                    <span className="b3 text-black/40">Click for details</span>
                    <ArrowRight size={16} className="text-amber opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}

            {/* End Card */}
            {showEndCard && (
              <div className="ticket-card chef-ticket w-[280px] flex-shrink-0 flex items-center justify-center bg-amber self-center border-l-4 border-black">
                <div className="text-center p-8">
                  <h3 className="h4 mb-4 text-black">That's all!</h3>
                  <p className="b2 text-black/70 mb-6">Want to see more?</p>
                  <a 
                    href="/about" 
                    className="inline-block px-6 py-3 bg-black text-white b2 hover:bg-white hover:text-black transition-colors border-2 border-black"
                  >
                    View Full Story →
                  </a>
                </div>
              </div>
            )}
            
            {/* Right spacer */}
            <div className="w-4 sm:w-6 lg:w-8 xl:w-12 2xl:w-16 4xl:w-24 flex-shrink-0" />
          </div>

          {/* Bottom Ticket Line - Aligned with container */}
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24 w-full mt-8">
            <div className="ticket-line" />
          </div>
        </div>
      </section>

      <ExperiencePopup 
        experience={selectedExp} 
        onClose={() => setSelectedExp(null)} 
      />
    </>
  );
}