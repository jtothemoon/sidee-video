import { AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile } from "remotion";
import { Scene1KakaoHook } from "./scenes/Scene1KakaoHook";
import { Scene2Survey } from "./scenes/Scene2Survey";
import { Scene3Walls } from "./scenes/Scene3Walls";
import { Scene4Insight } from "./scenes/Scene4Insight";
import { Scene5SideeEnters } from "./scenes/Scene5SideeEnters";
import { Scene6TierDashboard } from "./scenes/Scene6TierDashboard";
import { Scene7AIPortfolio } from "./scenes/Scene7AIPortfolio";
import { Scene8Outro } from "./scenes/Scene8Outro";

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
    </AbsoluteFill>
  );
};
