/**
 * TypeBadge.tsx
 * Coloured badge for a project type (AI / Web / Data) or experience type.
 * Replaces the repeated typeColorClasses lookup + span pattern.
 *
 * Usage:
 *   <TypeBadge type={project.type} />
 *   <TypeBadge type="AI" withIcon={<Tag size={16} />} />
 */

import { typeColorMap } from '@/lib/colorMaps';

interface TypeBadgeProps {
  type: string;
  withIcon?: React.ReactNode;
  className?: string;
}

export default function TypeBadge({ type, withIcon, className = '' }: TypeBadgeProps) {
  const bg = typeColorMap[type] ?? 'bg-black';
  return (
    <span className={`${bg} b3 px-2 py-1 text-white flex items-center gap-1 ${className}`}>
      {withIcon}
      {type}
    </span>
  );
}
