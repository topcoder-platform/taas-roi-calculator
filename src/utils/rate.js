/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
import React from 'react';

export function createRateIcon(color) {
  return (
    <svg width="44px" height="44px" viewBox="0 0 44 44" version="1.1">
      <defs>
        <filter x="-23.5%" y="-20.6%" width="147.1%" height="147.1%" filterUnits="objectBoundingBox" id="filter-2">
          <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur stdDeviation="2.5" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
          <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0" type="matrix" in="shadowBlurOuter1" />
        </filter>
      </defs>
      <g id="TaaS-ROI" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Combined-Shape-Copy-2" transform="translate(-365.000000, -66.000000)">
          <path fill="black" fillOpacity="1" filter="url(#filter-2)" d="M387,70 C396.388841,70 404,77.6111593 404,87 C404,96.3888407 396.388841,104 387,104 C377.611159,104 370,96.3888407 370,87 C370,77.6111593 377.611159,70 387,70 Z M387,80 C383.134007,80 380,83.1340068 380,87 C380,90.8659932 383.134007,94 387,94 C390.865993,94 394,90.8659932 394,87 C394,83.1340068 390.865993,80 387,80 Z" id="path-1" />
          <path fill={color} fillRule="evenodd" d="M387,70 C396.388841,70 404,77.6111593 404,87 C404,96.3888407 396.388841,104 387,104 C377.611159,104 370,96.3888407 370,87 C370,77.6111593 377.611159,70 387,70 Z M387,80 C383.134007,80 380,83.1340068 380,87 C380,90.8659932 383.134007,94 387,94 C390.865993,94 394,90.8659932 394,87 C394,83.1340068 390.865993,80 387,80 Z" id="path-2" />
        </g>
      </g>
    </svg>
  );
}

export default {
  createRateIcon,
};
