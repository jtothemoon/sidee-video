import { Fragment } from "react";
import { AbsoluteFill } from "remotion";
import {
  COLORS,
  FONT_BODY,
  FONT_DISPLAY,
  clamp,
  ease,
  useLocalTime,
} from "./_shared";

type ChatMessage = {
  sender: string;
  avatar: string;
  avatarColor: string;
  message: string;
  msgStart: number;
  leaveStart: number;
};

const MESSAGES: ChatMessage[] = [
  {
    sender: "기획자",
    avatar: "기",
    avatarColor: "#FFB347",
    message: "나는솔로 본방 봐야해서 그만 둘께요",
    msgStart: 0.6,
    leaveStart: 1.3,
  },
  {
    sender: "디자이너",
    avatar: "디",
    avatarColor: "#9AA1BD",
    message: "회사가 너무 바빠져서 못 할 것 같아요",
    msgStart: 2.0,
    leaveStart: 2.7,
  },
  {
    sender: "개발자",
    avatar: "개",
    avatarColor: "#84A3FF",
    message: "그냥 하기 싫어요",
    msgStart: 3.4,
    leaveStart: 4.1,
  },
];

export const Scene1KakaoHook = () => {
  const t = useLocalTime();

  const chatIn = ease.easeOutCubic(clamp(t / 0.4, 0, 1));
  const dimT = clamp((t - 4.9) / 0.7, 0, 1);
  const punchIn = ease.easeOutCubic(clamp((t - 5.5) / 0.7, 0, 1));

  return (
    <AbsoluteFill
      style={{
        background: COLORS.NAVY_50,
        color: COLORS.NAVY,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      {/* faint dot pattern bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.NAVY_100} 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />

      {/* Chat window */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - chatIn) * 24}px) scale(${0.96 + chatIn * 0.04})`,
          width: 820,
          height: 920,
          background: "#B5C7CD",
          borderRadius: 36,
          boxShadow:
            "0 24px 60px rgba(29,41,85,0.20), 0 6px 16px rgba(29,41,85,0.10)",
          opacity: chatIn,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: COLORS.WHITE,
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderBottom: `1px solid ${COLORS.NAVY_100}`,
          }}
        >
          <div style={{ fontSize: 24, color: COLORS.NAVY_300, lineHeight: 1 }}>
            ←
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
              사이드 프로젝트 팀
            </div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.NAVY_300,
                fontWeight: 500,
                marginTop: 2,
              }}
            >
              4명
            </div>
          </div>
          <div
            style={{
              fontSize: 18,
              color: COLORS.NAVY_300,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            ⋮
          </div>
        </div>

        {/* Chat body */}
        <div
          style={{
            flex: 1,
            padding: "28px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {MESSAGES.map((m, i) => {
            const msgIn = ease.easeOutCubic(
              clamp((t - m.msgStart) / 0.35, 0, 1),
            );
            const leaveIn = clamp((t - m.leaveStart) / 0.35, 0, 1);

            return (
              <Fragment key={i}>
                {/* Message bubble row */}
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    opacity: msgIn,
                    transform: `translateY(${(1 - msgIn) * 20}px)`,
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      background: m.avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: COLORS.WHITE,
                      fontWeight: 800,
                      fontSize: 22,
                      flexShrink: 0,
                      boxShadow: "0 1px 2px rgba(29,41,85,0.10)",
                    }}
                  >
                    {m.avatar}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div
                      style={{
                        fontSize: 14,
                        color: COLORS.NAVY_500,
                        fontWeight: 600,
                      }}
                    >
                      {m.sender}
                    </div>
                    <div
                      style={{
                        background: COLORS.WHITE,
                        padding: "14px 20px",
                        borderRadius: "4px 20px 20px 20px",
                        fontSize: 24,
                        fontWeight: 500,
                        color: COLORS.NAVY,
                        maxWidth: 560,
                        lineHeight: 1.4,
                        boxShadow: "0 1px 2px rgba(29,41,85,0.06)",
                      }}
                    >
                      {m.message}
                    </div>
                  </div>
                </div>

                {/* Leave system message */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    color: COLORS.NAVY_500,
                    fontWeight: 500,
                    opacity: leaveIn,
                    transform: `translateY(${(1 - leaveIn) * 6}px)`,
                  }}
                >
                  — {m.sender}님이 나가셨습니다 —
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Dim overlay + punchline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `rgba(10, 16, 41, ${dimT * 0.78})`,
          opacity: dimT,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          color: COLORS.WHITE,
          opacity: punchIn,
          transform: `translateY(${(1 - punchIn) * 30}px)`,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "#9AA1BD",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          사이드 프로젝트
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 320,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: COLORS.BLUE,
          }}
        >
          98%
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginTop: 12,
          }}
        >
          실패한다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
