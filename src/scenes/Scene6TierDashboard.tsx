import { AbsoluteFill, Img, staticFile } from "remotion";
import {
  COLORS,
  FONT_BODY,
  FONT_DISPLAY,
  clamp,
  useLocalTime,
} from "./_shared";

// Sidee 신뢰 등급제 — design-system의 TierBadge 색상 그대로
const TIERS = [
  { name: "C",  desc: "시작",   color: "#AEB0B6",  threshold: 1.3 },
  { name: "B",  desc: "입문",   color: "#8AA4FF",  threshold: 1.55 },
  { name: "A",  desc: "성장",   color: "#5278FF",  threshold: 1.8 },
  { name: "S2", desc: "검증",   color: COLORS.BLUE, threshold: 2.05 },
  { name: "S1", desc: "최상위", color: COLORS.NAVY, threshold: 2.3 },
];

const AVATARS = [
  { ini: "JY", color: "#3368FF" },
  { ini: "CR", color: "#5B85FF" },
  { ini: "MJ", color: "#9AA1BD" },
  { ini: "SH", color: "#E0A82E" },
];

// design-system ProjectDetail.jsx의 TODO 대시보드 미리보기 그대로
type TodoStatus = "완료" | "진행" | "대기";

const STATUS_STYLE: Record<TodoStatus, { bg: string; color: string }> = {
  완료: { bg: "#F2FFF6", color: "#006E25" },
  진행: { bg: "#EBF0FF", color: COLORS.NAVY },
  대기: { bg: "#F4F4F5", color: "rgba(55,56,60,0.61)" },
};

const TODOS: { status: TodoStatus; title: string; who: string; start: number }[] = [
  { status: "완료", title: "PRD 초안 작성",        who: "예랑", start: 3.0 },
  { status: "완료", title: "디자인 시스템 토큰",   who: "eura",   start: 3.4 },
  { status: "진행", title: "로그인 API 연결",      who: "현진",   start: 3.8 },
  { status: "진행", title: "프로필 카드 인터랙션", who: "Carl",   start: 4.2 },
  { status: "대기", title: "마케팅 준비",       who: "태정",      start: 4.6 },
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
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Img
              src={staticFile("icons/GitHub.svg")}
              style={{ width: 18, height: 18, display: "block" }}
            />
            <span>GitHub</span>
            <span style={{ color: COLORS.NAVY_300, margin: "0 2px" }}>·</span>
            <Img
              src={staticFile("icons/Figma.svg")}
              style={{ width: 18, height: 18, display: "block" }}
            />
            <span>Figma 연동</span>
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
                    fontSize: 26,
                    fontFamily: FONT_DISPLAY,
                    letterSpacing: "-0.02em",
                    boxShadow: filled ? `0 6px 16px ${tier.color}50` : "none",
                  }}
                >
                  {tier.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: filled ? COLORS.NAVY_500 : COLORS.NAVY_300,
                  }}
                >
                  {tier.desc}
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

        {/* TODO 대시보드 미리보기 — rows */}
        <div style={{ marginTop: 4 }}>
          <div
            style={{
              fontSize: 13,
              color: COLORS.NAVY_500,
              fontWeight: 700,
              letterSpacing: "0.06em",
              marginBottom: 10,
            }}
          >
            TODO 대시보드 미리보기
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {TODOS.map((td, i) => {
              const fadeIn = clamp((t - td.start) / 0.3, 0, 1);
              const s = STATUS_STYLE[td.status];
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr auto",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    background: "#FCFCFD",
                    borderRadius: 10,
                    opacity: fadeIn,
                    transform: `translateY(${(1 - fadeIn) * 8}px)`,
                  }}
                >
                  <span
                    style={{
                      background: s.bg,
                      color: s.color,
                      padding: "3px 0",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    {td.status}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      color: "rgba(46,47,51,0.88)",
                      fontWeight: 500,
                    }}
                  >
                    {td.title}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: "rgba(55,56,60,0.61)",
                      fontWeight: 500,
                    }}
                  >
                    {td.who}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer — GitHub/Figma 연동 */}
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: `1px solid ${COLORS.NAVY_100}`,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "rgba(55,56,60,0.61)",
              fontWeight: 500,
            }}
          >
            <Img
              src={staticFile("icons/GitHub.svg")}
              style={{ width: 16, height: 16, display: "block" }}
            />
            <Img
              src={staticFile("icons/Figma.svg")}
              style={{ width: 16, height: 16, display: "block" }}
            />
            <span style={{ marginLeft: 4 }}>
              API 연동으로 작업 활동이 자동 반영돼요
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
