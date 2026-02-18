import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import type { PharmacyModel } from "../models/pharmacyModel";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";

interface Props {
  userPosition?: { lat: number; lng: number };
  center?: { lat: number; lng: number };
  pharmacies?: PharmacyModel[] | any;
  onSelect?: (pharmacy: PharmacyModel) => void;
  setSelected?: (pharmacy: PharmacyModel | any) => void;
  selected?: PharmacyModel | any;

  height?: string;
  className?: string;
}

const mapLibraries: ["places"] = ["places"];

export default function PharmacyMap({
  userPosition,
  center,
  pharmacies = [],
  onSelect,
  height = "500px",
  setSelected,
  selected,
  className = "",
}: Props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: mapLibraries,
  });

  // console.log("onSelect", onSelect);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  // const [showList, setShowList] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Style du conteneur responsive
  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: isMobile ? "calc(100vh - 200px)" : height,
      borderRadius: isMobile ? "0" : "0.75rem",
      overflow: "hidden",
      boxShadow: isMobile
        ? "none"
        : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)",
    }),
    [height, isMobile]
  );

  // Options de la carte adaptées au mobile
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: isMobile, // Désactive l'UI par défaut sur mobile
      zoomControl: !isMobile, // Zoom control seulement sur desktop
      mapTypeControl: false,
      scaleControl: !isMobile,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: !isMobile,
      gestureHandling: isMobile ? "greedy" : "auto", // Meilleur touch sur mobile
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }], // Cache les POI pour plus de clarté
        },
      ],
    }),
    [isMobile]
  );

  // Icônes personnalisées
  // const userIcon = useMemo(
  //   () => ({
  //     url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  //     scaledSize: isMobile
  //       ? new google.maps.Size(32, 32)
  //       : new google.maps.Size(40, 40),
  //   }),
  //   [isMobile]
  // );

  // const pharmacyIcon = useMemo(
  //   () => ({
  //     url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  //     scaledSize: isMobile
  //       ? new google.maps.Size(28, 28)
  //       : new google.maps.Size(36, 36),
  //   }),
  //   [isMobile]
  // );

  // Gestionnaire d'erreur de chargement
  if (loadError) {
    return (
      <div className="w-full h-full min-h-[300px] bg-red-50 rounded-xl flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">
            Erreur de chargement de la carte
          </p>
          <p className="text-sm text-gray-600">Veuillez réessayer plus tard</p>
        </div>
      </div>
    );
  }

  // État de chargement
  if (!isLoaded) {
    return (
      <div className="w-full h-full min-h-[300px] bg-gray-50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Carte Google */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || userPosition || { lat: 48.8566, lng: 2.3522 }} // Paris par défaut
        zoom={isMobile ? 13 : 14}
        options={mapOptions}
        onLoad={(map) => setMap(map)}
      >
        {/* Position utilisateur */}
        {userPosition && (
          <Marker
            position={userPosition}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            title="Votre position"
            animation={window.google?.maps?.Animation?.DROP}
          />
        )}

        {/* Pharmacies */}
        {pharmacies.map((pharmacy: any) => (
          <Marker
            key={pharmacy.id}
            position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
            onClick={() => {
              setSelected?.(pharmacy);
              if (isMobile && map) {
                map.panTo({ lat: pharmacy.lat, lng: pharmacy.lng });
                map.setZoom(16);
              }
            }}
            // icon={pharmacyIcon}
            title={pharmacy.name}
            animation={
              selected?.id === pharmacy.id
                ? window.google?.maps?.Animation?.BOUNCE
                : undefined
            }
          />
        ))}

        {/* InfoWindow - Version responsive */}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected?.(null)}
            options={{
              maxWidth: isMobile ? window.innerWidth - 40 : 320,
              pixelOffset: new window.google.maps.Size(0, -30),
            }}
          >
            <div className="p-2 sm:p-3 max-w-[280px] sm:max-w-sm">
              {/* En-tête avec nom et bouton fermer */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-sm sm:text-base pr-6">
                  {selected.name}
                </h3>
                <button
                  onClick={() => setSelected?.(null)}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Fermer"
                >
                  {/* <X className="w-4 h-4 text-gray-500" /> */}
                </button>
              </div>

              {/* Adresse */}
              <p className="text-xs sm:text-sm text-gray-600 mb-2 flex items-start gap-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 text-gray-400" />
                <span>{selected.address}</span>
              </p>

              {/* Statut d'ouverture */}
              {selected.openingHours && (
                <div className="flex items-center gap-1 mb-3 text-xs sm:text-sm">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span
                    className={
                      selected.isOpen ? "text-green-600" : "text-red-600"
                    }
                  >
                    {selected.isOpen ? "Ouvert" : "Fermé"}
                  </span>
                  <span className="text-gray-500 ml-1">
                    · {selected.openingHours}
                  </span>
                </div>
              )}

              {/* Téléphone si disponible */}
              {selected.phone && (
                <div className="flex items-center gap-1 mb-3 text-xs sm:text-sm">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <a
                    href={`tel:${selected.phone}`}
                    className="text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {selected.phone}
                  </a>
                </div>
              )}

              {/* Bouton d'action */}
              <button
                onClick={() => {
                  onSelect?.(selected);
                  // if (isMobile) setShowList(false);
                }}
                className="w-full bg-blue-600 text-white text-xs sm:text-sm py-2 sm:py-2.5 px-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Voir les détails
              </button>

              {/* Navigation si position utilisateur disponible */}
              {userPosition && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userPosition.lat},${userPosition.lng}&destination=${selected.lat},${selected.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-1 text-xs sm:text-sm text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Itinéraire</span>
                </a>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Bouton de recentrage - mobile */}
      {isMobile && userPosition && (
        <button
          onClick={() => {
            map?.panTo(userPosition);
            map?.setZoom(14);
          }}
          className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-10"
          aria-label="Recentrer sur ma position"
        >
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>
      )}

      {/* Compteur de pharmacies - mobile */}
      {isMobile && pharmacies.length > 0 && (
        <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md border border-gray-200 z-10">
          <p className="text-sm font-medium">
            {pharmacies.length} pharmacie{pharmacies.length > 1 ? "s" : ""}{" "}
            trouvée
            {pharmacies.length > 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}
