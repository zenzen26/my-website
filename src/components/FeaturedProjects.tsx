import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import type { Project } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop animation
      gsap.fromTo('.project-card-desktop',
        { rotation: -3, y: 60, opacity: 0 },
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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  const colorClasses = {
    green: 'bg-green',
    amber: 'bg-amber',
    red: 'bg-red',
    black: 'bg-black',
  };

  const typeColorClasses = {
    'AI': 'bg-amber',
    'Web': 'bg-green',
    'Data': 'bg-red',
  };

  return (
    <>
      {/* Desktop: Grid Layout */}
      <div ref={sectionRef} className="hidden md:grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="project-card-desktop taped-card group cursor-pointer"
            style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
          >
            {/* Image Container - Using background-image for perfect cover */}
            <div className="relative overflow-hidden bg-amber mb-4 h-48 sm:h-56 mx-4 mt-8">
              {project.image_url ? (
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image_url})` }}
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber to-[#FF8800]" />
                  <div className="absolute inset-0 flex items-center justify-center text-black/20 font-permanent-marker text-4xl">
                    IMG
                  </div>
                </>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <span className="text-white b1 flex items-center gap-2">
                  View Details <ArrowUpRight size={20} />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2 px-4 pb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`${typeColorClasses[project.type as keyof typeof typeColorClasses] || 'bg-black'} b3 px-2 py-1 text-white`}>
                  {project.type}
                </span>
                <span className="b3 px-2 py-1 bg-white text-black border border-black">
                  {project.category}
                </span>
                <span className="b3 text-black/50">{project.date}</span>
              </div>
              
              <h3 className="h4 group-hover:text-amber transition-colors line-clamp-2">
                {project.title}
              </h3>
              
              <p className="b2 text-black/70 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-2">
                {project.tech_stack.split(',').slice(0, 4).map((tech) => (
                  <span 
                    key={tech} 
                    className="b3 px-2 py-0.5 border border-black/20 hover:bg-amber hover:border-amber transition-colors"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Sticky Stack Layout */}
      <div className="md:hidden relative" style={{ height: `${projects.length * 350 + 200}px` }}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="stack-card taped-card group cursor-pointer absolute w-full"
            style={{ 
              top: `${100 + index * 30}px`,
              zIndex: index + 1,
              transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`
            }}
          >
            {/* Mobile Image Container - Using background-image */}
            <div className="relative overflow-hidden bg-amber mb-4 h-40 mx-4 mt-8">
              {project.image_url ? (
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${project.image_url})` }}
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber to-[#FF8800]" />
                  <div className="absolute inset-0 flex items-center justify-center text-black/20 font-permanent-marker text-3xl">
                    IMG
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2 px-4 pb-6">
              <div className="flex items-center gap-2">
                <span className={`${typeColorClasses[project.type as keyof typeof typeColorClasses] || 'bg-black'} b3 px-2 py-1 text-white`}>
                  {project.type}
                </span>
                <span className="b3 px-2 py-1 bg-white text-black border border-black">
                  {project.category}
                </span>
                <span className="b3 text-black/50">{project.date}</span>
              </div>
              
              <h3 className="h4 line-clamp-2">
                {project.title}
              </h3>
              
              <p className="b2 text-black/70 line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative taped-card"
            onClick={(e) => e.stopPropagation()}
            style={{ transform: 'rotate(0deg)' }}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-amber transition-colors z-10 border-2 border-black"
            >
              <X size={24} />
            </button>

            {/* Header - Dotted colored background, no thumbnail */}
            <div className={`${colorClasses[selectedProject.color_tag as keyof typeof colorClasses] || 'bg-amber'} h-48 sm:h-64 relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white_2px,transparent_2px)] bg-[length:24px_24px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="h2 text-white text-center px-4 drop-shadow-lg">{selectedProject.title}</h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-6 font-share-tech text-sm">
                <span className={`flex items-center gap-1 px-3 py-1 text-white ${typeColorClasses[selectedProject.type as keyof typeof typeColorClasses] || 'bg-black'}`}>
                  <Tag size={16} /> {selectedProject.type}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-white text-black border border-black">
                  {selectedProject.category}
                </span>
                <span className="flex items-center gap-1 text-black/60">
                  <Calendar size={16} /> {selectedProject.date}
                </span>
              </div>

              <p className="b1 text-black/80 leading-relaxed mb-8">
                {selectedProject.detail_description || selectedProject.description}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 space-y-6">
                  {selectedProject.challenges && (
                    <div>
                      <h3 className="h4 mb-3 text-red">Challenges</h3>
                      <p className="b1 text-black/70">{selectedProject.challenges}</p>
                    </div>
                  )}

                  {selectedProject.solution && (
                    <div>
                      <h3 className="h4 mb-3 text-green">Solution</h3>
                      <p className="b1 text-black/70">{selectedProject.solution}</p>
                    </div>
                  )}

                  {selectedProject.outcome && (
                    <div>
                      <h3 className="h4 mb-3 text-amber">Outcome</h3>
                      <p className="b1 text-black/70">{selectedProject.outcome}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="border-2 border-black p-4">
                    <h3 className="h4 mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.split(',').map((tech) => (
                        <span key={tech} className="b2 px-3 py-1 bg-black/5 border border-black/10">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {selectedProject.live_url && (
                      <a 
                        href={selectedProject.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green text-white b2 hover:bg-black transition-colors"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                    {selectedProject.github_url && (
                      <a 
                        href={selectedProject.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white b2 hover:bg-amber hover:text-black transition-colors"
                      >
                        <Github size={18} /> View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}