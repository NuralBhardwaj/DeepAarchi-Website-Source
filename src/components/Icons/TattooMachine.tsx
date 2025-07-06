import React from 'react';
import tattooImage from './tattoo.png';

interface TattooMachineProps {
  size?: number;
  className?: string;
}

const TattooMachine: React.FC<TattooMachineProps> = ({
  size = 24,
  className = ""
}) => {
  return (
    <img
      src={tattooImage}
      alt="Tattoo Machine"
      width={size}
      height={size}
      className={`${className} object-contain`}
      style={{
        filter: 'brightness(0) invert(1)', // Makes the image white
        width: size,
        height: size
      }}
    />
  );
};

export default TattooMachine;