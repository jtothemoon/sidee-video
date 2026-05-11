import { AbsoluteFill, Img, staticFile } from "remotion";
import {
  COLORS,
  FONT_BODY,
  clamp,
  ease,
  useLocalTime,
} from "./_shared";

const WORDMARK_W = 560;
const WORDMARK_H = WORDMARK_W * (388 / 1129); // ≈ 192
const MASCOT_W = 280;
const MASCOT_H = MASCOT_W * (270 / 262); // ≈ 288

export const Scene8Outro = () => {
  const t = useLocalTime();

  const ghostIn = ease.easeOutBack(clamp(t / 1.0, 0, 1));
  const bob = Math.sin(t * 2.2) * 8;
  const tagIn = clamp((t - 1.4) / 0.6, 0, 1);
  const tag2In = clamp((t - 3.0) / 0.6, 0, 1);
  const ctaIn = clamp((t - 4.6) / 0.6, 0, 1);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.SKY} 0%, ${COLORS.WHITE} 100%)`,
        color: COLORS.NAVY,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      {/* Decorative corner ghosts */}
      <div style={{ position: "absolute", top: 90, left: 120, opacity: 0.18 }}>
        <Img
          src={staticFile("sidee/sidee-mark.svg")}
          style={{ width: 80, height: 80 * (270 / 262) }}
        />
      </div>
      <div style={{ position: "absolute", top: 220, right: 200, opacity: 0.12 }}>
        <Img
          src={staticFile("sidee/sidee-mark.svg")}
          style={{ width: 60, height: 60 * (270 / 262) }}
        />
      </div>
      <div style={{ position: "absolute", bottom: 240, left: 240, opacity: 0.14 }}>
        <Img
          src={staticFile("sidee/sidee-mark.svg")}
          style={{ width: 70, height: 70 * (270 / 262) }}
        />
      </div>

      {/* Center stack */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Big mascot */}
        <div
          style={{
            opacity: ghostIn,
            transform: `translateY(${bob - (1 - ghostIn) * 40}px) scale(${0.6 + ghostIn * 0.4})`,
            marginBottom: 32,
          }}
        >
          <Img
            src={staticFile("sidee/sidee-mark.svg")}
            style={{ width: MASCOT_W, height: MASCOT_H, display: "block" }}
          />
        </div>

        {/* Wordmark */}
        <div
          style={{
            opacity: tagIn,
            transform: `translateY(${(1 - tagIn) * 14}px)`,
          }}
        >
          <Img
            src={staticFile("sidee/sidee-logo.svg")}
            style={{ width: WORDMARK_W, height: WORDMARK_H, display: "block" }}
          />
        </div>

        {/* Korean tagline */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: COLORS.NAVY_500,
            marginTop: 32,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            opacity: tag2In,
            transform: `translateY(${(1 - tag2In) * 12}px)`,
            maxWidth: 1100,
          }}
        >
          가볍게 시작하되,{" "}
          <span style={{ color: COLORS.NAVY, fontWeight: 700 }}>
            끝까지 함께
          </span>
          .
        </div>

        {/* CTA + PlanB attribution */}
        <div
          style={{
            marginTop: 48,
            opacity: ctaIn,
            transform: `translateY(${(1 - ctaIn) * 12}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: COLORS.BLUE,
              color: COLORS.WHITE,
              padding: "24px 56px",
              borderRadius: 16,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              boxShadow: "0 16px 32px rgba(51,104,255,0.30)",
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            첫 프로젝트에 합류하기
            <span style={{ fontSize: 24 }}>→</span>
          </div>

          {/* PlanB attribution — prominent */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
            }}
          >
            <span
              style={{
                fontSize: 22,
                color: COLORS.NAVY_300,
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              made by
            </span>
            <span
              style={{
                fontSize: 28,
                color: COLORS.NAVY,
                fontWeight: 800,
                letterSpacing: "-0.01em",
              }}
            >
              PlanB
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
