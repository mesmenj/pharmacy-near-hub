import { useState, useEffect, useMemo } from "react";
import { Search, Navigation } from "lucide-react";
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

const PharmacyNearHubLanding = () => {
  const {} = use_init();

  const { dataPharmacy } = useSelector((state: STATE) => state.pharmacy);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showChatModal, setShowChatModal] = useState(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>();
  const [place, setPlace] = useState<Record<string, string>>();

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

  // Rechercher les pharmacies
  const searchedPharmacies = filteredPharmacies.filter(
    (pharmacy: any) =>
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
      .slice(0, 20); // ⭐ max 20
  }, [searchedPharmacies, mapCenter]);

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {/* LISTE */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow p-4 h-[500px] overflow-y-auto">
              <h3 className="font-semibold mb-4">
                Pharmacies proches ({pharmaciesWithDistance.length})
              </h3>

              {pharmaciesWithDistance.map((pharmacy: any) => (
                <div
                  key={pharmacy.id}
                  className="border-b py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setMapCenter({ lat: pharmacy.lat, lng: pharmacy.lng })
                  }
                >
                  <div className="font-medium">{pharmacy.name}</div>
                  <div className="text-sm text-gray-500">
                    {pharmacy.address}
                  </div>
                  <div className="text-sm text-blue-600 font-semibold">
                    {pharmacy.distance.toFixed(2)} km
                  </div>
                </div>
              ))}
            </div>

            {/* MAP */}
            <div className="lg:col-span-2">
              <PharmacyMap
                userPosition={location}
                center={mapCenter}
                pharmacies={pharmaciesWithDistance}
                onSelect={(pharmacy) => {
                  console.log("open pharmacy", pharmacy);
                }}
              />
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative top-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Recherchez une adresse ou une pharmacie ..."
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

      <FeaturesSection />
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
