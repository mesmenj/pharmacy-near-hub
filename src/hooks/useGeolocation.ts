// hooks/useGeolocation.ts
import { useEffect, useState } from "react";

export interface Location {
  lat: number;
  lng: number;
}

export function useGeolocation(options?: PositionOptions) {
  const [location, setLocation] = useState<Location | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => setError(err.message),
      {
        enableHighAccuracy: true,
        maximumAge: 10_000, // cache 10s
        timeout: 10_000,
        ...options,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error };
}
