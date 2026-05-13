import { AbsoluteFill } from "remotion";
import { COLORS, FONT_BODY, clamp, useLocalTime } from "./_shared";

export const Scene4Insight = () => {
  const t = useLocalTime();

  const eyebrowIn = clamp((t - 0.3) / 0.5, 0, 1);
  const openerIn = clamp((t - 0.9) / 0.7, 0, 1);
  const l1In = clamp((t - 1.9) / 0.6, 0, 1);
  const strikeT = clamp((t - 3.0) / 0.4, 0, 1);
  const l2In = clamp((t - 3.6) / 0.6, 0, 1);
  const l3In = clamp((t - 5.0) / 0.6, 0, 1);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.NAVY} 0%, #0A1029 100%)`,
        color: COLORS.WHITE,
        fontFamily: FONT_BODY,
        overflow: "hidden",
      }}
    >
      {/* Subtle dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
          backgroundSize: "60px 60px",
          opacity: 0.6,
        }}
      />

      {/* Centered text block */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            width: 80,
            height: 2,
            background: "#84A3FF",
            borderRadius: 2,
            marginBottom: 32,
            opacity: eyebrowIn,
            transform: `translateY(${(1 - eyebrowIn) * 12}px)`,
          }}
        />

        {/* Emotional opener */}
        <div
          style={{
            fontSize: 44,
            fontStyle: "italic",
            fontWeight: 500,
            lineHeight: 1.35,
            color: "#C7CBDB",
            letterSpacing: "-0.01em",
            marginBottom: 44,
            opacity: openerIn,
            transform: `translateY(${(1 - openerIn) * 12}px)`,
          }}
        >
          "우리가 잃은 건 시간만이 아니다."
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            opacity: l1In,
            transform: `translateY(${(1 - l1In) * 12}px)`,
          }}
        >
          문제는{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{ color: "#9AA1BD" }}>사람의 능력</span>
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 5,
                background: "#EF4444",
                transform: `translateY(-2px) scaleX(${strikeT})`,
                transformOrigin: "left center",
                borderRadius: 3,
              }}
            />
          </span>
          이 아니라
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginTop: 28,
            opacity: l2In,
            transform: `translateY(${(1 - l2In) * 14}px)`,
          }}
        >
          <span style={{ color: "#84A3FF" }}>관계의 구조</span>에 있었다.
        </div>

        <div
          style={{
            fontSize: 26,
            color: "#C7CBDB",
            marginTop: 56,
            fontWeight: 500,
            lineHeight: 1.5,
            maxWidth: 900,
            opacity: l3In,
            transform: `translateY(${(1 - l3In) * 10}px)`,
          }}
        >
          혼자의 의지만으로는, 끝까지 갈 수 없습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
