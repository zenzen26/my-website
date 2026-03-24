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
          </div>
        ))}
      </div>

      {/* Mobile: Simple vertical list */}
      <div className="md:hidden flex flex-col gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
            imageHeight="h-40"
            techLimit={3}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}