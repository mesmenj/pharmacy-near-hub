import {
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Star,
} from "lucide-react";

interface Props {
  searchedPharmacies?: any;
  setActiveFilter?: (val: string) => void;
  activeFilter?: string;
  handleChatWithPharmacy?: (val: any) => void;
}

function PharmacySpace({
  searchedPharmacies,
  setActiveFilter,
  activeFilter,
  handleChatWithPharmacy,
}: Props) {
  return (
    <section id="pharmacies" className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Pharmacies à proximité</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveFilter?.("all")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-[#6B7280] border border-[#E5E7EB]"
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setActiveFilter?.("open")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "open"
                ? "bg-blue-600 text-white"
                : "bg-white text-[#6B7280] border border-[#E5E7EB]"
            }`}
          >
            Ouvertes maintenant
          </button>
          <button
            onClick={() => setActiveFilter?.("24h")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "24h"
                ? "bg-blue-600 text-white"
                : "bg-white text-[#6B7280] border border-[#E5E7EB]"
            }`}
          >
            24h/24
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedPharmacies.map((pharmacy: any) => (
          <div
            key={pharmacy.id}
            className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow flex flex-col h-full"
          >
            <div className="flex flex-col p-6 h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{pharmacy.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm text-[#6B7280]">
                      {pharmacy.address}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{pharmacy.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm">Horaires</span>
                  </div>
                  <span
                    className={`font-medium ${
                      pharmacy.open ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {pharmacy.openingHours}{" "}
                    {pharmacy.open ? "(Ouverte)" : "(Fermée)"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm">Distance</span>
                  </div>
                  <span className="font-medium">{pharmacy.distance}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {/* {pharmacy.specialties.map((specialty: any, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))} */}
                </div>
              </div>

              <div className="flex space-x-3 mt-auto">
                <a
                  href={`tel:${pharmacy.phone}`}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler</span>
                </a>
                <button
                  onClick={() => handleChatWithPharmacy?.(pharmacy)}
                  className="flex-1 flex items-center justify-center space-x-2 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chatter</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PharmacySpace;
