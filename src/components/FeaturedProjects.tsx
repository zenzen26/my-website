import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card-desktop',
        { rotation: -3, y: 60, opacity: 0 },
        {
          rotation: 0, y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <>
      {/* Desktop: Grid */}
      <div ref={sectionRef} className="hidden md:grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={project.id} className="relative group">
            <ProjectCard
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
              imageHeight="h-48 sm:h-56"
              techLimit={4}
              className="project-card-desktop"
            />
            {/* Hover overlay on image — layered on top via absolute child in card */}
            {/* Note: if you need the "View Details" overlay, add it inside ProjectCard
                via an optional prop, or wrap the card here with a portal overlay. */}
          </div>
        ))}
      </div>

      {/* Mobile: Sticky Stack */}
      <div className="md:hidden relative" style={{ height: `${projects.length * 350 + 200}px` }}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="absolute w-full"
            style={{ top: `${100 + index * 30}px`, zIndex: index + 1 }}
          >
            <ProjectCard
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
              imageHeight="h-40"
              techLimit={3}
              className="stack-card"
            />
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}