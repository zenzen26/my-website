import { X, MapPin, Calendar, Award, Briefcase } from 'lucide-react';
import type { Experience } from '@/types';

interface ExperiencePopupProps {
  experience: Experience | null;
  onClose: () => void;
}

export default function ExperiencePopup({ experience, onClose }: ExperiencePopupProps) {
  if (!experience) return null;

  const colorClasses = {
    green: 'bg-green',
    amber: 'bg-amber',
    red: 'bg-red',
    black: 'bg-black',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-amber transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className={`${colorClasses[experience.color]} text-white p-6 sm:p-8`}>
          <span className="b2 px-3 py-1 bg-white/20 inline-block mb-3">
            {experience.type}
          </span>
          <h2 className="h3 mb-2">{experience.role}</h2>
          <p className="b1">@ {experience.company}</p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap gap-4 b2 text-black/60">
            <span className="flex items-center gap-1">
              <Calendar size={16} /> {experience.duration}
            </span>
            {experience.location && (
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {experience.location}
              </span>
            )}
          </div>

          <div>
            <h3 className="h4 mb-3 flex items-center gap-2">
              <Briefcase size={18} /> Overview
            </h3>
            <p className="b1 text-black/80 leading-relaxed">
              {experience.detail_description || experience.description}
            </p>
          </div>

          {experience.responsibilities && (
            <div>
              <h3 className="h4 mb-3">Responsibilities</h3>
              <ul className="list-disc list-inside b1 text-black/80 space-y-2">
                {experience.responsibilities.split('.').filter(r => r.trim()).map((resp, i) => (
                  <li key={i}>{resp.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          {experience.achievements && (
            <div>
              <h3 className="h4 mb-3 flex items-center gap-2">
                <Award size={18} /> Achievements
              </h3>
              <ul className="list-disc list-inside b1 text-black/80 space-y-2">
                {experience.achievements.split('.').filter(a => a.trim()).map((ach, i) => (
                  <li key={i}>{ach.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="h4 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {experience.tech_stack.split(',').map((tech) => (
                <span 
                  key={tech} 
                  className="b2 px-3 py-1 bg-black/5 border-2 border-black"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}