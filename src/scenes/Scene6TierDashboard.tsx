import { AbsoluteFill } from "remotion";
import {
  COLORS,
  FONT_BODY,
  FONT_DISPLAY,
  clamp,
  useLocalTime,
} from "./_shared";

const TIERS = [
  { name: "Bronze",   color: "#B4744B", threshold: 1.3 },
  { name: "Silver",   color: "#8A95A8", threshold: 1.5 },
  { name: "Gold",     color: "#E0A82E", threshold: 1.7 },
  { name: "Platinum", color: "#7E8FB0", threshold: 1.9 },
  { name: "Diamond",  color: COLORS.BLUE, threshold: 2.1 },
];

const AVATARS = [
  { ini: "JY", color: "#3368FF" },
  { ini: "CR", color: "#5B85FF" },
  { ini: "MJ", color: "#9AA1BD" },
  { ini: "SH", color: "#E0A82E" },
];

type TodoStatus = "wait" | "progress" | "done";

const TODOS: { txt: string; status: TodoStatus; start: number }[] = [
  { txt: "로그인 API",     status: "done",     start: 3.0 },
  { txt: "온보딩 화면",     status: "progress", start: 3.3 },
  { txt: "대시보드 라우팅", status: "progress", start: 3.6 },
  { txt: "결제 흐름 설계",  status: "wait",     start: 3.9 },
  { txt: "리서치 정리",     status: "wait",     start: 4.2 },
];

export const Scene6TierDashboard = () => {
  const t = useLocalTime();

  const headerIn = clamp(t / 0.5, 0, 1);
  const tierIn = clamp((t - 0.5) / 0.6, 0, 1);
  const dashIn = clamp((t - 2.0) / 0.6, 0, 1);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.NAVY_50,
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
          How Sidee works · 01 + 02
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          신뢰는 <span style={{ color: COLORS.BLUE }}>등급</span>으로, 진행은{" "}
          <span style={{ color: COLORS.BLUE }}>대시보드</span>로.
        </div>
      </div>

      {/* Tier card (left) */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 100,
          width: 800,
          background: COLORS.WHITE,
          borderRadius: 28,
          padding: 40,
          boxShadow:
            "0 16px 32px rgba(29,41,85,0.10), 0 4px 8px rgba(29,41,85,0.05)",
          opacity: tierIn,
          transform: `translateY(${(1 - tierIn) * 16}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                color: COLORS.BLUE,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              01 · TIER
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, marginTop: 4 }}>
              검증된 신뢰 등급
            </div>
          </div>
          <div
            style={{
              background: COLORS.SKY,
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 14,
              color: COLORS.BLUE,
              fontWeight: 700,
            }}
          >
            GitHub · Figma 연동
          </div>
        </div>

        {/* Tier badges */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 16,
            marginTop: 16,
          }}
        >
          {TIERS.map((tier, i) => {
            const fillT = clamp((t - tier.threshold) / 0.24, 0, 1);
            const filled = fillT > 0;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  transform: `scale(${0.92 + 0.08 * fillT})`,
                  opacity: 0.35 + 0.65 * fillT,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    background: filled ? tier.color : "#E5E7EF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.WHITE,
                    fontWeight: 800,
                    fontSize: 22,
                    fontFamily: FONT_DISPLAY,
                    boxShadow: filled ? `0 6px 16px ${tier.color}50` : "none",
                  }}
                >
                  T{i + 1}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: filled ? COLORS.NAVY : COLORS.NAVY_300,
                  }}
                >
                  {tier.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Weight breakdown */}
        <div
          style={{
            marginTop: 28,
            padding: "16px 20px",
            background: COLORS.NAVY_50,
            borderRadius: 16,
            fontSize: 15,
            color: COLORS.NAVY_500,
            lineHeight: 1.5,
            display: "flex",
            gap: 28,
          }}
        >
          <div>
            <strong style={{ color: COLORS.NAVY }}>40%</strong> 피어리뷰
          </div>
          <div>
            <strong style={{ color: COLORS.NAVY }}>40%</strong> 프로젝트 완수율
          </div>
          <div>
            <strong style={{ color: COLORS.NAVY }}>20%</strong> 리더 경험
          </div>
        </div>
      </div>

      {/* Dashboard card (right) */}
      <div
        style={{
          position: "absolute",
          top: 320,
          right: 100,
          width: 800,
          background: COLORS.WHITE,
          borderRadius: 28,
          padding: 40,
          boxShadow:
            "0 16px 32px rgba(29,41,85,0.10), 0 4px 8px rgba(29,41,85,0.05)",
          opacity: dashIn,
          transform: `translateY(${(1 - dashIn) * 16}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                color: COLORS.BLUE,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              02 · DASHBOARD
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, marginTop: 4 }}>
              팀의 진행이 보이는 곳
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {AVATARS.map((a, i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: a.color,
                  border: `3px solid ${COLORS.WHITE}`,
                  marginLeft: i === 0 ? 0 : -10,
                  color: COLORS.WHITE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {a.ini}
              </div>
            ))}
          </div>
        </div>

        {/* Coretime row */}
        <div
          style={{
            margin: "8px 0 16px",
            padding: 14,
            background: COLORS.SKY,
            borderRadius: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: COLORS.BLUE,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              CORETIME · WED
            </div>
            <div
              style={{ fontSize: 13, color: COLORS.NAVY_500, fontWeight: 600 }}
            >
              21:00 – 23:30
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: 24 }).map((_, h) => {
              const active = h >= 21 || h === 0;
              const overlap = h >= 21 && h <= 23;
              return (
                <div
                  key={h}
                  style={{
                    flex: 1,
                    height: 16,
                    background: overlap
                      ? COLORS.BLUE
                      : active
                      ? "#ADC1FF"
                      : COLORS.WHITE,
                    borderRadius: 4,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Kanban */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          {(["대기", "진행", "완료"] as const).map((col, ci) => {
            const statusOfCol: TodoStatus =
              ci === 0 ? "wait" : ci === 1 ? "progress" : "done";
            const borderColor =
              ci === 2 ? "#16A34A" : ci === 1 ? COLORS.BLUE : COLORS.NAVY_300;
            return (
              <div
                key={ci}
                style={{
                  background: COLORS.NAVY_50,
                  borderRadius: 12,
                  padding: 12,
                  minHeight: 180,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: COLORS.NAVY_500,
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                  }}
                >
                  {col.toUpperCase()}
                </div>
                {TODOS.filter((td) => td.status === statusOfCol).map(
                  (td, ti) => {
                    const fadeIn = clamp((t - td.start) / 0.3, 0, 1);
                    return (
                      <div
                        key={ti}
                        style={{
                          background: COLORS.WHITE,
                          padding: "10px 12px",
                          borderRadius: 10,
                          marginBottom: 6,
                          fontSize: 13,
                          color: COLORS.NAVY,
                          fontWeight: 600,
                          boxShadow: "0 1px 2px rgba(29,41,85,0.06)",
                          opacity: fadeIn,
                          transform: `translateY(${(1 - fadeIn) * 8}px)`,
                          borderLeft: `3px solid ${borderColor}`,
                        }}
                      >
                        {td.txt}
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
