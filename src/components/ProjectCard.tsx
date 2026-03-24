import TypeBadge from '@/components/ui/TypeBadge';
import TechStack from '@/components/ui/TechStack';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  imageHeight?: string;
  techLimit?: number;
  className?: string;
}

export default function ProjectCard({
  project,
  index,
  onClick,
  imageHeight = 'h-48',
  techLimit = 3,
  className = '',
}: ProjectCardProps) {
  const rotation = index % 2 === 0 ? -1.5 : 1.5;

  return (
    <div
      onClick={onClick}
      className={`taped-card group cursor-pointer ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-amber mb-4 ${imageHeight} mx-4 mt-8`}>
        {project.image_url ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
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

      {/* Content */}
      <div className="space-y-2 px-4 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={project.type} />
          <span className="b3 px-2 py-1 bg-white text-black border border-black">
            {project.category}
          </span>
          <span className="b3 text-black/50">{project.date}</span>
        </div>

        <h3 className="h4 line-clamp-2 group-hover:text-amber transition-colors">
          {project.title}
        </h3>

        <p className="b2 text-black/70 line-clamp-2">{project.description}</p>

        <TechStack stack={project.tech_stack} limit={techLimit} className="pt-2" />
      </div>
    </div>
  );
}
