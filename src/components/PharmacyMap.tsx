import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import type { PharmacyModel } from "../models/pharmacyModel";

interface Props {
  userPosition?: { lat: number; lng: number };
  center?: { lat: number; lng: number };
  pharmacies?: PharmacyModel[];
  onSelect?: (pharmacy: PharmacyModel) => void;
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function PharmacyMap({
  userPosition,
  center,
  pharmacies = [],
  onSelect,
}: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [selected, setSelected] = useState<PharmacyModel | null>(null);

  if (!isLoaded) return <div>Chargement de la carte...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || userPosition}
      zoom={14}
    >
      {/* position utilisateur */}
      {userPosition && (
        <Marker
          position={userPosition}
          icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
      )}

      {/* pharmacies */}
      {pharmacies.map((pharmacy) => (
        <Marker
          key={pharmacy.id}
          position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
          onClick={() => setSelected(pharmacy)}
        />
      ))}

      {/* info */}
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h3 className="font-bold">{selected.name}</h3>
            <p>{selected.address}</p>
            <button
              onClick={() => onSelect?.(selected)}
              className="text-blue-600"
            >
              Voir
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
