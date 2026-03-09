import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { rotation: -4, y: 60, opacity: 0 },
        {
          rotation: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const colorClasses = {
    green: 'bg-[#519A66]',
    amber: 'bg-[#FFAA00]',
    red: 'bg-[#DA3D20]',
    black: 'bg-black',
  };

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          className="project-card group relative bg-white border-2 border-black p-4 tape-edge transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] block"
          style={{ transform: `rotate(${Math.random() * 3 - 1.5}deg)` }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden bg-[#FFAA00] mb-4 h-48 sm:h-56">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFAA00] to-[#FF8800]" />
            <div className="absolute inset-0 flex items-center justify-center text-black/20 font-permanent-marker text-4xl">
              IMG
            </div>
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <span className="text-white b1 flex items-center gap-2">
                View Details <ArrowUpRight size={20} />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`${colorClasses[project.color_tag]} b3 px-2 py-1 text-white`}>
                {project.category}
              </span>
              <span className="b3 text-black/50">{project.date}</span>
            </div>
            
            <h3 className="h4 group-hover:text-[#FFAA00] transition-colors line-clamp-2">
              {project.title}
            </h3>
            
            <p className="b2 text-black/70 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1 pt-2">
              {project.tech_stack.split(',').slice(0, 4).map((tech) => (
                <span 
                  key={tech} 
                  className="b3 px-2 py-0.5 border border-black/20 hover:bg-[#FFAA00] hover:border-[#FFAA00] transition-colors"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}