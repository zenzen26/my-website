/**
 * ProjectModal.tsx
 * Full detail view for a single project.
 * Previously duplicated (almost identically) in Projects.tsx and FeaturedProjects.tsx.
 *
 * Usage:
 *   {selectedProject && (
 *     <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
 *   )}
 */

import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import ModalOverlay from '@/components/ui/ModalOverlay';
import TechStack from '@/components/ui/TechStack';
import TypeBadge from '@/components/ui/TypeBadge';
import { bgColorMap } from '@/lib/Colormaps';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const headerBg = bgColorMap[project.color_tag] ?? 'bg-amber';

  return (
    <ModalOverlay onClose={onClose}>
      {/* Coloured dotted header */}
      <div className={`${headerBg} h-64 sm:h-80 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white_2px,transparent_2px)] bg-[length:24px_24px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="h2 text-white text-center px-4 drop-shadow-lg">{project.title}</h2>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-12">
        {/* Meta row */}
        <div className="flex flex-wrap gap-4 mb-8 font-share-tech text-sm">
          <TypeBadge type={project.type} withIcon={<Tag size={16} />} />
          <span className="flex items-center gap-1 px-3 py-1 bg-white text-black border border-black">
            {project.category}
          </span>
          <span className="flex items-center gap-1 text-black/60">
            <Calendar size={16} /> {project.date}
          </span>
        </div>

        <p className="b1 text-black/80 leading-relaxed mb-8">
          {project.detail_description || project.description}
        </p>

        {/* Details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {project.challenges && (
              <div>
                <h3 className="h4 mb-3 text-red">Challenges</h3>
                <p className="b1 text-black/70">{project.challenges}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <h3 className="h4 mb-3 text-green">Solution</h3>
                <p className="b1 text-black/70">{project.solution}</p>
              </div>
            )}
            {project.outcome && (
              <div>
                <h3 className="h4 mb-3 text-amber">Outcome</h3>
                <p className="b1 text-black/70">{project.outcome}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="border-2 border-black p-6">
              <h3 className="h4 mb-4">Tech Stack</h3>
              <TechStack stack={project.tech_stack} variant="subtle" />
            </div>

            <div className="flex flex-col gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green text-white b2 hover:bg-black transition-colors"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
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
    </ModalOverlay>
  );
}
