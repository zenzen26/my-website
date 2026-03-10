import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Globe, ShieldCheck } from 'lucide-react';
import StickyExperience from '@/components/StickyExperience';
import FooterResume from '@/components/FooterResume';
import { useCSVData } from '@/hooks/useCSVData';
import type { Experience } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const personalDetails = {
  languages: ['English (Native)', 'Mandarin (Native)'],
  certificates: ['AWS Solutions Architect', 'Google Data Analytics', 'Meta Frontend Developer'],
  location: 'Sydney, NSW',
  contact: ['+61 450 190 503', 'thamzien@gmail.com'],
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
  { name: 'Health Tech', color: 'green', tagline: 'Impact through data & AI' },
  { name: 'FinTech', color: 'green', tagline: 'Complex made Simple' },
  { name: 'Analyst', color: 'black', tagline: 'Making sense of complexity' },
  { name: 'Web Dev', color: 'black', tagline: 'Building attractive web experiences' },
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
        <div className="h2 animate-pulse text-amber">Loading...</div>
      </div>
    );
  }

  const colorMap = {
    green: 'bg-green text-white',
    amber: 'bg-amber text-black',
    red: 'bg-red text-white',
    black: 'bg-black text-white',
  };

  return (
    <div className="pt-20 sm:pt-24">
      {/* Hero - My Story Section */}
      <section className="min-h-[80vh] flex items-center bg-white py-16 sm:py-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h1 className="h1">
                  My <span className="text-amber">Story</span>
                </h1>
              </div>
              
              <div className="space-y-6 b1 text-black/80 leading-relaxed">
                <p>
                  I’m a computing science graduate specializing in <b className="bg-amber">AI & Data Analytics</b>, with experience applying AI and machine learning in clinical laboratory settings. I enjoy using data to solve real-world problems and aim to leverage AI to improve healthcare outcomes.
                </p>

                <p>
                  I’m also fascinated by biology and medicine, including topics like genomics, RNA, and DNA, and enjoy reading about these areas to stay inspired. I’m drawn to the creative side of technology as well, with interests in art, drawing, <b className="bg-amber">web design</b>, and <b className="bg-amber">data visualization</b>, where design and information come together to tell clear, engaging stories.
                </p>

                <p>
                  Outside work, I spend time with cats, explore new ideas, and occasionally enjoy a mocha to power through a busy day. I enjoy building projects that balance utility and aesthetics while reflecting curiosity and creativity.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-amber aspect-[4/5] max-w-md mx-auto relative overflow-hidden border-4 border-black shadow-2xl transform rotate-2">
                <div className="absolute inset-0 bg-gradient-to-br from-amber to-[#FF8800]" />
                <img src="/images/cat.jpg" alt="Zenzen" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-white p-6 text-center">
                  <p className="b2 text-black/60">zenzen @ 2024</p>
                  <p className="b3 text-black/40 mt-1">Sydney, NSW</p>
                </div>
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-amber/30 transform -rotate-2" />
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
              <div className="mb-8">
                <h2 className="h3">Personal Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-2 border-black p-6 bg-white">
                  <div className="flex items-center gap-5 mb-3">
                    <Globe size={24} className="text-green" />
                    <h4 className="h4">Languages</h4>
                  </div>
                  <ul className="b2 space-y-1 text-black/70">
                    {personalDetails.languages.map(lang => (
                      <li key={lang}>{lang}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-2 border-black p-6 bg-white">
                  <div className="flex items-center gap-5 mb-3">
                    <ShieldCheck size={24} className="text-amber" />
                    <h4 className="h4">Certificates</h4>
                  </div>
                  <ul className="b2 space-y-1 text-black/70">
                    {personalDetails.certificates.map(cert => (
                      <li key={cert}>{cert}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-2 border-black p-6 bg-white">
                  <div className="flex items-center gap-5 mb-3">
                    <MapPin size={24} className="text-red" />
                    <h4 className="h4">Location</h4>
                  </div>
                  <p className="b2 text-black/70">{personalDetails.location}</p>
                </div>
                
                <div className="border-2 border-black p-6 bg-white">
                  <div className="flex items-center gap-5 mb-3">
                    <Mail size={24} className="text-black" />
                    <h4 className="h4">Contact</h4>
                  </div>
                  <ul className="b2 space-y-1 text-black/70">
                    {personalDetails.contact.map(contact => (
                      <li key={contact}>{contact}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <div className="mb-8">
                <h2 className="h3">Tech Stack</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, data]) => {
                  const borderColor = {
                    green: 'border-green',
                    amber: 'border-amber',
                    red: 'border-red',
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
            <div className="mb-8">
              <h2 className="h3">Target Industries & Job</h2>
            </div>
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

      <FooterResume />
    </div>
  );
}