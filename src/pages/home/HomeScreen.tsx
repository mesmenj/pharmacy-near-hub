import { useState, useEffect, useMemo } from "react";
import { Search, Navigation, Filter } from "lucide-react";
import ChatModal from "../../components/ChatModal";
import CTA from "./components/CTA";
import HowItWorks from "./components/HowItWorks";
import PharmacySpace from "./components/PharmacySpace";
import FeaturesSection from "./components/FeaturesSection";
import { useGeolocation } from "../../hooks/useGeolocation";
import PharmacyMap from "../../components/PharmacyMap";
import { geocodeAddress, getDistanceKm } from "../../utils/general";
import use_init from "../../utils/useInit";
import { useSelector } from "react-redux";
import type { STATE } from "../../store/state";
import type { PharmacyModel } from "../../models/pharmacyModel";

const PharmacyNearHubLanding = () => {
  const {} = use_init();

  const { dataPharmacy } = useSelector((state: STATE) => state.pharmacy);
  const [selected, setSelected] = useState<PharmacyModel | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showChatModal, setShowChatModal] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>();
  const [place, setPlace] = useState<Record<string, string>>();
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { location }: any = useGeolocation();

  const getPosition = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }),
        reject
      );
    });
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    (async () => {
      const { lat, lon } = await getPosition();
      const data = await reverseGeocode(lat, lon);
      setPlace(data.address);
    })();
  }, []);

  // Filtrer les pharmacies
  const filteredPharmacies = Object.values(dataPharmacy).filter(
    (pharmacy: any) => {
      if (activeFilter === "open") return pharmacy.isOpen;
      if (activeFilter === "24h") return pharmacy.openingHours === "24/7";
      return true;
    }
  );

  // Pharmacies avec distance depuis l'utilisateur
  const pharmaciesUserWithDistance = useMemo(() => {
    if (!location) return [];
    return filteredPharmacies
      .map((pharmacy: any) => ({
        ...pharmacy,
        distance: getDistanceKm(location, {
          lat: pharmacy.lat,
          lng: pharmacy.lng,
        }),
      }))
      .sort((a: any, b: any) => a.distance - b.distance)
      .slice(0, 20);
  }, [location, filteredPharmacies]);

  // Pharmacies recherchées
  const searchedPharmacies = filteredPharmacies.filter(
    (pharmacy: any) =>
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = async (e: any) => {
    e.preventDefault();
    try {
      const coords = await geocodeAddress(searchQuery);
      setMapCenter(coords);
      setShowMobileMap(true); // Sur mobile, afficher la carte après recherche
    } catch (err) {
      console.log(err);
    }
  };

  const handleChatWithPharmacy = () => {
    setShowChatModal(true);
  };

  const handleChatWithAll = () => {
    setShowChatModal(true);
  };

  const pharmaciesWithDistance = useMemo(() => {
    if (!mapCenter) return [];
    return searchedPharmacies
      .map((pharmacy: any) => ({
        ...pharmacy,
        distance: getDistanceKm(mapCenter, {
          lat: pharmacy.lat,
          lng: pharmacy.lng,
        }),
      }))
      .sort((a: any, b: any) => a.distance - b.distance)
      .slice(0, 20);
  }, [searchedPharmacies, mapCenter]);

  useEffect(() => {
    if (location) {
      setMapCenter(location);
    }
  }, [location]);

  return (
    <div className="w-full bg-[#F9FAFB] text-[#1F2937] min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 px-2">
            Trouvez la <span className="text-blue-600">pharmacie</span> la plus
            proche
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#6B7280] mb-6 md:mb-10 px-4">
            Localisez, contactez et naviguez vers les pharmacies autour de vous
            où autour d'une adresse de votre choix.
          </p>

          {/* Search Bar - Optimisée mobile */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-4 md:mb-6 px-2"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={"Entrer une adresse ou une pharmacie..."}
                className="w-full p-3 sm:p-4  pr-15 sm:pr-20 rounded-lg sm:rounded-xl border-2 border-[#E5E7EB] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
              >
                <Search />
              </button>
            </div>
          </form>

          {/* User Location - Compact sur mobile */}
          {place && (
            <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm border border-[#E5E7EB] max-w-full mx-2">
              <Navigation className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#6B7280] truncate">
                Position actuelle :
              </span>
              <span className="font-medium text-xs sm:text-sm truncate">{`${
                place.suburb || place.city || ""
              }, ${place.city_district || place.state || ""}`}</span>
            </div>
          )}
        </div>

        {/* Map Section - Optimisée mobile avec toggle */}
        <div className="relative mt-6 md:mt-10">
          {/* Mobile toggle buttons */}
          <div className="lg:hidden flex justify-center space-x-2 mb-4">
            <button
              onClick={() => setShowMobileMap(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !showMobileMap
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              Liste ({pharmaciesWithDistance.length})
            </button>
            <button
              onClick={() => setShowMobileMap(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showMobileMap
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              Carte
            </button>
          </div>

          {/* Conteneur principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Liste des pharmacies - responsive */}
            <div
              className={`
                ${showMobileMap ? "hidden" : "block"} 
                lg:block lg:col-span-1 
                bg-white rounded-xl shadow-lg
                h-[60vh] sm:h-[70vh] lg:h-[600px] 
                overflow-y-auto
              `}
            >
              <div className="sticky top-0 bg-white p-3 sm:p-4 border-b border-gray-200 z-10">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm sm:text-base">
                    Pharmacies proches ({pharmaciesWithDistance.length})
                  </h3>
                  {/* Filtres mobiles */}
                  <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden flex items-center space-x-1 text-blue-600"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm">Filtres</span>
                  </button>
                </div>

                {/* Filtres mobiles déroulants */}
                {showMobileFilters && (
                  <div className="mt-3 flex space-x-2 overflow-x-auto pb-2">
                    {["all", "open", "24h"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setActiveFilter(filter);
                          setShowMobileFilters(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                          activeFilter === filter
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {filter === "all" && "Toutes"}
                        {filter === "open" && "Ouvertes"}
                        {filter === "24h" && "24h/24"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {pharmaciesWithDistance.length > 0 ? (
                  pharmaciesWithDistance.map((pharmacy: any) => (
                    <div
                      key={pharmacy.id}
                      className="border rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
                      onClick={() => {
                        setMapCenter({ lat: pharmacy.lat, lng: pharmacy.lng });
                        setSelected(pharmacy);

                        if (window.innerWidth < 1024) {
                          setShowMobileMap(true);
                        }
                      }}
                    >
                      <div className="font-medium text-sm sm:text-base mb-1">
                        {pharmacy.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 mb-1 line-clamp-2">
                        {pharmacy.address}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-blue-600 font-semibold">
                          {pharmacy.distance?.toFixed(2)} km
                        </span>
                        {pharmacy.isOpen && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                            Ouvert
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    Aucune pharmacie trouvée
                  </div>
                )}
              </div>
            </div>

            {/* Carte - responsive */}
            <div
              className={`
                ${!showMobileMap ? "hidden" : "block"} 
                lg:block lg:col-span-2
                h-[60vh] sm:h-[70vh] lg:h-[600px]
                rounded-xl overflow-hidden shadow-lg
              `}
            >
              <PharmacyMap
                userPosition={location}
                center={mapCenter}
                pharmacies={pharmaciesWithDistance}
                // onSelect={(pharmacy) => {
                //   // console.log("open pharmacy", pharmacy);
                //   handleChatWithPharmacy();
                // }}
                setSelected={setSelected}
                selected={selected}
              />
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <PharmacySpace
        searchedPharmacies={pharmaciesUserWithDistance}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        handleChatWithPharmacy={handleChatWithPharmacy}
      />
      <HowItWorks />
      <CTA handleChatWithAll={handleChatWithAll} />
      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
      />
    </div>
  );
};

export default PharmacyNearHubLanding;
