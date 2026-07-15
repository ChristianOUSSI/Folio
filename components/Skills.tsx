'use client';
import { motion } from 'framer-motion';
import { 
  Code2, FileCode, Terminal, Cpu, Box, Globe, Palette, 
  Smartphone, Layout, Monitor, Image as ImageIcon, Video, Languages,
  Database, Server, Cloud, Activity, Github, GitPullRequest, Workflow, PenTool
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const categoriesLeft: { title: string; items: Skill[] }[] = [
  {
    title: 'Langages',
    items: [
      { name: 'JavaScript', icon: <Code2 className="w-4 h-4" /> },
      { name: 'TypeScript', icon: <FileCode className="w-4 h-4" /> },
      { name: 'Python', icon: <Terminal className="w-4 h-4" /> },
      { name: 'Java', icon: <Cpu className="w-4 h-4" /> },
      { name: 'C#', icon: <Box className="w-4 h-4" /> },
      { name: 'C', icon: <Cpu className="w-4 h-4" /> },
      { name: 'SQL', icon: <Database className="w-4 h-4" /> },
      { name: 'Perl', icon: <Terminal className="w-4 h-4" /> },
      { name: 'HTML', icon: <Globe className="w-4 h-4" /> },
      { name: 'CSS', icon: <Palette className="w-4 h-4" /> }
    ]
  },
  {
    title: 'Frameworks & Plateformes',
    items: [
      { name: 'Next.js', icon: <Globe className="w-4 h-4" /> },
      { name: 'Laravel', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Node.js', icon: <Server className="w-4 h-4" /> },
      { name: 'React Native', icon: <Smartphone className="w-4 h-4" /> },
      { name: 'WordPress', icon: <Globe className="w-4 h-4" /> },
      { name: 'FlutterFlow', icon: <Smartphone className="w-4 h-4" /> },
      { name: 'Webflow', icon: <Layout className="w-4 h-4" /> },
      { name: 'Unreal Engine 5', icon: <Box className="w-4 h-4" /> }
    ]
  },
];

const categoriesRight: { title: string; items: Skill[] }[] = [
  {
    title: 'DevOps & BDD',
    items: [
      { name: 'PostgreSQL', icon: <Database className="w-4 h-4" /> },
      { name: 'SQLAlchemy', icon: <Database className="w-4 h-4" /> },
      { name: 'Docker', icon: <Box className="w-4 h-4" /> },
      { name: 'DevOps', icon: <Cloud className="w-4 h-4" /> },
      { name: 'Monitoring', icon: <Activity className="w-4 h-4" /> },
    ]
  },
  {
    title: 'Outils & Création',
    items: [
      { name: 'VS Code', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Cursor', icon: <Terminal className="w-4 h-4" /> },
      { name: 'Antigravity IDE', icon: <Terminal className="w-4 h-4" /> },
      { name: 'GitHub', icon: <Github className="w-4 h-4" /> },
      { name: 'GitLab', icon: <GitPullRequest className="w-4 h-4" /> },
      { name: 'Figma', icon: <PenTool className="w-4 h-4" /> },
      { name: 'Canvas', icon: <Palette className="w-4 h-4" /> },
      { name: 'n8n', icon: <Workflow className="w-4 h-4" /> },
      { name: 'Photoshop', icon: <ImageIcon className="w-4 h-4" /> }
    ]
  },
  {
    title: 'Langues',
    items: [
      { name: 'Français (natif)', icon: <Languages className="w-4 h-4" /> },
      { name: 'Anglais (courant)', icon: <Languages className="w-4 h-4" /> },
      { name: 'Allemand (notions)', icon: <Languages className="w-4 h-4" /> },
      { name: 'Japonais (en apprentissage)', icon: <Languages className="w-4 h-4" /> }
    ]
  }
];

const personalNote = "Ces compétences ne sont pas juste des outils elles sont nées de mes passions. J'ai plongé dans React après avoir vu des sites web magiques comme ceux des mangas en ligne !";

export function SkillsLeft() {
  return (
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold mb-6 text-center font-serif relative z-10"
      >
        <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent  ">
          Compétences
        </span>
      </motion.h2>
      
      <div className="flex flex-col gap-4 w-full max-w-sm mx-auto relative z-10">
        {categoriesLeft.map((cat, idx) => (
          <motion.div 
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="bg-white/80  backdrop-blur-sm p-4 rounded-xl border border-slate-200  shadow-sm hover:shadow-lg transition-all">
              <h3 className="font-semibold text-lg text-slate-950  mb-2 font-serif">{cat.title}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {cat.items.map((skill, i) => (
                  <li key={skill.name} className="flex items-center gap-2 text-[11px] md:text-xs text-slate-900 ">
                    <span className="text-slate-800 ">{skill.icon}</span>
                    <span className="truncate">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SkillsRight() {
  return (
    <section className="w-full my-auto flex flex-col px-4 sm:px-8 py-4 relative">
      <div className="flex flex-col gap-4 w-full max-w-sm mx-auto relative z-10">
        {categoriesRight.map((cat, idx) => (
          <motion.div 
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="bg-white/80  backdrop-blur-sm p-4 rounded-xl border border-slate-200  shadow-sm hover:shadow-lg transition-all">
              <h3 className="font-semibold text-[15px] md:text-base text-slate-950  mb-2 font-serif">{cat.title}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {cat.items.map((skill, i) => (
                  <li key={skill.name} className="flex items-center gap-2 text-[11px] md:text-xs text-gray-700 ">
                    <span className="text-blue-500">{skill.icon}</span>
                    <span className="truncate">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-2 p-3 bg-blue-50/50  rounded-xl border border-blue-200  text-center"
        >
          <p className="text-gray-700  italic font-serif text-[13px]">{personalNote}</p>
        </motion.div>
      </div>
    </section>
  );
}
