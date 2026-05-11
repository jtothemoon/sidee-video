import { AbsoluteFill } from "remotion";
import {
  COLORS,
  FONT_BODY,
  FONT_DISPLAY,
  FONT_MONO,
  clamp,
  useLocalTime,
} from "./_shared";

// Deterministic pseudo-random for heatmap intensity (replaces Math.random)
const seededIntensity = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const PORTFOLIO_LINES = [
  "Carl · 풀스택 개발자",
  "─────────────────",
  "PROJECTS  3건 완주",
  "  · Sidee (Lead BE, 14주)",
  "  · 구독 플랫폼 (FE, 4주)",
  "  · 클래스 매칭 (BE)",
  "",
  "TIER       💎 Diamond",
  "REVIEW     4.8 / 5.0",
  "COMMITS    412",
  "COVERAGE   83 %",
];

const STATS = [
  { label: "커밋",  value: "412" },
  { label: "PR",   value: "68" },
  { label: "리뷰",  value: "51" },
  { label: "이슈",  value: "93" },
];

export const Scene7AIPortfolio = () => {
  const t = useLocalTime();

  const headerIn = clamp(t / 0.5, 0, 1);
  const dashIn = clamp((t - 0.5) / 0.5, 0, 1);
  const arrowIn = clamp((t - 1.8) / 0.5, 0, 1);
  const portIn = clamp((t - 2.4) / 0.6, 0, 1);
  const chipIn = clamp((t - 4.5) / 0.5, 0, 1);

  const linesShown = Math.floor((t - 3.0) / 0.18);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.WHITE,
        color: COLORS.NAVY,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 100,
          right: 100,
          opacity: headerIn,
          transform: `translateY(${(1 - headerIn) * 10}px)`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            fontWeight: 700,
            color: COLORS.BLUE,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          How Sidee works · 03
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          완주가 곧, <span style={{ color: COLORS.BLUE }}>증명된 경력</span>이 됩니다.
        </div>
      </div>

      {/* LEFT: project activity card */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 100,
          width: 620,
          background: COLORS.WHITE,
          border: "1.5px solid #E1E4ED",
          borderRadius: 22,
          padding: 28,
          boxShadow: "0 2px 4px rgba(29,41,85,0.06)",
          opacity: dashIn,
          transform: `translateY(${(1 - dashIn) * 14}px)`,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: COLORS.NAVY_500,
            fontWeight: 700,
            letterSpacing: "0.06em",
            marginBottom: 10,
          }}
        >
          PROJECT ACTIVITY
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 24 }}>
          Sidee · 14주의 기록
        </div>

        {/* Commit heatmap (column-by-column reveal + gentle live pulsing) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(14, 1fr)",
            gap: 4,
          }}
        >
          {Array.from({ length: 14 * 7 }).map((_, i) => {
            const col = i % 14;
            // 컬럼(주)별로 순차 reveal — 14주가 0.6초씩 켜짐
            const revealAt = 0.7 + col * 0.06;
            const reveal = clamp((t - revealAt) / 0.3, 0, 1);

            // 셀별 페이즈를 다르게 줘서 살아있는 느낌
            const base = seededIntensity(i);
            const wave = Math.sin(t * 1.4 + i * 0.5) * 0.22;
            const intensity = clamp((base + wave) * reveal, 0, 1);

            const hue =
              intensity > 0.7
                ? COLORS.BLUE
                : intensity > 0.4
                ? "#84A3FF"
                : intensity > 0.2
                ? COLORS.SKY_DEEP
                : COLORS.SKY;
            return (
              <div
                key={i}
                style={{
                  width: "100%",
                  paddingTop: "100%",
                  background: hue,
                  borderRadius: 4,
                  opacity: reveal,
                }}
              />
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 32, marginTop: 24 }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: 14,
                  color: COLORS.NAVY_300,
                  fontWeight: 600,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: COLORS.NAVY,
                  fontFamily: FONT_DISPLAY,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow between */}
      <div
        style={{
          position: "absolute",
          top: 540,
          left: 760,
          opacity: arrowIn,
          transform: `scale(${arrowIn})`,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill={COLORS.SKY} />
          <path
            d="M28 40h24M40 28l12 12-12 12"
            stroke={COLORS.BLUE}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* RIGHT: auto-generated portfolio */}
      <div
        style={{
          position: "absolute",
          top: 320,
          right: 100,
          width: 620,
          background: COLORS.NAVY,
          borderRadius: 22,
          padding: 28,
          boxShadow: "0 16px 32px rgba(29,41,85,0.16)",
          opacity: portIn,
          transform: `translateY(${(1 - portIn) * 14}px)`,
          color: COLORS.WHITE,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#84A3FF",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            AI PORTFOLIO · auto-generated
          </div>
          <div
            style={{
              background: COLORS.BLUE,
              color: COLORS.WHITE,
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            READY
          </div>
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 17,
            lineHeight: 1.55,
            color: COLORS.WHITE,
          }}
        >
          {PORTFOLIO_LINES.map((line, i) => {
            const visible = i <= linesShown;
            return (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: `translateX(${visible ? 0 : -4}px)`,
                  color: line.startsWith("TIER") ? "#84A3FF" : COLORS.WHITE,
                }}
              >
                {line || " "}
              </div>
            );
          })}
        </div>
      </div>

      {/* Company chip */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 16,
          opacity: chipIn,
          transform: `translateY(${(1 - chipIn) * 14}px)`,
        }}
      >
        <div
          style={{
            padding: "14px 24px",
            background: COLORS.SKY,
            borderRadius: 999,
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.NAVY,
          }}
        >
          B2B 채용 연계 · 사이드 프로젝트가 경력이 되는 첫 플랫폼
        </div>
      </div>
    </AbsoluteFill>
  );
};
