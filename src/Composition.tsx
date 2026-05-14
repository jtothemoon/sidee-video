import { AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Scene1KakaoHook } from "./scenes/Scene1KakaoHook";
import { Scene2Survey } from "./scenes/Scene2Survey";
import { Scene3Walls } from "./scenes/Scene3Walls";
import { Scene4Insight } from "./scenes/Scene4Insight";
import { Scene5SideeEnters } from "./scenes/Scene5SideeEnters";
import { Scene6TierDashboard } from "./scenes/Scene6TierDashboard";
import { Scene7AIPortfolio } from "./scenes/Scene7AIPortfolio";
import { Scene8Outro } from "./scenes/Scene8Outro";

// Scene 4 → Scene 5 pivot — 어둠에서 해방으로 가는 emotional pivot을 white flash로 강조
const PivotFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [870, 893, 900, 925],
    [0, 0.95, 0.95, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  if (opacity <= 0) return null;
  return (
    <AbsoluteFill
      style={{
        background: "#FFFFFF",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* BGM — quiet 0~28s (무거운 진단) → ramp up 28~32s (Sidee 등장) → full 32~58.5s → fade out */}
      <Html5Audio
        src={staticFile("audio/bgm.mp3")}
        trimBefore={180}
        volume={(f) =>
          interpolate(
            f,
            [0, 15, 840, 960, 1755, 1800],
            [0, 0.18, 0.18, 0.4, 0.4, 0],
            { extrapolateRight: "clamp" }
          )
        }
      />
      {/* SFX — 카톡 ding ×3 (메시지 등장 시점) */}
      <Sequence from={16} durationInFrames={30}>
        <Html5Audio src={staticFile("audio/sfx/kakao-ding.mp3")} volume={0.7} />
      </Sequence>
      <Sequence from={58} durationInFrames={30}>
        <Html5Audio src={staticFile("audio/sfx/kakao-ding.mp3")} volume={0.7} />
      </Sequence>
      <Sequence from={100} durationInFrames={30}>
        <Html5Audio src={staticFile("audio/sfx/kakao-ding.mp3")} volume={0.7} />
      </Sequence>

      {/* SFX — 98% impact (dim overlay + mega 320px 등장) */}
      <Sequence from={165} durationInFrames={60}>
        <Html5Audio src={staticFile("audio/sfx/impact-98.mp3")} volume={0.8} />
      </Sequence>

      {/* SFX — Sidee riser (0:28 build → 0:30 peak, 워드마크 등장과 동기) */}
      <Sequence from={780} durationInFrames={120}>
        <Html5Audio src={staticFile("audio/sfx/sidee-riser.mp3")} volume={0.9} />
      </Sequence>

      {/* SFX — Ghost float-up whoosh (Scene 8 ghost가 워드마크에서 위로 떠오를 때) */}
      <Sequence from={1605} durationInFrames={60}>
        <Html5Audio src={staticFile("audio/sfx/ghost-lift.mp3")} volume={0.7} />
      </Sequence>

      <Sequence durationInFrames={240}>
        <Scene1KakaoHook />
      </Sequence>
      <Sequence from={240} durationInFrames={240}>
        <Scene2Survey />
      </Sequence>
      <Sequence from={480} durationInFrames={210}>
        <Scene3Walls />
      </Sequence>
      <Sequence from={690} durationInFrames={210}>
        <Scene4Insight />
      </Sequence>
      <Sequence from={900} durationInFrames={240}>
        <Scene5SideeEnters />
      </Sequence>
      <Sequence from={1140} durationInFrames={240}>
        <Scene6TierDashboard />
      </Sequence>
      <Sequence from={1380} durationInFrames={210}>
        <Scene7AIPortfolio />
      </Sequence>
      <Sequence from={1590} durationInFrames={210}>
        <Scene8Outro />
      </Sequence>

      {/* Pivot flash overlay — 모든 씬 위에 떠서 Scene 4→5 transition */}
      <PivotFlash />
    </AbsoluteFill>
  );
};
