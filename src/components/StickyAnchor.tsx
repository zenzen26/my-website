import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Back to Top' },
  { id: 'projects', label: 'Projects' },
  { id: 'industries', label: 'Industries' },
  { id: 'experience', label: 'Experience' },
  { id: 'footer', label: 'Contact' },
];

export default function StickyAnchor() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: id === 'hero' ? 0 : 80 },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex items-center gap-3 transition-all duration-300 ${
              activeSection === section.id ? 'opacity-100' : 'opacity-30 hover:opacity-60'
            }`}
          >
            <span className={`w-px h-6 transition-all duration-300 ${
              activeSection === section.id ? 'bg-amber scale-y-125' : 'bg-gray-400'
            }`} />
            <span className={`font-share-tech text-xs transition-all duration-300 ${
              activeSection === section.id ? 'translate-x-0 opacity-100 text-amber' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-gray-500'
            }`}>
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}