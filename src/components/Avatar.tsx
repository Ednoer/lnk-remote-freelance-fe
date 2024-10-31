import React, { FC, memo } from 'react';

interface AvatarProps {
  imageUrl?: string;
  name: string;
  size?: number;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({
  imageUrl, name, size, className,
}) => (
  <>
    {imageUrl ? (
      <img
        src={imageUrl}
        width={size}
        height={size}
        className={`w-${size} h-${size} rounded-full ${className}`}
        alt={name}
      />
    ) : (
      <div
        className={`w-[42px] h-[42px] rounded-full bg-gray-600 text-white flex items-center justify-center uppercase text-xs`}
      >
        {name.split(' ').slice(0, 2).map(n => n[0]).join('')}
      </div>
    )}
  </>
);

export default memo(Avatar);
