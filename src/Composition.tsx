import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Diary } from "./scenes/Scene1Diary";
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
      <Sequence durationInFrames={240}>
        <Scene1Diary />
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
