import { useState, useEffect } from "react";
import { MapPin, Clock, MessageCircle, Search, Navigation } from "lucide-react";
import ChatModal from "../../components/ChatModal";
import CTA from "./components/CTA";
import HowItWorks from "./components/HowItWorks";
import PharmacySpace from "./components/PharmacySpace";
import FeaturesSection from "./components/FeaturesSection";
import { useGeolocation } from "../../hooks/useGeolocation";
import PharmacyMap from "../../components/PharmacyMap";
import { geocodeAddress } from "../../utils/general";
import { pharmacies } from "../../utils/constants";

const PharmacyNearHubLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showChatModal, setShowChatModal] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>();

  const [selectedPharmacy, setSelectedPharmacy] =
    useState<Record<string, any>>();

  const { location } = useGeolocation();

  // console.log("location", selectedPharmacy);
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
  const [place, setPlace] = useState<Record<string, string>>();

  useEffect(() => {
    (async () => {
      const { lat, lon } = await getPosition();
      const data = await reverseGeocode(lat, lon);

      setPlace(data.address);
    })();
  }, []);

  // Filtrer les pharmacies
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    if (activeFilter === "open") return pharmacy.isOpen;
    if (activeFilter === "24h") return pharmacy.openingHours === "24/7";
    return true;
  });

  // Rechercher les pharmacies
  const searchedPharmacies = filteredPharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = async (e: any) => {
    e.preventDefault();

    try {
      const coords = await geocodeAddress(searchQuery);

      setMapCenter(coords); // ⭐ la carte bouge ici
    } catch (err) {
      console.log(err);
    }
  };

  const handleChatWithPharmacy = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy);
    setShowChatModal(true);
  };

  const handleChatWithAll = () => {
    setSelectedPharmacy({ lat: null, lng: null });
    setShowChatModal(true);
  };

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localisation en temps réel",
      description:
        "Trouvez les pharmacies les plus proches de votre position actuelle ou d'un lieu choisi.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horaires actualisés",
      description:
        "Consultez les heures d'ouverture et de fermeture pour aujourd'hui.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Chat direct",
      description:
        "Communiquez directement avec une pharmacie ou avec toutes les pharmacies de la plateforme.",
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: "Navigation intégrée",
      description:
        "Visualisez la distance et obtenez l'itinéraire sur une carte interactive.",
    },
  ];

  useEffect(() => {
    if (location) {
      setMapCenter(location);
    }
  }, [location]);

  return (
    <div className="w-full bg-[#F9FAFB] text-[#1F2937]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Trouvez la <span className="text-blue-600">pharmacie</span> la plus
            proche
          </h1>
          <p className="text-xl text-[#6B7280] mb-10">
            Localisez, contactez et naviguez vers les pharmacies autour de vous
            avec toutes les informations essentielles.
          </p>
          {/*Map Section */}
          <PharmacyMap
            userPosition={location}
            center={mapCenter}
            pharmacies={searchedPharmacies}
            onSelect={(pharmacy) => {
              console.log("open pharmacy", pharmacy);
            }}
          />

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative top-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Recherchez une pharmacie, une spécialité ou une adresse..."
                className="w-full p-4 pl-12 pr-4 rounded-xl border-2 border-[#E5E7EB] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Rechercher
              </button>
            </div>
          </form>

          {/* User Location */}
          {place && (
            <div className="inline-flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-[#E5E7EB]">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-[#6B7280]">
                Position actuelle :
              </span>
              <span className="font-medium">{`${place.suburb}, ${place.city_district}`}</span>
            </div>
          )}
        </div>
      </section>

      <FeaturesSection features={features} />
      <PharmacySpace
        searchedPharmacies={searchedPharmacies}
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
