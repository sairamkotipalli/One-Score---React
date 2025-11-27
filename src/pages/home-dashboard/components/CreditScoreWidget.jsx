import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* Simple inline icon used by the info button */
const AppIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const logos = {
  CIBIL:
    "https://www.cibil.com/content/dam/cibil/logos/cibil-logo-lt.svg",
  Experian:
    "https://www.experian.in/wp-content/themes/content-hub/images/experian_full_colour.svg",
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function polarToCartesian(cx, cy, r, angleDeg) {
  const a = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function scoreToAngle(score, min = 300, max = 900) {
  const clamped = clamp(score, min, max);
  const pct = (clamped - min) / (max - min);
  return -90 + pct * 180;
}

function generateTicks(count = 24, outerR = 78, center = { x: 64, y: 64 }) {
  const ticks = [];
  for (let i = 0; i <= count; i++) {
    const angle = -180 + (i * 180) / count;
    const outer = polarToCartesian(center.x, center.y, outerR, angle);
    const inner = polarToCartesian(
      center.x,
      center.y,
      outerR - (i % 6 === 0 ? 14 : 8),
      angle
    );
    ticks.push({
      x1: outer.x,
      y1: outer.y,
      x2: inner.x,
      y2: inner.y,
      major: i % 6 === 0,
    });
  }
  return ticks;
}

export default function CreditScoreWidget({
  bureau = "CIBIL",
  score = 753,
  maxScore = 900,
  nextUpdate = "—",
  className = "",
  slug = null, // optional: when present the widget can navigate to details
}) {
  const navigate = useNavigate();

  const MIN = 300;
  const MAX = Math.max(maxScore || 900, 900);
  const VIEW_CX = 64;
  const VIEW_CY = 64;
  const ARC_R = 45;
  const OUTER_R = 78;
  const ANIM_MS = 700;

  const thresholds = [300, 580, 750, 900];
  const colors = ["#EF4444", "#F59E0B", "#059669"];

  const thresholdAngles = useMemo(
    () =>
      thresholds.map(
        (t) =>
          -180 +
          ((clamp(t, MIN, MAX) - MIN) / (MAX - MIN)) * 180
      ),
    [thresholds, MIN, MAX]
  );

  const segments = useMemo(() => {
    const result = [];
    for (let i = 0; i < thresholdAngles.length - 1; i++) {
      result.push({
        startAngle: thresholdAngles[i],
        endAngle: thresholdAngles[i + 1],
        color: colors[i] || colors[2],
      });
    }
    return result;
  }, [thresholdAngles, colors]);

  const target = clamp(Math.round(score), MIN, MAX);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const curRef = useRef(MIN);
  const [displayScore, setDisplayScore] = useState(MIN);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      curRef.current = target;
      setDisplayScore(target);
      return;
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const start = curRef.current;
    const end = target;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      if (!startRef.current) startRef.current = now;
      const t = Math.min(1, (now - startRef.current) / ANIM_MS);
      const eased = easeOutCubic(t);
      curRef.current = Math.round(start + (end - start) * eased);
      setDisplayScore(curRef.current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        curRef.current = end;
        setDisplayScore(end);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  const scoreColor =
    displayScore < 580 ? "#EF4444" : displayScore < 750 ? "#F59E0B" : "#059669";

  const statusText =
    displayScore < 580 ? "Poor" : displayScore < 750 ? "Fair" : "Good";

  const needleAngle = scoreToAngle(displayScore, MIN, MAX);

  const ticks = useMemo(
    () => generateTicks(24, OUTER_R, { x: VIEW_CX, y: VIEW_CY }),
    []
  );

  const goToDetails = (e) => {
    if (!slug) return;
    if (e && e.stopPropagation) e.stopPropagation();
    navigate(`/home-dashboard/${slug}`);
  };

  return (
    <article
      className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border
        border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl
        transition-shadow duration-200 flex flex-col items-center ${className}`}
      role="region"
      aria-label={`${bureau} credit score widget`}
    >
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-3">
          <img
            src={logos[bureau] || logos.CIBIL}
            alt={`${bureau} logo`}
            className="object-contain"
            style={{
              width: bureau === "CIBIL" ? 64 : 84,
              height: "auto",
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="More info"
            title="More info"
            onClick={(ev) => ev.stopPropagation()}
            className="text-gray-500 dark:text-gray-400 p-2 rounded-full
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <AppIcon />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <svg
          viewBox="0 0 128 128"
          className="w-40 h-40 md:w-48 md:h-48"
          aria-hidden
          role="img"
          focusable="false"
        >
          <g transform={`translate(${VIEW_CX}, ${VIEW_CY})`}>
            <path
              d={describeArc(0, 0, ARC_R + 12, -180, 0)}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {segments.map((s, i) => (
              <path
                key={i}
                d={describeArc(0, 0, ARC_R + 4, s.startAngle, s.endAngle)}
                fill="none"
                stroke={s.color}
                strokeWidth="10"
                strokeLinecap="round"
              />
            ))}

            {ticks.map((t, i) => (
              <line
                key={i}
                x1={t.x1 - VIEW_CX}
                y1={t.y1 - VIEW_CY}
                x2={t.x2 - VIEW_CX}
                y2={t.y2 - VIEW_CY}
                stroke={t.major ? "rgba(11,37,69,0.9)" : "rgba(11,37,69,0.18)"}
                strokeWidth={t.major ? 1.6 : 0.9}
                strokeLinecap="round"
              />
            ))}

            <text
              x={-(OUTER_R - 24)}
              y={22 - VIEW_CY}
              textAnchor="middle"
              fontSize="10"
              fill="#EF4444"
              transform={`translate(0, ${VIEW_CY})`}
            >
              300
            </text>

            <text
              x={OUTER_R - 24}
              y={22 - VIEW_CY}
              textAnchor="middle"
              fontSize="10"
              fill="#059669"
              transform={`translate(0, ${VIEW_CY})`}
            >
              {MAX}
            </text>

            <g transform={`rotate(${needleAngle}, 0, 0)`}>
              <path d="M -3 6 L 0 -46 L 3 6 Z" fill="#0B2545" />
              <path
                d="M 0 -46 L 0 6"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.6"
              />
              <circle
                cx="0"
                cy="-46"
                r="3.6"
                fill={scoreColor}
                stroke="#fff"
                strokeWidth="0.8"
              />
            </g>

            <g>
              <circle
                cx="0"
                cy="6"
                r="28"
                fill="#fff"
                stroke="rgba(11,37,69,0.04)"
                strokeWidth="1"
              />

              <text
                x="0"
                y="-2"
                textAnchor="middle"
                fontSize="22"
                fontWeight="700"
                fill="#0B2545"
                style={{ dominantBaseline: "central" }}
              >
                {displayScore}
              </text>

              <text
                x="0"
                y="16"
                textAnchor="middle"
                fontSize="11"
                fontWeight="500"
                fill={scoreColor}
              >
                {statusText}
              </text>
            </g>
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between w-full mt-4 border-t pt-3 border-gray-100 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Next update:{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {nextUpdate}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="text-sm font-bold"
            style={{ color: scoreColor }}
          >
            {statusText}
          </div>

          {slug ? (
            <button
              onClick={goToDetails}
              type="button"
              aria-label={`View ${bureau} details`}
              className="ml-2 px-3 py-1 rounded bg-blue-600 text-white text-sm
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              View details
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}