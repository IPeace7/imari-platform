import React, { useState } from 'react';

interface LinePointSeries {
  name: string;
  color: string;
  values: number[];
  fillArea?: boolean;
}

interface SmoothAreaLineChartProps {
  labels: string[];
  series: LinePointSeries[];
  height?: number;
  yMin?: number;
  yMax?: number;
  yTicks?: number[];
  unit?: string;
  pinnedTooltip?: {
    index: number;
    time: string;
    valueText: string;
  };
}

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export const SmoothAreaLineChart: React.FC<SmoothAreaLineChartProps> = ({
  labels,
  series,
  height = 210,
  yMin = 0,
  yMax = 400,
  yTicks = [0, 100, 200, 300, 400],
  unit = '',
  pinnedTooltip,
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const svgWidth = 640;
  const svgHeight = height;
  const padLeft = 42;
  const padRight = 18;
  const padTop = 18;
  const padBottom = 28;
  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const xForIndex = (idx: number) => {
    if (labels.length <= 1) return padLeft + plotW / 2;
    return padLeft + (idx / (labels.length - 1)) * plotW;
  };

  const yForValue = (val: number) => {
    const clamped = Math.max(yMin, Math.min(yMax, val));
    const ratio = (clamped - yMin) / (yMax - yMin || 1);
    return padTop + plotH - ratio * plotH;
  };

  const activeIdx = hoverIdx !== null ? hoverIdx : pinnedTooltip?.index ?? null;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible select-none"
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          {series.map((s, sIdx) => (
            <linearGradient
              key={s.name}
              id={`grad-line-${sIdx}-${s.color.replace('#', '')}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={s.color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.01" />
            </linearGradient>
          ))}
        </defs>

        {/* Horizontal gridlines & Y ticks */}
        {yTicks.map((tick) => {
          const y = yForValue(tick);
          return (
            <g key={tick}>
              <line
                x1={padLeft}
                y1={y}
                x2={svgWidth - padRight}
                y2={y}
                stroke="#EEF2F6"
                strokeWidth="1"
              />
              <text
                x={padLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-400 text-[11px] tabular-nums"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Active vertical guide */}
        {activeIdx !== null && (
          <line
            x1={xForIndex(activeIdx)}
            y1={padTop}
            x2={xForIndex(activeIdx)}
            y2={padTop + plotH}
            stroke="#CBD5E1"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
        )}

        {/* Series areas & lines */}
        {series.map((s, sIdx) => {
          const pts = s.values.map((v, i) => ({ x: xForIndex(i), y: yForValue(v) }));
          const linePath = buildSmoothPath(pts);
          const areaPath =
            pts.length > 0
              ? `${linePath} L ${pts[pts.length - 1].x} ${padTop + plotH} L ${pts[0].x} ${padTop + plotH} Z`
              : '';

          return (
            <g key={s.name}>
              {s.fillArea !== false && (
                <path
                  d={areaPath}
                  fill={`url(#grad-line-${sIdx}-${s.color.replace('#', '')})`}
                />
              )}
              <path
                d={linePath}
                fill="none"
                stroke={s.color}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {pts.map((pt, i) => {
                const isActive = activeIdx === i;
                return (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 5 : 3.2}
                    fill={isActive ? '#FFFFFF' : s.color}
                    stroke={s.color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                );
              })}
            </g>
          );
        })}

        {/* X axis labels */}
        {labels.map((label, i) => (
          <text
            key={label}
            x={xForIndex(i)}
            y={svgHeight - 6}
            textAnchor="middle"
            className={`text-[11px] ${
              activeIdx === i ? 'fill-slate-800 font-semibold' : 'fill-slate-400'
            }`}
          >
            {label}
          </text>
        ))}

        {/* Interactive hover zones */}
        {labels.map((_, i) => {
          const sliceW = plotW / Math.max(labels.length - 1, 1);
          return (
            <rect
              key={i}
              x={xForIndex(i) - sliceW / 2}
              y={padTop}
              width={sliceW}
              height={plotH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIdx(i)}
            />
          );
        })}

        {/* Floating Tooltip */}
        {activeIdx !== null && series[0]?.values[activeIdx] !== undefined && (
          <g
            transform={`translate(${Math.min(
              Math.max(xForIndex(activeIdx) - 52, padLeft),
              svgWidth - 115
            )}, ${Math.max(yForValue(series[0].values[activeIdx]) - 46, 2)})`}
          >
            <rect
              x="0"
              y="0"
              width="104"
              height="36"
              rx="8"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
            <text x="52" y="14" textAnchor="middle" className="fill-slate-400 text-[9.5px]">
              {hoverIdx === null && pinnedTooltip
                ? pinnedTooltip.time
                : labels[activeIdx]}
            </text>
            <text
              x="52"
              y="28"
              textAnchor="middle"
              className="fill-slate-900 text-[11px] font-bold tabular-nums"
            >
              {hoverIdx === null && pinnedTooltip
                ? pinnedTooltip.valueText
                : series
                    .map((s) => `${s.values[activeIdx]}${unit}`)
                    .join(' · ')}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerPrimary: string;
  centerSecondary?: string;
  size?: number;
  strokeWidth?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  centerPrimary,
  centerSecondary,
  size = 128,
  strokeWidth = 14,
}) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EEF2F6"
          strokeWidth={strokeWidth}
        />
        {segments.map((seg) => {
          const fraction = seg.value / total;
          const dashLength = fraction * circumference;
          const dashOffset = -cumulative * circumference;
          cumulative += fraction;
          return (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap={segments.length === 1 ? 'round' : 'butt'}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
        <span className="text-[18px] font-bold text-slate-900 leading-tight tabular-nums">
          {centerPrimary}
        </span>
        {centerSecondary && (
          <span className="text-[10.5px] font-medium text-slate-500 leading-tight mt-0.5">
            {centerSecondary}
          </span>
        )}
      </div>
    </div>
  );
};

interface BarLineComboChartProps {
  labels: string[];
  barValues: number[];
  lineValues: number[];
  yMax?: number;
}

export const BarLineComboChart: React.FC<BarLineComboChartProps> = ({
  labels,
  barValues,
  lineValues,
  yMax = 2000,
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const svgWidth = 640;
  const svgHeight = 230;
  const padLeft = 44;
  const padRight = 16;
  const padTop = 18;
  const padBottom = 30;
  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;
  const yTicks = [0, 500, 1000, 1500, 2000];

  const slotW = plotW / Math.max(labels.length, 1);
  const barW = Math.min(20, slotW * 0.38);

  const xCenter = (i: number) => padLeft + slotW * i + slotW / 2;
  const yVal = (v: number) => padTop + plotH - (Math.min(v, yMax) / yMax) * plotH;

  const linePts = lineValues.map((v, i) => ({ x: xCenter(i), y: yVal(v) }));
  const linePath = linePts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible select-none"
        onMouseLeave={() => setHoverIdx(null)}
      >
        {yTicks.map((t) => {
          const y = yVal(t);
          return (
            <g key={t}>
              <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="#EEF2F6" strokeWidth="1" />
              <text x={padLeft - 8} y={y + 4} textAnchor="end" className="fill-slate-400 text-[10.5px] tabular-nums">
                {t.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Organic recovered bars */}
        {barValues.map((val, i) => {
          const topY = yVal(val);
          const h = Math.max(0, padTop + plotH - topY);
          const isHover = hoverIdx === i;
          return (
            <rect
              key={labels[i]}
              x={xCenter(i) - barW / 2}
              y={topY}
              width={barW}
              height={h}
              rx="4"
              fill={isHover ? '#0E7A3A' : '#15803D'}
              opacity={isHover ? 1 : 0.9}
            />
          );
        })}

        {/* Total processed overlaid line */}
        <path d={linePath} fill="none" stroke="#16A34A" strokeWidth="2" />
        {linePts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hoverIdx === i ? 4.5 : 3}
            fill="#FFFFFF"
            stroke="#16A34A"
            strokeWidth="2"
          />
        ))}

        {/* X Labels */}
        {labels.map((label, i) => (
          <text
            key={label}
            x={xCenter(i)}
            y={svgHeight - 8}
            textAnchor="middle"
            className={`text-[10.5px] ${hoverIdx === i ? 'fill-slate-900 font-semibold' : 'fill-slate-400'}`}
          >
            {label}
          </text>
        ))}

        {/* Hover hit rects */}
        {labels.map((_, i) => (
          <rect
            key={i}
            x={padLeft + slotW * i}
            y={padTop}
            width={slotW}
            height={plotH}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoverIdx(i)}
          />
        ))}

        {hoverIdx !== null && (
          <g
            transform={`translate(${Math.min(
              Math.max(xCenter(hoverIdx) - 70, padLeft),
              svgWidth - 150
            )}, 6)`}
          >
            <rect x="0" y="0" width="140" height="40" rx="8" fill="#0F172A" />
            <text x="10" y="16" className="fill-slate-300 text-[10px]">
              {labels[hoverIdx]}
            </text>
            <text x="10" y="31" className="fill-white text-[10.5px] font-semibold tabular-nums">
              Total: {lineValues[hoverIdx]} kg · Org: {barValues[hoverIdx]} kg
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
