import React, { useState, useEffect, useMemo } from 'react';
import {
  bridgeLeftCollisions,
  bridgeRightCollisions,
  houseInsideCollisions,
} from 'utilities/collisionsData.js';
import {
  bridgeLeftInteractions,
  bridgeRightInteractions,
  houseInsideInteractions,
} from 'utilities/interactionsData.js';
import {
  bridgeLeftGates,
  bridgeRightGates,
  houseInsideGates,
} from 'utilities/gatesData.js';
import bridgeLeft from 'assets/map-assets/bridge-map-left.png';
import bridgeRight from 'assets/map-assets/bridge-map-right.png';
import houseInside from 'assets/map-assets/house-map-inside.png';

const Map_Manager = ({
  currentMap,
  setCurrentMap,
  mapImage,
  setMapImage,
  mapPosition,
  setMapPosition,
  charPosition,
  setCharPosition,
  allowedMovements,
  setAllowedMovements,
  tileSize,
  npcs,
  setNpcs,
  mapColumns,
  setMapColumns,
  setMapRows,
  gates,
  setGates,
}) => {
  const [collisions, setCollisions] = useState(bridgeLeftCollisions);
  const [interactions, setInteractions] = useState(bridgeLeftInteractions);
  const [gatesData, setGatesData] = useState(bridgeLeftGates);
  const [hasMapSwitched, setHasMapSwitched] = useState(false);

  const BLOCKED = 1025;
  const INT = 777;
  const GATE = 500;

  const [color, setColor] = useState('transparent');

  const styles = {
    top: `${-mapPosition.y}px`,
    left: `${-mapPosition.x}px`,
  };

  useEffect(() => {
    if (!mapImage) {
      setMapImage(bridgeLeft);
    }
    if (currentMap === 'bridgeLeft') {
      setMapImage(bridgeLeft);
      if (!hasMapSwitched) {
        setMapPosition({
          x: -377,
          y: -102,
        });
        setCharPosition({ x: 5, y: 5 });
      }
      setMapColumns(11);
      setMapRows(11);
      setCollisions(bridgeLeftCollisions);
      setInteractions(bridgeLeftInteractions);
      setGatesData(bridgeLeftGates);
      setNpcs([
        { id: 1, x: 1, y: 1 },
        { id: 2, x: 6, y: 8 },
        { id: 3, x: 8, y: 8 },
      ]);
      setGates([
        {
          id: 1,
          x: 10,
          y: 4,
          map: 'bridgeRight',
          destPX: -576,
          destPY: -102,
          destX: 1,
          destY: 5,
        },
        {
          id: 2,
          x: 10,
          y: 5,
          map: 'bridgeRight',
          destPX: -576,
          destPY: -102,
          destX: 1,
          destY: 5,
        },
        {
          id: 3,
          x: 10,
          y: 6,
          map: 'bridgeRight',
          destPX: -576,
          destPY: -102,
          destX: 1,
          destY: 5,
        },
      ]);
    } else if (currentMap === 'bridgeRight') {
      setMapImage(bridgeRight);
      if (!hasMapSwitched) {
        setMapPosition({
          x: -377,
          y: -102,
        });
        setCharPosition({ x: 5, y: 5 });
      }
      setMapColumns(11);
      setMapRows(11);
      setCollisions(bridgeRightCollisions);
      setInteractions(bridgeRightInteractions);
      setGatesData(bridgeRightGates);
      setNpcs([
        { id: 1, x: 1, y: 8 },
        { id: 2, x: 3, y: 1 },
        { id: 3, x: 7, y: 7 },
      ]);
      setGates([
        {
          id: 1,
          x: 0,
          y: 4,
          map: 'bridgeLeft',
          destPX: -179.5,
          destPY: -102,
          destX: 9,
          destY: 5,
        },
        {
          id: 2,
          x: 0,
          y: 5,
          map: 'bridgeLeft',
          destPX: -179.5,
          destPY: -102,
          destX: 9,
          destY: 5,
        },
        {
          id: 3,
          x: 0,
          y: 6,
          map: 'bridgeLeft',
          destPX: -179.5,
          destPY: -102,
          destX: 9,
          destY: 5,
        },
        {
          id: 4,
          x: 7,
          y: 4,
          map: 'houseInside',
          destPX: -347.5,
          destPY: 93,
          destX: 5,
          destY: 9,
        },
        {
          id: 5,
          x: 8,
          y: 4,
          map: 'houseInside',
          destPX: -347.5,
          destPY: 93,
          destX: 5,
          destY: 9,
        },
      ]);
    } else if (currentMap === 'houseInside') {
      setMapImage(houseInside);
      if (!hasMapSwitched) {
        setMapPosition({
          x: -377,
          y: 95.5,
        });
        setCharPosition({ x: 5, y: 9 });
      }
      setMapColumns(11);
      setMapRows(11);
      setCollisions(houseInsideCollisions);
      setInteractions(houseInsideInteractions);
      setGatesData(houseInsideGates);
      setNpcs([
        { id: 1, x: 2, y: 8 },
        { id: 2, x: 3, y: 2 },
        { id: 3, x: 8, y: 2 },
      ]);
      setGates([
        {
          id: 1,
          x: 5,
          y: 10,
          map: 'bridgeRight',
          destPX: -252,
          destPY: -112,
          destX: 8,
          destY: 5,
        },
        {
          id: 2,
          x: 6,
          y: 10,
          map: 'bridgeRight',
          destPX: -252,
          destPY: -112,
          destX: 8,
          destY: 5,
        },
      ]);
    }
  }, [currentMap]);

  const collisionMap = useMemo(() => {
    let tempCollisionMap = [];
    for (let i = 0; i < collisions.length; i += mapColumns) {
      tempCollisionMap.push(collisions.slice(i, mapColumns + i));
    }
    return tempCollisionMap;
  }, [collisions, mapColumns]);

  const interactionMap = useMemo(() => {
    let tempInteractionMap = [];
    for (let i = 0; i < interactions.length; i += mapColumns) {
      tempInteractionMap.push(interactions.slice(i, mapColumns + i));
    }
    return tempInteractionMap;
  }, [interactions, mapColumns]);

  const gatesMap = useMemo(() => {
    let tempGatesMap = [];
    for (let i = 0; i < gatesData.length; i += mapColumns) {
      tempGatesMap.push(gatesData.slice(i, mapColumns + i));
    }
    return tempGatesMap;
  }, [gatesData, mapColumns]);

  const isNearNPC = (charX, charY, npcX, npcY) => {
    return Math.abs(charX - npcX) <= 1 && Math.abs(charY - npcY) <= 1;
  };

  const isNearGate = (charX, charY, gateX, gateY) => {
    return Math.abs(charX - gateX) <= 1 && Math.abs(charY - gateY) <= 1;
  };

  // if (
  //   isNearGate(Math.floor(charPosition.x), Math.floor(charPosition.y), 4, 10)
  // ) {
  //   console.log(`Character is near a gate.`);
  // }

  useEffect(() => {
    let isNearAnyGate = false;

    gates.forEach((gate) => {
      const gateX = gate.x;
      const gateY = gate.y;

      if (
        isNearGate(
          Math.floor(charPosition.x),
          Math.floor(charPosition.y),
          gateX,
          gateY
        )
      ) {
        console.log(`Character is near Gate with ID: ${gate.id}`);
        isNearAnyGate = true;
      }
    });

    if (isNearAnyGate) {
      setColor('orange');
    } else {
      setColor('transparent');
    }

    npcs.forEach((npc) => {
      const npcX = npc.x;
      const npcY = npc.y;

      if (
        isNearNPC(
          Math.floor(charPosition.x),
          Math.floor(charPosition.y),
          npcX,
          npcY
        )
      ) {
        console.log(`Character is near NPC with ID: ${npc.id}`);
      }
    });
    console.log(mapPosition);
    console.log(charPosition);
  }, [charPosition]);

  const checkCollisions = (position, collisionMap) => {
    const x = Math.floor(position.x);
    const y = Math.floor(position.y);

    let allowed = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const isBlocked = (y, x) =>
      collisionMap[y][x] === BLOCKED || interactionMap[y][x] === INT;

    if (y - 1 >= 0 && isBlocked(y - 1, x)) {
      allowed.up = false;
    }

    if (y + 1 < collisionMap.length && isBlocked(y + 1, x)) {
      allowed.down = false;
    }

    if (x - 1 >= 0 && isBlocked(y, x - 1)) {
      allowed.left = false;
    }

    if (x + 1 < collisionMap[0].length && isBlocked(y, x + 1)) {
      allowed.right = false;
    }

    if (
      allowed.up !== allowedMovements.up ||
      allowed.down !== allowedMovements.down ||
      allowed.left !== allowedMovements.left ||
      allowed.right !== allowedMovements.right
    ) {
      setAllowedMovements(allowed);
    }
  };

  useEffect(() => {
    checkCollisions(charPosition, collisionMap);
  }, [charPosition, collisionMap]);

  // console.log(collisionMap);
  useEffect(() => {
    gates.forEach((gate) => {
      const gateX = gate.x;
      const gateY = gate.y;
      const destination = gate.map;

      if (
        Math.floor(charPosition.x) === gateX &&
        Math.floor(charPosition.y) === gateY
      ) {
        console.log(`Character entered Gate with ID: ${gate.id}`);
        setCurrentMap(destination);
        setMapPosition({ x: gate.destPX, y: gate.destPY });
        setCharPosition({ x: gate.destX, y: gate.destY });
        setHasMapSwitched(true);
      }
    });
  }, [charPosition]);

  return (
    <div className="collision-container" style={styles}>
      {collisionMap.map((row, rowIndex) =>
        row.map((collisionPoint, colIndex) => (
          // Attach the key to the fragment
          <React.Fragment key={`${rowIndex}-${colIndex}`}>
            {collisionPoint === BLOCKED && (
              <div
                className="collision-zone"
                style={{
                  top: `${rowIndex * tileSize}px`,
                  left: `${colIndex * tileSize}px`,
                  backgroundColor: 'red',
                }}
              />
            )}
            {interactionMap[rowIndex][colIndex] === INT && (
              <div
                className="interaction-zone"
                style={{
                  top: `${rowIndex * tileSize}px`,
                  left: `${colIndex * tileSize}px`,
                  width: `${tileSize}px`,
                  height: `${tileSize}px`,
                  backgroundColor: 'green',
                }}
              />
            )}
            {gatesMap[rowIndex][colIndex] === GATE && (
              <div
                className="gate-zone"
                style={{
                  top: `${rowIndex * tileSize}px`,
                  left: `${colIndex * tileSize}px`,
                  width: `${tileSize}px`,
                  height: `${tileSize}px`,
                  backgroundColor: color,
                }}
              />
            )}

            {rowIndex === Math.floor(charPosition.y) &&
              colIndex === Math.floor(charPosition.x) && (
                <div
                  className="player-zone"
                  style={{
                    top: `${rowIndex * tileSize}px`,
                    left: `${colIndex * tileSize}px`,
                    width: `${tileSize}px`,
                    height: `${tileSize}px`,
                    backgroundColor: 'blue',
                  }}
                />
              )}
            {/* {console.log(`charPosition: ${charPosition.x}, ${charPosition.y}`)} */}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default Map_Manager;
