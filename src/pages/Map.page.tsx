import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
// import DriftMarker from 'react-leaflet-drift-marker'; // ← reemplazo
import L from 'leaflet';
import io, { Socket } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import 'leaflet.motion/dist/leaflet.motion.min.js';
import { useParams } from 'react-router-dom';

const SOCKET_URL = 'http://localhost:5000';
// const PLATE = 'MPP353';

const motoIcon = new L.Icon({
  iconUrl: '/marker.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const MapTracker: React.FC = () => {
  const [position, setPosition] = useState<[number, number]>([5.055377, -75.490601]);
  const socketRef = useRef<Socket>();
  const markerRef = useRef<any>(null);
  const { PLATE } = useParams();

  const init = () => fetch(`${SOCKET_URL}/motorcycles/track/${PLATE}`, { method: 'POST' });

  useEffect(() => {
    init();
    socketRef.current = io(SOCKET_URL);
    socketRef.current.on(PLATE, () => {
      console.log('Socket conectado', socketRef.current!.id);
    });

    socketRef.current.on(PLATE, (coord: { lat: number; lng: number }) => {
      const newPos: [number, number] = [coord.lat, coord.lng];
      // Desplazamiento suave
      if (markerRef.current?.animateMarker) {
        markerRef.current.animateMarker(newPos, { duration: 100 });
      }
      setPosition(newPos);
    });

    socketRef.current.connect();

    return () => {
      fetch(`${SOCKET_URL}/motorcycles/stop/${PLATE}`, { method: 'POST' });
      socketRef.current?.off(PLATE);
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <MapContainer center={position} zoom={15} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <Marker position={position} icon={motoIcon} ref={markerRef} />
      </MapContainer>
    </>
  );
};

export default MapTracker;
