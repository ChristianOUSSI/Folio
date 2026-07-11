'use client';
import { motion } from 'framer-motion';

export function AboutLeft() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-10 text-center font-serif"
        >
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
            À propos de moi
          </span>
        </motion.h2>

        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center leading-relaxed text-gray-700 dark:text-gray-200 text-lg font-serif"
          >
            <span className="text-blue-700 dark:text-blue-400 font-semibold text-xl block mb-4">
              Développeur Fullstack passionné par les récits interactifs
            </span>
            Étudiant en cours d'obtention de ma Licence en Gestion des Systèmes
            d'Informations à l'Université The Brains, je suis <span className="text-blue-600 font-semibold">motivé</span>, <span className="text-blue-500 font-semibold">créatif</span>,
            <span className="text-blue-600 font-semibold"> innovant</span>, passionné par la technologie et <span className="text-blue-500 font-semibold">dynamique</span>. 
            Je mets mon expertise et mes compétences en constante évolution au service de vos projets et entreprises.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export function AboutRight() {
  return (
    <section className="w-full h-full flex flex-col justify-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-lg mx-auto w-full relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 text-center font-serif">
            Passions & Centres d'intérêt
          </h3>
          <p className="text-center leading-relaxed text-gray-700 dark:text-gray-200 font-serif text-base">
            Lecteur passionné de <span className="text-blue-500 font-semibold">mangas comme Dragon Ball, HxH et Naruto</span>, j'écris des histoires sur <span className="text-blue-500 font-semibold">Wattpad</span> pour explorer des mondes imaginaires. Gamer invétéré, j'ai passé des nuits blanches sur <span className="text-blue-500 font-semibold">NEOGEO, ZUMA et les GTA</span>, ce qui m'a appris la persévérance et la résolution de problèmes complexes. Ces hobbies nourrissent ma créativité en code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/50"
        >
          <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-3 text-center font-serif">Mon parcours personnel</h3>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-serif text-sm text-center">
            Tout a commencé avec un vieux Laptop HP sous Windows 7, où j'ai découvert les jeux vidéo. J'ai essayé de "cracker" un jeu PPSSPP en y ajoutant des savedatas pour avoir tous les personnages, et ça m'a fasciné. J'ai commencé à apprendre le HTML/CSS sur YouTube, puis le JavaScript. Cette curiosité m'a poussé vers l'université au Cameroun. Et oui, j'ai encore ce vieux PC en guise de rappel de mes débuts !
          </p>
        </motion.div>
      </div>
    </section>
  );
}
