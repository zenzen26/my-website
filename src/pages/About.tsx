import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Calendar, Award, Globe, ShieldCheck } from 'lucide-react';
import StickyExperience from '@/components/StickyExperience';
import { useCSVData } from '@/hooks/useCSVData';
import type { Experience } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const personalDetails = {
  languages: ['English (Native)', 'Spanish (Conversational)', 'Mandarin (Basic)'],
  certificates: ['AWS Solutions Architect', 'Google Data Analytics', 'Meta Frontend Developer'],
  location: 'San Francisco, CA',
  email: 'hello@zenzen.dev',
  experience: '5+ Years',
};

const skills = {
  Frontend: {
    color: 'green',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Framer Motion', 'Three.js', 'Redux', 'Webpack'],
  },
  'Data & Viz': {
    color: 'amber',
    items: ['Python', 'Tableau', 'PowerBI', 'D3.js', 'Pandas', 'SQL', 'Apache Spark', 'Jupyter', 'NumPy'],
  },
  'AI/ML': {
    color: 'black',
    items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'NLP', 'Computer Vision', 'LLMs', 'MLOps', 'Hugging Face'],
  },
  'Tools & Workflow': {
    color: 'red',
    items: ['Git', 'Figma', 'Vercel', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Agile/Scrum', 'Jira'],
  },
};

const industries = [
  { name: 'HealthTech', color: 'green', tagline: 'Impact through data' },
  { name: 'EdTech', color: 'amber', tagline: 'Learning should be beautiful' },
  { name: 'Creative Tools', color: 'red', tagline: 'Building for makers' },
  { name: 'FinTech', color: 'green', tagline: 'Complex made simple' },
  { name: 'Data Viz', color: 'black', tagline: 'Making sense of complexity' },
];

export default function About() {
  const { data: experiences, loading } = useCSVData<Experience>('/data/experience.csv');

  useEffect(() => {
    if (!loading) {
      ScrollTrigger.refresh();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="h2 animate-pulse text-[#FFAA00]">Loading...</div>
      </div>
    );
  }

  const colorMap = {
    green: 'bg-[#519A66] text-white',
    amber: 'bg-[#FFAA00] text-black',
    red: 'bg-[#DA3D20] text-white',
    black: 'bg-black text-white',
  };

  return (
    <div className="pt-20 sm:pt-24">
      {/* Hero - My Story Section */}
      <section className="min-h-[80vh] flex items-center bg-white py-16 sm:py-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="h1 mb-8">
                My <span className="text-[#FFAA00]">Story</span>
              </h1>
              
              <div className="space-y-6 b1 text-black/80 leading-relaxed">
                <p>
                  I'm a developer who believes code should tell a story. With 5+ years of experience 
                  bridging design and engineering, I specialize in creating web applications that are 
                  both technically robust and visually compelling.
                </p>
                <p>
                  My journey began in a university AI lab, where I discovered the power of data 
                  visualization to make complex information accessible. This led me through roles 
                  in healthcare startups, fintech, and enterprise SaaS, always focusing on the 
                  intersection of user experience and technical excellence.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring generative art, contributing to 
                  open source, or mentoring the next generation of developers.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#FFAA00] aspect-[4/5] max-w-md mx-auto relative overflow-hidden border-4 border-black shadow-2xl transform rotate-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFAA00] to-[#FF8800]" />
                <div className="absolute inset-0 flex items-center justify-center text-black/20 font-mansalva text-8xl">
                  ZZ
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white p-6 text-center">
                  <p className="b2 text-black/60">zenzen @ 2024</p>
                  <p className="b3 text-black/40 mt-1">San Francisco, CA</p>
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#FFAA00]/30 transform -rotate-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Details & Skills Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Personal Details */}
            <div>
              <h2 className="h3 mb-8">Personal Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-2 border-black p-6 bg-white">
                  <Globe size={24} className="text-[#519A66] mb-3" />
                  <h4 className="h4 mb-2">Languages</h4>
                  <ul className="b2 space-y-1 text-black/70">
                    {personalDetails.languages.map(lang => (
                      <li key={lang}>{lang}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-2 border-black p-6 bg-white">
                  <ShieldCheck size={24} className="text-[#FFAA00] mb-3" />
                  <h4 className="h4 mb-2">Certificates</h4>
                  <ul className="b2 space-y-1 text-black/70">
                    {personalDetails.certificates.map(cert => (
                      <li key={cert}>{cert}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-2 border-black p-6 bg-white">
                  <MapPin size={24} className="text-[#DA3D20] mb-3" />
                  <h4 className="h4 mb-2">Location</h4>
                  <p className="b2 text-black/70">{personalDetails.location}</p>
                </div>
                
                <div className="border-2 border-black p-6 bg-white">
                  <Mail size={24} className="text-black mb-3" />
                  <h4 className="h4 mb-2">Contact</h4>
                  <p className="b2 text-black/70">{personalDetails.email}</p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="h3 mb-8">Tech Stack</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, data]) => {
                  const borderColor = {
                    green: 'border-[#519A66]',
                    amber: 'border-[#FFAA00]',
                    red: 'border-[#DA3D20]',
                    black: 'border-black',
                  };
                  
                  return (
                    <div 
                      key={category} 
                      className={`${borderColor[data.color as keyof typeof borderColor]} border-2 p-5 bg-white`}
                    >
                      <h4 className="h4 mb-3">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.items.map((skill) => (
                          <span 
                            key={skill}
                            className="b3 px-2 py-1 bg-black/5 border border-black/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Target Industries */}
          <div className="mt-16">
            <h2 className="h3 mb-8">Target Industries</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {industries.map((industry) => (
                <div
                  key={industry.name}
                  className={`${colorMap[industry.color as keyof typeof colorMap]} p-5 text-center border-2 border-black`}
                >
                  <h4 className="h4 mb-1">{industry.name}</h4>
                  <p className="b3 opacity-80">{industry.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience - No end card */}
      <StickyExperience experiences={experiences} showEndCard={false} />
    </div>
  );
}