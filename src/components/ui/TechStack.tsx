/**
 * TechStack.tsx
 * Renders a comma-separated tech stack string as pill badges.
 * Replaces the repeated pattern across Projects, FeaturedProjects,
 * ExperiencePopup, StickyExperience, and About.
 *
 * Usage:
 *   <TechStack stack={project.tech_stack} />
 *   <TechStack stack={exp.tech_stack} limit={3} variant="bordered" />
 */

interface TechStackProps {
  /** Comma-separated tech string, e.g. "React, TypeScript, Tailwind" */
  stack: string;
  /** Max pills to show before a "+N more" pill. Omit for no limit. */
  limit?: number;
  /** Visual style of each pill */
  variant?: 'subtle' | 'bordered';
  className?: string;
}

export default function TechStack({
  stack,
  limit,
  variant = 'subtle',
  className = '',
}: TechStackProps) {
  const techs = stack.split(',').map((t) => t.trim());
  const visible = limit ? techs.slice(0, limit) : techs;
  const overflow = limit ? techs.length - limit : 0;

  const pillClass =
    variant === 'bordered'
      ? 'b2 px-3 py-1 bg-black/5 border-2 border-black'
      : 'b3 px-2 py-0.5 bg-black/5 border border-black/10';

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visible.map((tech) => (
        <span key={tech} className={pillClass}>
          {tech}
        </span>
      ))}
      {overflow > 0 && (
        <span className={`${pillClass} text-black/50`}>+{overflow}</span>
      )}
    </div>
  );
}
