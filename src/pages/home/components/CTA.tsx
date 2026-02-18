import { MessageCircle } from "lucide-react";

interface Props {
  handleChatWithAll?: () => void;
}

function CTA({ handleChatWithAll }: Props) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Besoin d'une pharmacie maintenant ?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Téléchargez notre application ou commencez à chercher directement
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={handleChatWithAll}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chatter avec toutes les pharmacies</span>
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            Télécharger l'application
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
