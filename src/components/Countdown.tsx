import { useEffect, useState } from 'react';

interface CountdownProps {
  deadline: string;
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0');
}

function diffParts(deadline: Date) {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

export default function Countdown({ deadline }: CountdownProps) {
  const target = new Date(deadline);
  const [parts, setParts] = useState(() => diffParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(diffParts(target)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!parts) return <p className="done">it's time.</p>;

  return (
    <div className="timer">
      <div className="unit">
        <span className="digits">{pad(parts.days)}</span>
        <span className="label">days</span>
      </div>
      <span className="sep">:</span>
      <div className="unit">
        <span className="digits">{pad(parts.hours)}</span>
        <span className="label">hours</span>
      </div>
      <span className="sep">:</span>
      <div className="unit">
        <span className="digits">{pad(parts.minutes)}</span>
        <span className="label">minutes</span>
      </div>
      <span className="sep">:</span>
      <div className="unit">
        <span className="digits">{pad(parts.seconds)}</span>
        <span className="label">seconds</span>
      </div>
    </div>
  );
}
