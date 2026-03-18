export default function Offline() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">📡</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Vous êtes hors ligne
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Vérifiez votre connexion Internet et réessayez.
        </p>
        <button
          onClick={() => typeof window !== 'undefined' && window.location.reload()}
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
