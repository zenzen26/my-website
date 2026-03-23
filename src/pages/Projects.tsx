import { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, X, ExternalLink, Github, Calendar, Tag, ArrowUp, ArrowDown } from 'lucide-react';
import { useCSVData } from '@/hooks/useCSVData';
import type { Project } from '@/types';
import FooterResume from '@/components/FooterResume';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { data: projects, loading } = useCSVData<Project>('/data/projects.csv');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const types = useMemo(() => {
    if (!projects.length) return ['All'];
    const uniqueTypes = [...new Set(projects.map(p => p.type))];
    return ['All', ...uniqueTypes.sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((p) => {
      const matchesType = typeFilter === 'All' || p.type === typeFilter;
      const matchesSearch = 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tech_stack.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [projects, typeFilter, search, sortDirection]);

  useEffect(() => {
    if (!loading && gridRef.current) {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === gridRef.current) {
          trigger.kill();
        }
      });

      gsap.fromTo(
        '.project-tile',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, [loading, filteredProjects]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="h2 animate-pulse text-amber">Loading...</div>
      </div>
    );
  }

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
    <div className="min-h-screen">
      <div className="pt-20 sm:pt-24 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24">
          {/* Header */}
          <div className="mb-8">
            <h1 className="h2 mb-4">All Projects</h1>
            <p className="b1 text-black/60 max-w-2xl">
              A collection of my work spanning web development, data visualization, and AI experiments.
              Click any project to view details.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 mb-6 sticky top-20 bg-white/95 backdrop-blur-sm py-4 z-30 border-b-2 border-black/5">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-wrap">
              <div className="relative flex-1 max-w-md w-full">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-black/20 font-share-tech focus:border-amber outline-none transition-colors"
                />
              </div>

              {/* Type Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                <span className="font-share-tech text-sm text-black/60 self-center mr-2 whitespace-nowrap">Type:</span>
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 font-share-tech text-sm whitespace-nowrap border-2 transition-all ${
                      typeFilter === type
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black/20 hover:border-amber'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Date Sort Toggle */}
              <button
                onClick={() => setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="flex items-center gap-2 px-4 py-2 font-share-tech text-sm border-2 border-black/20 hover:border-amber transition-all whitespace-nowrap"
              >
                <Calendar size={16} />
                {sortDirection === 'desc' ? 'Most Recent' : 'Oldest First'}
                {sortDirection === 'desc' ? <ArrowDown size={16} className="text-amber" /> : <ArrowUp size={16} className="text-amber" />}
              </button>
            </div>
          </div>

          {/* Results Count */}
          <p className="b2 text-black/60 mb-6">
            Showing {filteredProjects.length} of {projects.length} projects
            <span className="ml-2 text-black/40">• Sorted by date ({sortDirection === 'desc' ? 'most recent' : 'oldest first'})</span>
          </p>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="project-tile taped-card group cursor-pointer"
                style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >
                {/* Image Container - Using background-image for perfect cover */}
                <div className="relative overflow-hidden bg-amber mb-4 h-48 mx-4 mt-8">
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
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`${typeColorClasses[project.type as keyof typeof typeColorClasses] || 'bg-black'} b3 px-2 py-1 text-white`}>
                      {project.type}
                    </span>
                    <span className="b3 px-2 py-1 bg-white text-black border border-black">
                      {project.category}
                    </span>
                    <span className="b3 text-black/50">{project.date}</span>
                  </div>

                  <h3 className="h4 line-clamp-2 group-hover:text-amber transition-colors">
                    {project.title}
                  </h3>

                  <p className="b2 text-black/70 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {project.tech_stack.split(',').slice(0, 3).map((tech) => (
                      <span key={tech} className="b3 px-2 py-0.5 bg-black/5">
                        {tech.trim()}
                      </span>
                    ))}
                    {project.tech_stack.split(',').length > 3 && (
                      <span className="b3 px-2 py-0.5 bg-black/5 text-black/50">
                        +{project.tech_stack.split(',').length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="h3 text-black/40">No projects found</p>
              <button
                onClick={() => {
                  setTypeFilter('All');
                  setSearch('');
                  setSortDirection('desc');
                }}
                className="mt-4 px-6 py-2 bg-amber font-share-tech text-sm hover:bg-black hover:text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto relative taped-card"
            onClick={(e) => e.stopPropagation()}
            style={{ transform: 'rotate(0deg)' }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-amber transition-colors z-10 border-2 border-black"
            >
              <X size={24} />
            </button>

            {/* Header - Dotted colored background */}
            <div className={`${colorClasses[selectedProject.color_tag as keyof typeof colorClasses] || 'bg-amber'} h-64 sm:h-80 relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white_2px,transparent_2px)] bg-[length:24px_24px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="h2 text-white text-center px-4 drop-shadow-lg">{selectedProject.title}</h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-12">
              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-8 font-share-tech text-sm">
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
                  <div className="border-2 border-black p-6">
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

      <FooterResume />
    </div>
  );
}