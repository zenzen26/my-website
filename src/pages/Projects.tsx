import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, X, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { useCSVData } from '@/hooks/useCSVData';
import type { Project } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Web Dev', 'Data & AI', 'Dashboards', 'Experiments'];

export default function Projects() {
  const { data: projects, loading } = useCSVData<Project>('/data/projects.csv');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && gridRef.current) {
      ScrollTrigger.refresh();
    }
  }, [loading, filter, search]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="font-permanent-marker text-2xl animate-pulse text-[#FFAA00]">Loading...</div>
      </div>
    );
  }

  const filteredProjects = projects.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const colorClasses = {
    green: 'bg-[#519A66]',
    amber: 'bg-[#FFAA00]',
    red: 'bg-[#DA3D20]',
    black: 'bg-black',
  };

  return (
    <div className="pt-20 sm:pt-24 pb-20 min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-permanent-marker mb-4">All Projects</h1>
          <p className="font-share-tech text-lg text-black/60 max-w-2xl">
            A collection of my work spanning web development, data visualization, and AI experiments.
            Click any project to view details.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 sticky top-20 bg-white/95 backdrop-blur-sm py-4 z-30 border-b-2 border-black/5">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-black/20 font-share-tech focus:border-[#FFAA00] outline-none transition-colors"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 font-share-tech text-sm whitespace-nowrap border-2 transition-all ${
                  filter === cat 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-black/20 hover:border-[#FFAA00]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="font-share-tech text-sm text-black/60 mb-6">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white border-2 border-black p-4 tape-edge transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer"
              style={{ transform: `rotate(${Math.random() * 2 - 1}deg)` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#FFAA00] mb-4 h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFAA00] to-[#FF8800]" />
                <div className="absolute inset-0 flex items-center justify-center text-black/20 font-permanent-marker text-3xl">
                  IMG
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`${colorClasses[project.color_tag]} text-xs font-share-tech px-2 py-1 text-white`}>
                    {project.category}
                  </span>
                  <span className="text-xs font-share-tech text-black/50">{project.date}</span>
                </div>
                
                <h3 className="font-permanent-marker text-sm leading-tight group-hover:text-[#FFAA00] transition-colors line-clamp-2">
                  {project.title}
                </h3>
                
                <p className="font-share-tech text-xs text-black/70 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {project.tech_stack.split(',').slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs font-share-tech px-2 py-0.5 bg-black/5"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-permanent-marker text-xl text-black/40">No projects found</p>
            <button 
              onClick={() => { setFilter('All'); setSearch(''); }}
              className="mt-4 px-6 py-2 bg-[#FFAA00] font-share-tech text-sm hover:bg-black hover:text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-[#FFAA00] transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Header Image */}
            <div className={`${colorClasses[selectedProject.color_tag]} h-64 sm:h-80 relative`}>
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="font-permanent-marker text-3xl sm:text-4xl md:text-5xl text-white text-center px-4">
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-12">
              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-8 font-share-tech text-sm">
                <span className="flex items-center gap-1">
                  <Tag size={16} /> {selectedProject.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {selectedProject.date}
                </span>
                <span className={`px-3 py-1 ${colorClasses[selectedProject.color_tag]} text-white`}>
                  {selectedProject.type}
                </span>
              </div>

              {/* Description */}
              <p className="font-share-tech text-lg text-black/80 leading-relaxed mb-8">
                {selectedProject.detail_description || selectedProject.description}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 space-y-6">
                  {selectedProject.challenges && (
                    <div>
                      <h3 className="font-permanent-marker text-lg mb-3 text-[#DA3D20]">Challenges</h3>
                      <p className="font-share-tech text-base text-black/70 leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>
                  )}

                  {selectedProject.solution && (
                    <div>
                      <h3 className="font-permanent-marker text-lg mb-3 text-[#519A66]">Solution</h3>
                      <p className="font-share-tech text-base text-black/70 leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  )}

                  {selectedProject.outcome && (
                    <div>
                      <h3 className="font-permanent-marker text-lg mb-3 text-[#FFAA00]">Outcome</h3>
                      <p className="font-share-tech text-base text-black/70 leading-relaxed">
                        {selectedProject.outcome}
                      </p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="border-2 border-black p-6">
                    <h3 className="font-permanent-marker text-sm mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.split(',').map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-black/5 font-share-tech text-xs border border-black/10"
                        >
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
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#519A66] text-white font-share-tech hover:bg-black transition-colors"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                    {selectedProject.github_url && (
                      <a 
                        href={selectedProject.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-share-tech hover:bg-[#FFAA00] hover:text-black transition-colors"
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
    </div>
  );
}