"use client";
import { motion } from 'framer-motion';
import { slugify } from '../utils/slugify';
import MotionSection from './MotionSection';

// Cette section, c'est un peu comme raconter mon histoire dans un manga – avec des twists personnels !
export default function About() {
  return (
    <MotionSection id={slugify('À propos')} className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 relative overflow-hidden">
      {/* Soft background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 dark:bg-blue-800/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-10 text-center"
        >
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
            À propos de moi
          </span>
        </motion.h2>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900 opacity-0 group-hover:opacity-20 rounded-2xl blur transition duration-300" />
          
          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl border border-blue-100 dark:border-blue-800 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-all shadow-lg">
            <div className="space-y-5">
              {/* First paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center leading-relaxed text-gray-700 dark:text-gray-200"
              >
                <span className="text-blue-700 dark:text-blue-400 font-semibold">Développeur Fullstack passionné par les récits interactifs</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center leading-relaxed text-gray-700 dark:text-gray-200"
              >
                Étudiant en cours d'obtention de ma Licence en Gestion des Systèmes
                d'Informations à l'Université The Brains, je suis <span className="text-blue-600 font-semibold">motivé</span>, <span className="text-blue-500 font-semibold">créatif</span>,
                <span className="text-blue-600 font-semibold"> innovant</span>, passionné par la technologie et <span className="text-blue-500 font-semibold">dynamique</span>. 
                Je mets mon expertise et mes compétences en constante évolution au service de vos projets et entreprises.
              </motion.p>

              {/* Divider */}
              <motion.div 
                className="flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
              </motion.div>

              {/* Second paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center leading-relaxed text-gray-800 dark:text-gray-200"
              >
                <span className="text-blue-600 dark:text-blue-400 font-semibold">Passions & Centres d'intérêt</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center leading-relaxed text-gray-700 dark:text-gray-200"
              >
                Lecteur passionné de <span className="text-blue-500 font-semibold">mangas comme Dragon Ball, HxH et Naruto</span>, j'écris des histoires sur <span className="text-blue-500 font-semibold">Wattpad</span> 
                 pour explorer des mondes imaginaires. Gamer invétéré, j'ai passé des nuits blanches sur <span className="text-blue-500 font-semibold">NEOGEO, ZUMA et les GTA </span>, 
                ce qui m'a appris la persévérance et la résolution de problèmes complexes. Ces hobbies ne sont pas juste des loisirs, ils nourrissent ma créativité en code, 
                comme quand j'ai créé un mod simple pour un jeu et réalisé que c'était comme déboguer une app !
              </motion.p>

              {/* New narrative section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-6 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800"
              >
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-3 text-center">Mon parcours personnel</h3>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  Tout a commencé avec un vieux Laptop HP sous Windows 7, où j'ai découvert les jeux vidéo. J'ai essayé de "cracker" un jeu PPSSPP en y ajoutant des savedatas pour avoir tous les personnages, 
                  (oui, c'était illégal et de la triche, mais éducatif !) et ça m'a fasciné. J'ai commencé à apprendre le HTML/CSS en allant sur youtube et en modifiant des sites web, 
                  puis le JavaScript pour créer des petits scripts. Cette curiosité m'a poussé vers l'université au Cameroun, où j'ai plongé dans le développement fullstack. 
                  Chaque projet, comme ce portfolio, est une aventure inspiré par les mangas que je dévore et les mondes virtuels que j'explore. 
                  Et oui, j'ai encore ce vieux PC et je l'utilse toujours au lieu de virtualiser, comme un rappel de mes débuts !
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
