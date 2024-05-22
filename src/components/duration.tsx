import React from 'react';

export const Duration = ({ className, seconds }: { className?: string; seconds: number }) => {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  );
};

const format = (seconds: number): string => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds().toString());
  if (hh) {
    return `${hh}:${pad(mm.toString())}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const pad = (string: string): string => {
  return ('0' + string).slice(-2);
};