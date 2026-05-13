import { AbsoluteFill } from "remotion";
import {
  COLORS,
  FONT_BODY,
  FONT_DISPLAY,
  clamp,
  ease,
  useLocalTime,
} from "./_shared";

export const Scene3Walls = () => {
  const t = useLocalTime();
  const headerIn = clamp((t - 0.1) / 0.5, 0, 1);
  const quoteIn = clamp((t - 4.0) / 0.6, 0, 1);

  const barT = (start: number) =>
    ease.easeOutCubic(clamp((t - start) / 1.2, 0, 1));

  const bars = [
    { label: "동기부여 상실",      value: 49, t: barT(1.0), color: COLORS.BLUE },
    { label: "일정 조율 실패",      value: 37, t: barT(1.4), color: "#5B85FF" },
    { label: "기타 (기획·이탈)",    value: 14, t: barT(1.8), color: COLORS.NAVY_300 },
  ];

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
          top: 80,
          left: 100,
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
          응답 분석 (51명 대상)
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          사이드 프로젝트는 두 벽에서 무너진다.
        </div>
      </div>

      {/* Bars */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 100,
          right: 100,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {bars.map((b, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 12,
              }}
            >
              <div
                style={{ fontSize: 28, fontWeight: 700, color: COLORS.NAVY }}
              >
                {b.label}
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 56,
                  fontWeight: 800,
                  color: b.color,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                }}
              >
                {Math.round(b.value * b.t)}
                <span style={{ fontSize: 32 }}>%</span>
              </div>
            </div>
            <div
              style={{
                height: 28,
                background: COLORS.NAVY_50,
                borderRadius: 999,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${b.value * b.t}%`,
                  background: b.color,
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 100,
          right: 100,
          opacity: quoteIn,
          transform: `translateY(${(1 - quoteIn) * 14}px)`,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontStyle: "italic",
            color: COLORS.NAVY_500,
            lineHeight: 1.45,
            fontWeight: 500,
            borderLeft: `6px solid ${COLORS.BLUE}`,
            paddingLeft: 28,
          }}
        >
          "초기엔 빠르게 시작되지만, 동기가 흔들리고 일정이 어긋나면 자연스럽게 멈추게 된다."
        </div>
      </div>
    </AbsoluteFill>
  );
};
