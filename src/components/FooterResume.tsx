import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download } from 'lucide-react';

const resumes = [
  { name: 'The Generalist', color: 'black', focus: 'Full background' },
  { name: 'Frontend Dev', color: 'green', focus: 'React/Next.js' },
  { name: 'Data & AI', color: 'amber', focus: 'Python/Analytics' },
];

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
];

export default function FooterResume() {
  const colorMap = {
    green: 'bg-[#519A66] text-white',
    amber: 'bg-[#FFAA00] text-black',
    red: 'bg-[#DA3D20] text-white',
    black: 'bg-black text-white',
  };

  return (
    <footer id="footer" className="bg-black text-white py-16 sm:py-20">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          
          <div>
            <h2 className="h2 mb-8 text-[#FFAA00]">
              Let's Talk
            </h2>
            
            <div className="space-y-4 b1 mb-8">
              <a href="mailto:hello@zenzen.dev" className="flex items-center gap-3 hover:text-[#FFAA00] transition-colors">
                <Mail size={20} /> hello@zenzen.dev
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-[#FFAA00] transition-colors">
                <Phone size={20} /> +1 (234) 567-890
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin size={20} /> San Francisco, CA
              </div>
            </div>

            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-white/20 flex items-center justify-center hover:bg-[#FFAA00] hover:border-[#FFAA00] hover:text-black transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="h3 mb-6">Resume Hub</h3>
            <div className="grid grid-cols-3 gap-4">
              {resumes.map((resume, index) => (
                <div
                  key={resume.name}
                  className={`${colorMap[resume.color as keyof typeof colorMap]} p-4 border-2 border-white/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer group`}
                  style={{ transform: `rotate(${(index - 1) * 3}deg)` }}
                >
                  <div className="aspect-[3/4] mb-3 bg-white/10 flex items-center justify-center border border-dashed border-current">
                    <Download size={24} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="h4 mb-1">{resume.name}</h4>
                  <p className="b3 opacity-70">{resume.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="h4 text-[#FFAA00]">ZENZEN</p>
          <p className="b3 text-white/40">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}