import { AbsoluteFill } from "remotion";
import {
  COLORS,
  FONT_BODY,
  FONT_DISPLAY,
  clamp,
  useLocalTime,
} from "./_shared";

const TOTAL = 51;
const COLS = 17;
const ROWS = 3;
const DOT_SIZE = 80;
const GAP = 18;

// 51명 중 상위 11명(≈21.6%)이 "출시까지 도달한 survivor"
const SURVIVORS = 11;

export const Scene2Survey = () => {
  const t = useLocalTime();
  const headerIn = clamp((t - 0.1) / 0.5, 0, 1);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.SKY,
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
          사이드 프로젝트 경험자 대상 설문
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          51명에게 물었습니다.
          <br />
          <span style={{ color: COLORS.NAVY_500, fontWeight: 600 }}>
            "끝까지 가본 적, 있나요?"
          </span>
        </div>
      </div>

      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 460,
          transform: "translateX(-50%)",
          width: COLS * DOT_SIZE + (COLS - 1) * GAP,
          height: ROWS * DOT_SIZE + (ROWS - 1) * GAP,
        }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const appearAt = 0.6 + i * 0.018;
          const appearT = clamp((t - appearAt) / 0.25, 0, 1);

          const isSurvivor = i < SURVIVORS;

          const grayAt = 3.0 + (i % 5) * 0.06;
          const grayT = !isSurvivor ? clamp((t - grayAt) / 0.4, 0, 1) : 0;

          const highlightAt = 5.2 + (i % 5) * 0.05;
          const hlT = isSurvivor ? clamp((t - highlightAt) / 0.35, 0, 1) : 0;

          let fill: string = COLORS.NAVY_300;
          if (grayT > 0) {
            fill = `rgba(154, 161, 189, ${1 - grayT * 0.6})`;
          }
          if (hlT > 0) {
            fill = COLORS.BLUE;
          }

          const scaleD = !isSurvivor ? 1 - grayT * 0.35 : 1;
          const scaleH = isSurvivor ? 1 + hlT * 0.18 : 1;
          const opacity = appearT * (!isSurvivor ? 1 - grayT * 0.55 : 1);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: col * (DOT_SIZE + GAP),
                top: row * (DOT_SIZE + GAP),
                width: DOT_SIZE,
                height: DOT_SIZE,
                borderRadius: "50%",
                background: fill,
                opacity,
                transform: `scale(${appearT * scaleD * scaleH})`,
                boxShadow: hlT > 0 ? "0 6px 16px rgba(51,104,255,0.35)" : "none",
              }}
            />
          );
        })}
      </div>

      {/* Stat callouts */}
      <StatCallouts t={t} />
    </AbsoluteFill>
  );
};

const StatCallouts: React.FC<{ t: number }> = ({ t }) => {
  const stopIn = clamp((t - 4.0) / 0.5, 0, 1);
  const launchIn = clamp((t - 6.0) / 0.5, 0, 1);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 100,
          bottom: 110,
          opacity: stopIn,
          transform: `translateY(${(1 - stopIn) * 14}px) scale(${0.95 + stopIn * 0.05})`,
          transformOrigin: "left bottom",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 120,
            fontWeight: 800,
            color: COLORS.NAVY,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          98<span style={{ fontSize: 64 }}>%</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: COLORS.NAVY_500,
            fontWeight: 600,
            marginTop: 4,
          }}
        >
          중도 포기를 경험
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 100,
          bottom: 110,
          textAlign: "right",
          opacity: launchIn,
          transform: `translateY(${(1 - launchIn) * 14}px) scale(${0.88 + launchIn * 0.12})`,
          transformOrigin: "right bottom",
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 120,
            fontWeight: 800,
            color: COLORS.BLUE,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          21.6<span style={{ fontSize: 64 }}>%</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: COLORS.NAVY_500,
            fontWeight: 600,
            marginTop: 4,
          }}
        >
          출시까지 도달
        </div>
      </div>
    </>
  );
};
