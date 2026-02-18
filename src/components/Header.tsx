import { MapPin, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import ChatModal from "./ChatModal";

function Header() {
  const [showChatModal, setShowChatModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChatWithAll = () => {
    setShowChatModal(true);
    setIsMenuOpen(false); // Ferme le menu mobile si ouvert
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-40 bg-primary shadow-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo et titre - responsive */}
            <div className="flex items-center space-x-2 flex-1 md:flex-none">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                {" "}
                {/* Pour éviter le débordement du texte */}
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold truncate">
                  Pharmacy Near Hub
                </h1>
                <p className="text-xs md:text-sm text-[#6B7280] hidden xs:block">
                  Trouvez votre pharmacie en un clic
                </p>
              </div>
            </div>

            {/* Menu de navigation desktop */}
            <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center">
              <a
                href="#features"
                className="text-sm lg:text-base hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Fonctionnalités
              </a>
              <a
                href="#pharmacies"
                className="text-sm lg:text-base hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Pharmacies
              </a>
              <a
                href="#how-it-works"
                className="text-sm lg:text-base hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                Comment ça marche
              </a>
              <button
                onClick={handleChatWithAll}
                className="bg-button_bg text-primary px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base whitespace-nowrap"
              >
                <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Chatter avec toutes</span>
              </button>
            </nav>

            {/* Bouton menu mobile et bouton chat mobile */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={handleChatWithAll}
                className="bg-button_bg text-primary p-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Chatter avec toutes les pharmacies"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Menu mobile déroulant */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-gray-200 animate-slideDown">
              <div className="flex flex-col space-y-3">
                <a
                  href="#features"
                  className="px-2 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fonctionnalités
                </a>
                <a
                  href="#pharmacies"
                  className="px-2 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pharmacies
                </a>
                <a
                  href="#how-it-works"
                  className="px-2 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Comment ça marche
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Espacement pour le contenu en dessous du header fixe */}
      <div className="h-16 md:h-20"></div>

      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
      />

      {/* Styles pour les animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        /* Breakpoint personnalisé pour très petits écrans */
        @media (max-width: 480px) {
          .xs\:block {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
