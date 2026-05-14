import { AbsoluteFill, Img, staticFile } from "remotion";
import {
  COLORS,
  FONT_BODY,
  clamp,
  ease,
  useLocalTime,
} from "./_shared";

const PROMISES = [
  { kor: "검증된 팀원" },
  { kor: "구조화된 대시보드" },
  { kor: "완주까지 함께" },
];

const WORDMARK_W = 900;
const WORDMARK_H = WORDMARK_W * (388 / 1129); // ≈ 309

export const Scene5SideeEnters = () => {
  const t = useLocalTime();

  const logoIn = ease.easeOutBack(clamp(t / 0.7, 0, 1));
  const logoMove = clamp((t - 1.6) / 0.8, 0, 1);
  const tagIn = clamp((t - 2.4) / 0.6, 0, 1);

  const logoScale = logoIn * (1 - logoMove * 0.3);
  const logoTop = 380 - logoMove * 200;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.SKY,
        color: COLORS.NAVY,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      {/* Soft floating ghosts in bg */}
      <div style={{ position: "absolute", top: 80, right: 120, opacity: 0.22 }}>
        <Img
          src={staticFile("sidee/sidee-mark.svg")}
          style={{ width: 140, height: 140 * (270 / 262) }}
        />
      </div>
      <div style={{ position: "absolute", bottom: 140, left: 80, opacity: 0.16 }}>
        <Img
          src={staticFile("sidee/sidee-mark.svg")}
          style={{ width: 100, height: 100 * (270 / 262) }}
        />
      </div>

      {/* Big wordmark */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: logoTop,
          transform: `translateX(-50%) scale(${logoScale})`,
          opacity: logoIn,
          transformOrigin: "center",
        }}
      >
        <Img
          src={staticFile("sidee/sidee-logo.svg")}
          style={{ width: WORDMARK_W, height: WORDMARK_H, display: "block" }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 560,
          textAlign: "center",
          opacity: tagIn,
          transform: `translateY(${(1 - tagIn) * 12}px)`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.2em",
            fontWeight: 700,
            color: COLORS.BLUE,
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          사이드 프로젝트의 혁신
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          매칭에서 끝나지 않습니다.
          <br />
          <span style={{ color: COLORS.BLUE }}>매칭 이후를 설계합니다.</span>
        </div>
      </div>

      {/* Promise pills */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 100,
          display: "flex",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {PROMISES.map((p, i) => {
          const inT = clamp((t - (3.6 + i * 0.4)) / 0.5, 0, 1);
          return (
            <div
              key={i}
              style={{
                background: COLORS.WHITE,
                padding: "20px 32px",
                borderRadius: 999,
                boxShadow: "0 6px 16px rgba(29,41,85,0.08)",
                opacity: inT,
                transform: `translateY(${(1 - inT) * 14}px) scale(${0.9 + 0.1 * inT})`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: COLORS.BLUE,
                  letterSpacing: "-0.02em",
                }}
              >
                #
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.NAVY,
                }}
              >
                {p.kor}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
