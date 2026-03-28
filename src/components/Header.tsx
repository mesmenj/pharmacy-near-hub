import { MapPin, MessageCircle, Menu, X, Phone, Clock, Navigation } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { STATE } from "../store/state";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGuardModal, setShowGuardModal] = useState(false);

  const { dataGuard } = useSelector((state: STATE) => state.guard);
  const { dataPharmacy } = useSelector((state: STATE) => state.pharmacy);

  const guardPharmacies = Object.values(dataGuard || {}).flatMap((guard) =>
    (guard.pharmacies as string[])
      .map((id) => dataPharmacy[id])
      .filter(Boolean)
  );

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
                onClick={() => setShowGuardModal(true)}
                className="bg-button_bg text-primary px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base whitespace-nowrap"
              >
                <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Pharmacies de garde du jour</span>
                {guardPharmacies.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {guardPharmacies.length}
                  </span>
                )}
              </button>
            </nav>

            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => setShowGuardModal(true)}
                className="relative bg-button_bg text-primary p-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Pharmacies de garde du jour"
              >
                <MessageCircle className="w-5 h-5" />
                {guardPharmacies.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {guardPharmacies.length}
                  </span>
                )}
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

      {/* Modal pharmacies de garde */}
      {showGuardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowGuardModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-500" />
                <h2 className="font-bold text-base sm:text-lg">
                  Pharmacies de garde du jour
                </h2>
                {guardPharmacies.length > 0 && (
                  <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {guardPharmacies.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowGuardModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Liste */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-3">
              {guardPharmacies.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Clock className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Aucune pharmacie de garde aujourd'hui</p>
                </div>
              ) : (
                guardPharmacies.map((pharmacy: any) => (
                  <div
                    key={pharmacy.id}
                    className="border border-orange-100 bg-orange-50/40 rounded-xl p-3 sm:p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm sm:text-base">
                        {pharmacy.name}
                      </h3>
                      <span className="shrink-0 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                        De garde
                      </span>
                    </div>

                    {pharmacy.address && (
                      <p className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-600 mb-1.5">
                        <Navigation className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-400" />
                        {pharmacy.address}
                      </p>
                    )}

                    <div className="flex items-center gap-4 flex-wrap">
                      {pharmacy.phone && (
                        <a
                          href={`tel:${pharmacy.phone}`}
                          className="flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {pharmacy.phone}
                        </a>
                      )}
                      {pharmacy.openingHours && (
                        <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          {pharmacy.openingHours}
                        </span>
                      )}
                      {pharmacy.isOpen !== undefined && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            pharmacy.isOpen
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {pharmacy.isOpen ? "Ouvert" : "Fermé"}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

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
