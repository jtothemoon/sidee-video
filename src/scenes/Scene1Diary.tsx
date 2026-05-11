import { AbsoluteFill } from "remotion";
import {
  COLORS,
  FONT_BODY,
  FONT_DISPLAY,
  clamp,
  ease,
  useLocalTime,
} from "./_shared";

const ATTEMPTS = [
  { name: "구독 플랫폼",   role: "Frontend", result: "한 달 만에 이탈" },
  { name: "CTO 프로젝트",  role: "Backend",  result: "리빌딩 통보" },
  { name: "AI 채팅봇",     role: "Backend",  result: "킥오프 당일 해체" },
  { name: "클래스 매칭",   role: "Backend",  result: "기획 부재" },
  { name: "여행 큐레이션", role: "Backend",  result: "본업에 밀림" },
  { name: "커뮤니티 앱",   role: "Backend",  result: "동료 잠수" },
  { name: "운동 챌린지",   role: "Backend",  result: "회신 두절" },
  { name: "북클럽 SaaS",   role: "Backend",  result: "미완성" },
];

export const Scene1Diary = () => {
  const t = useLocalTime();

  const titleIn = clamp((t - 0.2) / 0.5, 0, 1);
  const counterIn = clamp((t - 6.0) / 0.8, 0, 1);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.WHITE,
        color: COLORS.NAVY,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      {/* faint dot grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.NAVY_50} 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          opacity: 0.7,
        }}
      />

      {/* Eyebrow + title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 100,
          right: 100,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 12}px)`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            fontWeight: 700,
            color: COLORS.BLUE,
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          A developer's diary · 2025
        </div>
        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          8개월, <span style={{ color: COLORS.BLUE }}>여덟 번</span>의 시도.
        </div>
      </div>

      {/* Attempt cards grid */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 100,
          right: 100,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
        }}
      >
        {ATTEMPTS.map((a, i) => {
          const cardStart = 1.4 + i * 0.35;
          const cardIn = clamp((t - cardStart) / 0.4, 0, 1);
          const crossT = clamp((t - (cardStart + 0.5)) / 0.45, 0, 1);
          const crossW = ease.easeOutCubic(crossT);

          return (
            <div
              key={i}
              style={{
                opacity: cardIn,
                transform: `translateY(${(1 - cardIn) * 14}px)`,
                background: COLORS.WHITE,
                border: "1.5px solid #E1E4ED",
                borderRadius: 18,
                padding: "18px 20px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(29,41,85,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: COLORS.NAVY_300,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                #{String(i + 1).padStart(2, "0")} · {a.role}
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  marginTop: 6,
                  color: COLORS.NAVY,
                }}
              >
                {a.name}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: COLORS.NAVY_500,
                  marginTop: 8,
                }}
              >
                {a.result}
              </div>
              {/* Strike-through line */}
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  height: 3,
                  background: COLORS.BLUE,
                  width: `calc((100% - 28px) * ${crossW})`,
                  transform: "translateY(-1px) rotate(-2.5deg)",
                  transformOrigin: "left center",
                  borderRadius: 2,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Big "완주 0건" counter */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 100,
          textAlign: "right",
          opacity: counterIn,
          transform: `translateY(${(1 - counterIn) * 20}px)`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: COLORS.NAVY_500,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          완주한 프로젝트
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 220,
            fontWeight: 800,
            color: COLORS.BLUE,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          0<span style={{ fontSize: 80, color: COLORS.NAVY }}>건</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
