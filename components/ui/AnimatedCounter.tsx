'use client'
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useInView';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number; // ms
}

export function AnimatedCounter({
  target, prefix = '', suffix = '',
  decimals = 0, duration = 1800
}: AnimatedCounterProps) {
  const { ref, isInView } = useScrollAnimation(0.3);
  const [current, setCurrent] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!isInView || !hasMounted) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(parseFloat(start.toFixed(decimals)));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, hasMounted, target, duration, decimals]);

  if (!hasMounted) {
    return (
      <span ref={ref}>
        {prefix}{(0).toFixed(decimals)}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {prefix}{current.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}
