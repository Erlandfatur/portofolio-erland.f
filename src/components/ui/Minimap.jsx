import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export function Minimap({ playerPosition, onFastTravel }) {
  const mapSize = 130;
  const worldRadius = 24;

  const toMapX = (worldX) => ((worldX + worldRadius) / (worldRadius * 2)) * mapSize;
  const toMapY = (worldZ) => ((worldZ + worldRadius) / (worldRadius * 2)) * mapSize;

  const playerMapX = toMapX(playerPosition[0]);
  const playerMapY = toMapY(playerPosition[2]);

  return (
    <div className="fixed bottom-5 right-5 z-20 hidden sm:block">
      <div className="relative p-2 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 shadow-2xl shadow-black/50">
        <div className="text-[10px] font-bold text-slate-400 mb-1.5 flex items-center justify-between px-1">
          <span className="tracking-wider text-cyan-400 uppercase font-heading">Radar Map</span>
          <span className="text-[9px] text-slate-500">Tap pin to travel</span>
        </div>

        <div
          className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800"
          style={{ width: `${mapSize}px`, height: `${mapSize}px` }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          
          {/* Radar Sweep Animation */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 pointer-events-none"></div>

          {/* Island pins */}
          {portfolioData.worldZones.map((zone) => {
            const zx = toMapX(zone.position[0]);
            const zy = toMapY(zone.position[2]);
            return (
              <button
                key={zone.id}
                onClick={() => onFastTravel(zone.id)}
                title={zone.title}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${zx}px`, top: `${zy}px` }}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white/80 shadow-md group-hover:scale-150 transition-transform"
                  style={{ backgroundColor: zone.color }}
                />
              </button>
            );
          })}

          {/* Real-time Player Blip */}
          <div
            className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${playerMapX}px`, top: `${playerMapY}px` }}
          >
            <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75"></span>
            <span className="relative block w-3 h-3 rounded-full bg-cyan-300 border-2 border-white shadow-lg"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
