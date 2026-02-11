import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import type { PharmacyModel } from "../models/pharmacyModel";

interface Props {
  userPosition?: { lat: number; lng: number };
  center?: { lat: number; lng: number };
  pharmacies?: PharmacyModel[] | any;
  onSelect?: (pharmacy: PharmacyModel) => void;
  height?: string;
}

export default function PharmacyMap({
  userPosition,
  center,
  pharmacies = [],
  onSelect,
  height = "500px",
}: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [selected, setSelected] = useState<PharmacyModel | null>(null);
  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height,
      borderRadius: "0.75rem",
      overflow: "hidden",
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)",
    }),
    [height]
  );

  if (!isLoaded) return <div>Chargement de la carte...</div>;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || userPosition}
        zoom={14}
        options={{
          // styles: mapStyles,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          gestureHandling: "greedy",
        }}
      >
        {/* position utilisateur */}
        {userPosition && (
          <Marker
            position={userPosition}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}

        {/* pharmacies */}
        {pharmacies.map((pharmacy: any) => (
          <Marker
            key={pharmacy.id}
            position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
            onClick={() => setSelected(pharmacy)}
            // icon={pharmacyIcon}
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
    </div>
  );
}
