import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function KakaoMap({ coords }: any) {
  const defaultCenter = { lat: 33.5563, lng: 126.79581 };
  const defaultMarkerPosition = { lat: 33.55635, lng: 126.795841 };

  const center = coords ? { lat: coords.lat, lng: coords.lng } : defaultCenter;
  const markerPosition = coords ? { lat: coords.lat, lng: coords.lng } : defaultMarkerPosition;

  return (
    <div>
      <Map className="w-full border-2 border-brand_3 h-96 mt-5" center={center} level={3}>
        {coords && <MapMarker position={markerPosition} />}
      </Map>
    </div>
  );
}
