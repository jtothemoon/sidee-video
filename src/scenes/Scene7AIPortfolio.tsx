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

// design-system 도메인 — TIER S1/S2, 완수율, 피어리뷰, 리더 경험
const PORTFOLIO_LINES = [
  "Carl · 풀스택 개발자",
  "─────────────────",
  "PROJECTS    3건 완주",
  "  · Sidee (Lead BE, 14주)",
  "  · 구독 플랫폼 (FE, 4주)",
  "  · 클래스 매칭 (BE)",
  "",
  "TIER         S1 · 상위 4%",
  "완수율        92 %",
  "피어리뷰     4.8 / 5.0",
  "리더 경험      2회",
];

// 좌측 카드 — 14주의 raw 작업 활동
const STATS = [
  { label: "커밋",  value: "412" },
  { label: "PR",   value: "68" },
  { label: "리뷰",  value: "51" },
  { label: "이슈",  value: "93" },
];

// Hero 카드 스타일 score 모듈 — 우측 portfolio 카드 상단에 박힘
const HERO_STATS = [
  { label: "완주",     value: "5" },
  { label: "진행 중",  value: "2" },
  { label: "피어리뷰", value: "1.0K" },
];

export const Scene7AIPortfolio = () => {
  const t = useLocalTime();

  const headerIn = clamp(t / 0.5, 0, 1);
  const dashIn = clamp((t - 0.5) / 0.5, 0, 1);
  const arrowIn = clamp((t - 1.8) / 0.5, 0, 1);
  const portIn = clamp((t - 2.4) / 0.6, 0, 1);
  const scoreIn = clamp((t - 2.7) / 0.5, 0, 1);
  const chipIn = clamp((t - 4.5) / 0.5, 0, 1);

  // Hero 카드 92% count-up
  const completionRate = Math.round(scoreIn * 92);

  const linesShown = Math.floor((t - 3.4) / 0.18);

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
          Sidee의 작동 방식
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

      {/* Arrow between — centered between cards */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 920,
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
          background: COLORS.WHITE,
          border: "1.5px solid #E1E4ED",
          borderRadius: 22,
          padding: 28,
          boxShadow: "0 2px 4px rgba(29,41,85,0.06)",
          opacity: portIn,
          transform: `translateY(${(1 - portIn) * 14}px)`,
          color: COLORS.NAVY,
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
              color: COLORS.BLUE,
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

        {/* Hero-style score 모듈 — TIER + 완주율 + stats */}
        <div
          style={{
            background: `linear-gradient(180deg, ${COLORS.SKY} 0%, ${COLORS.WHITE} 100%)`,
            border: `1px solid ${COLORS.NAVY_100}`,
            borderRadius: 16,
            padding: "18px 20px",
            marginBottom: 18,
            opacity: scoreIn,
            transform: `translateY(${(1 - scoreIn) * 10}px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.NAVY_500,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                나의 프로젝트 완주율
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 64,
                  fontWeight: 800,
                  color: COLORS.BLUE,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginTop: 6,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {completionRate}
                <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.NAVY }}>%</span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.NAVY_500,
                  fontWeight: 600,
                  marginTop: 6,
                }}
              >
                최근 14주 · 상위 4%
              </div>
            </div>
            <div
              style={{
                background: COLORS.NAVY,
                color: COLORS.WHITE,
                padding: "6px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 800,
                fontFamily: FONT_DISPLAY,
                letterSpacing: "-0.01em",
                boxShadow: "0 2px 8px rgba(29,41,85,0.20)",
              }}
            >
              S1
            </div>
          </div>

          {/* stat row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              marginTop: 14,
              paddingTop: 12,
              borderTop: `1px solid ${COLORS.NAVY_100}`,
              gap: 8,
            }}
          >
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.NAVY,
                    letterSpacing: "-0.012em",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.NAVY_300,
                    fontWeight: 600,
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* monospace résumé — light bg version */}
        <div
          style={{
            background: COLORS.NAVY_50,
            borderRadius: 12,
            padding: "14px 18px",
            fontFamily: FONT_MONO,
            fontSize: 15,
            lineHeight: 1.55,
            color: COLORS.NAVY,
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
                  color: line.startsWith("TIER") ? COLORS.BLUE : COLORS.NAVY,
                  fontWeight: line.startsWith("TIER") ? 700 : 500,
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
