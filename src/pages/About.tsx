import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Mail, Globe, ShieldCheck } from 'lucide-react';
import StickyExperience from '@/components/StickyExperience';
import FooterResume from '@/components/FooterResume';
import IndustriesTechStack from '@/components/IndustriesTech';
import Container from '@/components/ui/Container';
import PageLoader from '@/components/ui/PageLoader';
import { useCSVData } from '@/hooks/useCSVData';
import type { Experience } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const personalDetails = {
  languages: ['English (Native)', 'Mandarin (Native)'],
  certificates: ['iCAT Foundations', 'Working with Children Check', 'LCCI Level 2 in Bookkeeping & Accounting'],
  education: 'Bachelor of Computing Science (First Class Honours)',
  contact: ['+61 450 190 503', 'thamzien@gmail.com'],
};

export default function About() {
  const { data: experiences, loading } = useCSVData<Experience>('/data/experience.csv');

  useEffect(() => {
    if (!loading) ScrollTrigger.refresh();
  }, [loading]);

  if (loading) return <PageLoader />;

  return (
    <div className="pt-20 sm:pt-24">
      {/* My Story */}
      <section className="min-h-[80vh] flex items-center bg-white py-16 sm:py-20">
        <Container className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="h1 mb-8">
                My <span className="text-amber">Story</span>
              </h1>
              <div className="space-y-6 b1 text-black/80 leading-relaxed">
                <p>
                  I'm a computing science graduate specializing in <b className="bg-amber">AI & Data Analytics</b>, with experience applying AI and machine learning in clinical laboratory settings. I enjoy using data to solve real-world problems and aim to leverage AI to improve healthcare outcomes.
                </p>
                <p>
                  I'm also fascinated by biology and medicine, including topics like genomics, RNA, and DNA, and enjoy reading about these areas to stay inspired. I'm drawn to the creative side of technology as well, with interests in art, drawing, <b className="bg-amber">web design</b>, and <b className="bg-amber">data visualization</b>, where design and information come together to tell clear, engaging stories.
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
        </Container>
      </section>

      {/* Personal Details */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <Container>
          <h2 className="h3 mb-8">Personal Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe size={24} className="text-green" />, title: 'Languages', items: personalDetails.languages },
              { icon: <ShieldCheck size={24} className="text-amber" />, title: 'Certificates & Licenses', items: personalDetails.certificates },
              { icon: <GraduationCap size={24} className="text-red" />, title: 'Education', items: [personalDetails.education] },
              { icon: <Mail size={24} className="text-black" />, title: 'Contact', items: personalDetails.contact },
            ].map(({ icon, title, items }) => (
              <div key={title} className="border-2 border-black p-6 bg-white">
                <div className="flex items-center gap-5 mb-3">
                  {icon}
                  <h4 className="h4">{title}</h4>
                </div>
                <ul className="b2 space-y-1 text-black/70">
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries & Tech Stack - Unified Component */}
      <IndustriesTechStack />

      <StickyExperience experiences={experiences} showEndCard={false} />

      <FooterResume />
    </div>
  );
}