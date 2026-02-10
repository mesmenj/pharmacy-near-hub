import { MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import ChatModal from "./ChatModal";

function Header() {
  const [showChatModal, setShowChatModal] = useState(false);
  const handleChatWithAll = () => {
    // setSelectedPharmacy(null);
    setShowChatModal(true);
  };
  return (
    <>
      <header className="w-full fixed top-0 left-0 z-40 bg-primary shadow-sm border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Pharmacy Near Hub</h1>
                <p className="text-sm text-[#6B7280]">
                  Trouvez votre pharmacie en un clic
                </p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="hover:text-blue-600 transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="#pharmacies"
                className="hover:text-blue-600 transition-colors"
              >
                Pharmacies
              </a>
              <a
                href="#how-it-works"
                className="hover:text-blue-600 transition-colors"
              >
                Comment ça marche
              </a>
              <button
                onClick={handleChatWithAll}
                className="bg-button_bg text-primary px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chatter avec toutes</span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
      />
    </>
  );
}

export default Header;
