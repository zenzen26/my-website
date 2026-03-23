import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import IndustriesTech from '@/components/IndustriesTech';
import StickyExperience from '@/components/StickyExperience';
import FooterResume from '@/components/FooterResume';
import StickyAnchor from '@/components/StickyAnchor';
import { useCSVData } from '@/hooks/useCSVData';
import type { Project, Experience } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { data: projects, loading: projectsLoading } = useCSVData<Project>('/data/projects.csv');
  const { data: experiences, loading: expLoading } = useCSVData<Experience>('/data/experience.csv');

  useEffect(() => {
    if (!projectsLoading && !expLoading) {
      ScrollTrigger.refresh();
    }
  }, [projectsLoading, expLoading]);

  if (projectsLoading || expLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h2 animate-pulse text-amber">Loading...</div>
      </div>
    );
  }

  const featuredProjects = projects.filter(p => p.featured).slice(0, 6);

  return (
    <div className="relative">
      <StickyAnchor />
      
      <section id="hero">
        <Hero />
      </section>
      
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24">
          <div className="mb-10 text-center">
            <h2 className="h2">
              Featured <span className="text-amber">Projects</span>
            </h2>
          </div>
          <FeaturedProjects projects={featuredProjects} />
        </div>
      </section>
      
      <IndustriesTech />
      
      <StickyExperience experiences={experiences} showEndCard={true} />
      
      <FooterResume />
    </div>
  );
}