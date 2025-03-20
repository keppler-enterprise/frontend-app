import React, { useState } from 'react';
import { Globe, Navigation } from 'lucide-react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const CoordinatesPanel = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0
  });

  return (
    <div className="absolute bottom-4 left-4 bg-black/80 text-white p-6 rounded-lg backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Coordinates Control</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Latitude</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={coordinates.latitude}
              onChange={(e) => setCoordinates(prev => ({ ...prev, latitude: parseFloat(e.target.value) }))}
              className="bg-gray-800 border border-gray-600 rounded px-3 py-2 w-32 text-white"
              min="-90"
              max="90"
              step="0.1"
            />
            <span className="text-sm text-gray-400">°N/S</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-1">Longitude</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={coordinates.longitude}
              onChange={(e) => setCoordinates(prev => ({ ...prev, longitude: parseFloat(e.target.value) }))}
              className="bg-gray-800 border border-gray-600 rounded px-3 py-2 w-32 text-white"
              min="-180"
              max="180"
              step="0.1"
            />
            <span className="text-sm text-gray-400">°E/W</span>
          </div>
        </div>

        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          onClick={() => {/* Implement focus on coordinates */}}
        >
          <Navigation className="w-4 h-4" />
          Focus Location
        </button>
      </div>
    </div>
  );
};

export default CoordinatesPanel;