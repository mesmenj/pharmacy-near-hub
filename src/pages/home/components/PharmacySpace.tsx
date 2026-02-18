import {
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Star,
  Filter,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  searchedPharmacies?: any;
  setActiveFilter?: (val: string) => void;
  activeFilter?: string;
  handleChatWithPharmacy?: (val: any) => void;
}

function PharmacySpace({
  searchedPharmacies = [],
  setActiveFilter,
  activeFilter = "all",
  handleChatWithPharmacy,
}: Props) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filters = [
    { id: "all", label: "Toutes", icon: null },
    { id: "open", label: "Ouvertes", icon: Clock },
    { id: "24h", label: "24h/24", icon: Clock },
  ];

  return (
    <section id="pharmacies" className="container mx-auto px-4 py-8 md:py-12">
      {/* En-tête avec filtres - responsive */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">
            Pharmacies à proximité
          </h2>

          {/* Bouton filtres mobile */}
          {isMobile && (
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg md:hidden"
            >
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
          )}
        </div>

        {/* Filtres desktop */}
        <div className="hidden md:flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter?.(filter.id)}
              className={`
                px-4 py-2 rounded-lg text-sm lg:text-base transition-all
                flex items-center space-x-2
                ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-[#6B7280] border border-[#E5B7EB] hover:bg-gray-50"
                }
              `}
            >
              {filter.icon && <filter.icon className="w-4 h-4" />}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filtres mobiles - panneau latéral */}
      {isMobile && showMobileFilters && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setShowMobileFilters(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold">Filtres</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter?.(filter.id);
                    setShowMobileFilters(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-colors
                    flex items-center space-x-3
                    ${
                      activeFilter === filter.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-[#6B7280] hover:bg-gray-100"
                    }
                  `}
                >
                  {filter.icon && <filter.icon className="w-4 h-4" />}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grille des pharmacies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {searchedPharmacies.length > 0 ? (
          searchedPharmacies.map((pharmacy: any) => (
            <div
              key={pharmacy.id}
              className="group bg-white rounded-xl shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="flex flex-col p-4 sm:p-5 lg:p-6 h-full">
                {/* En-tête avec nom et note */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">
                      {pharmacy.name}
                    </h3>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#6B7280] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#6B7280] line-clamp-2">
                        {pharmacy.address}
                      </span>
                    </div>
                  </div>

                  {/* Note */}
                  {pharmacy.rating && (
                    <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-1.5 sm:px-2 py-1 rounded flex-shrink-0">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                      <span className="text-xs sm:text-sm font-semibold">
                        {pharmacy.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Informations principales */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {/* Horaires */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#6B7280]" />
                      <span className="text-xs sm:text-sm">Horaires</span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          pharmacy.isOpen ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {pharmacy.openingHours}
                      </span>
                      <span
                        className={`text-xs ml-1 ${
                          pharmacy.isOpen ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ({pharmacy.isOpen ? "Ouverte" : "Fermée"})
                      </span>
                    </div>
                  </div>

                  {/* Distance */}
                  {pharmacy.distance && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Navigation className="w-3 h-3 sm:w-4 sm:h-4 text-[#6B7280]" />
                        <span className="text-xs sm:text-sm">Distance</span>
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        {typeof pharmacy.distance === "number"
                          ? `${pharmacy.distance.toFixed(1)} km`
                          : pharmacy.distance}
                      </span>
                    </div>
                  )}

                  {/* Téléphone si disponible */}
                  {pharmacy.phone && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#6B7280]" />
                        <span className="text-xs sm:text-sm">Téléphone</span>
                      </div>
                      <a
                        href={`tel:${pharmacy.phone}`}
                        className="text-xs sm:text-sm text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {pharmacy.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Spécialités (si disponibles) */}
                {pharmacy.specialties && pharmacy.specialties.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {pharmacy.specialties
                        .slice(0, 3)
                        .map((specialty: any, index: number) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 text-xs px-2 sm:px-3 py-1 rounded-full truncate max-w-[120px] sm:max-w-[150px]"
                            title={specialty}
                          >
                            {specialty}
                          </span>
                        ))}
                      {pharmacy.specialties.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 sm:px-3 py-1 rounded-full">
                          +{pharmacy.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                  {pharmacy.phone && (
                    <a
                      href={`tel:${pharmacy.phone}`}
                      className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 bg-blue-600 text-white py-2.5 sm:py-3 px-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                    >
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Appeler</span>
                    </a>
                  )}
                  <button
                    onClick={() => handleChatWithPharmacy?.(pharmacy)}
                    className="flex-1 flex items-center justify-center space-x-1 sm:space-x-2 border border-blue-600 text-blue-600 py-2.5 sm:py-3 px-2 rounded-lg hover:bg-blue-50 transition-colors text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Chatter</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // État vide
          <div className="col-span-full text-center py-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">
                Aucune pharmacie trouvée
              </p>
              <p className="text-sm text-gray-500">
                Essayez de modifier vos filtres ou d'élargir votre recherche
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Styles pour les animations */}
      <style>{`
        @keyframes slideLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideLeft {
          animation: slideLeft 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}

export default PharmacySpace;
