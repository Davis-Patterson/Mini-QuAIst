import React, { useState, useEffect, useMemo } from 'react';
import {
  smallCollisions,
  exampleCollisions,
} from 'utilities/collisionsData.js';
import {
  smallInteractions,
  exampleInteractions,
} from 'utilities/interactionsData.js';
import exampleMap from 'assets/map-assets/example-map-zoom.png';
import smallMap from 'assets/map-assets/small-map-zoom.png';

const Map_Manager = ({
  currentMap,
  mapImage,
  setMapImage,
  mapPosition,
  setMapPosition,
  charPosition,
  allowedMovements,
  setAllowedMovements,
  tileSize,
  setNpcs,
  mapColumns,
  setMapColumns,
  setMapRows,
}) => {
  const [collisions, setCollisions] = useState(exampleCollisions);
  const [interactions, setInteractions] = useState(exampleInteractions);

  const BLOCKED = 1025;
  const INT = 1106;

  const styles = {
    top: `${-mapPosition.y}px`,
    left: `${-mapPosition.x}px`,
  };

  useEffect(() => {
    if (!mapImage) {
      setMapImage(exampleMap);
    }
    if (currentMap === 'small') {
      setMapImage(smallMap);
      setMapPosition({
        x: -377,
        y: -102,
      });
      setMapColumns(11);
      setMapRows(11);
      setCollisions(smallCollisions);
      setNpcs([
        { id: 1, x: 1, y: 1 },
        { id: 2, x: 8, y: 6 },
        { id: 3, x: 8, y: 8 },
      ]);
      setInteractions(smallInteractions);
    } else if (currentMap === 'example') {
      setMapImage(exampleMap);
      setMapPosition({
        x: 1040,
        y: 600,
      });
      setMapColumns(70);
      setMapRows(40);
      setCollisions(exampleCollisions);
      setNpcs([
        { id: 1, x: 2, y: 3 },
        { id: 2, x: 10, y: 5 },
        { id: 3, x: 23, y: 34 },
        { id: 4, x: 33, y: 4 },
        { id: 5, x: 52, y: 9 },
        { id: 6, x: 66, y: 34 },
        { id: 7, x: 67, y: 2 },
      ]);
      setInteractions(exampleInteractions);
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
