import { useState, useEffect } from "react";
import { MapPin, Clock, MessageCircle, Search, Navigation } from "lucide-react";
import ChatModal from "../../components/ChatModal";
import CTA from "./components/CTA";
import HowItWorks from "./components/HowItWorks";
import PharmacySpace from "./components/PharmacySpace";
import FeaturesSection from "./components/FeaturesSection";
import { useGeolocation } from "../../hooks/useGeolocation";

const PharmacyNearHubLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [userLocation, setUserLocation] = useState(null) as any;

  // console.log("location", location);
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

  // Données simulées pour les pharmacies
  // console.log("place", place);
  const pharmacies = [
    {
      id: 1,
      name: "Pharmacie Centrale",
      address: "123 Rue Principale, Paris 75001",
      distance: "0.5 km",
      openingHours: "08:30 - 19:30",
      phone: "+33 1 23 45 67 89",
      rating: 4.8,
      open: true,
      specialties: ["Médicaments", "Parapharmacie", "Vaccinations"],
    },
    {
      id: 2,
      name: "Pharmacie de Garde",
      address: "456 Avenue des Champs, Paris 75008",
      distance: "1.2 km",
      openingHours: "24/7",
      phone: "+33 1 98 76 54 32",
      rating: 4.9,
      open: true,
      specialties: ["Garde", "Urgences", "Conseils"],
    },
    {
      id: 3,
      name: "Pharmacie Santé Plus",
      address: "789 Boulevard Voltaire, Paris 75011",
      distance: "2.1 km",
      openingHours: "09:00 - 20:00",
      phone: "+33 1 45 67 89 01",
      rating: 4.6,
      open: false,
      specialties: ["Naturel", "Homéopathie", "Nutrition"],
    },
    {
      id: 4,
      name: "Pharmacie du Quartier",
      address: "321 Rue de Rivoli, Paris 75004",
      distance: "1.8 km",
      openingHours: "08:00 - 21:00",
      phone: "+33 1 34 56 78 90",
      rating: 4.7,
      open: true,
      specialties: ["Pédiatrie", "Dermatologie", "Premiers soins"],
    },
  ];

  // Filtrer les pharmacies
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    if (activeFilter === "open") return pharmacy.open;
    if (activeFilter === "24h") return pharmacy.openingHours === "24/7";
    return true;
  });

  // Rechercher les pharmacies
  const searchedPharmacies = filteredPharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleSearch = (e: any) => {
    e.preventDefault();
    // Logique de recherche
  };

  const handleChatWithPharmacy = (pharmacy: any) => {
    setSelectedPharmacy(pharmacy);
    setShowChatModal(true);
  };

  const handleChatWithAll = () => {
    setSelectedPharmacy(null);
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

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
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
