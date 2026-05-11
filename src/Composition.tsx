import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { SIDEE_EASE, SIDEE_DUR_MS, msToFrames, ENTRY_SLIDE_PX } from "./motion";

/* ───── Mascot — sky squircle 위 고스트, bounce 등장 ───── */
const Mascot: React.FC<{ start?: number }> = ({ start = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;
  const dur = msToFrames(SIDEE_DUR_MS.slow * 1.5, fps); // 540ms — 바운스 여유

  const scale = interpolate(local, [0, dur], [0.6, 1], {
    easing: SIDEE_EASE.bounce,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(
    local,
    [0, msToFrames(SIDEE_DUR_MS.base, fps)],
    [0, 1],
    {
      easing: SIDEE_EASE.out,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <Img
      src={staticFile("sidee/sidee-app-icon.svg")}
      style={{
        width: 280,
        height: 280,
        opacity,
        transform: `scale(${scale})`,
      }}
    />
  );
};

/* ───── Wordmark — fade + 8px slide-up (Sidee entry 패턴) ───── */
const Wordmark: React.FC<{ start?: number }> = ({ start = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;
  const dur = msToFrames(SIDEE_DUR_MS.slow, fps);

  const opacity = interpolate(local, [0, dur], [0, 1], {
    easing: SIDEE_EASE.out,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ty = interpolate(local, [0, dur], [ENTRY_SLIDE_PX, 0], {
    easing: SIDEE_EASE.out,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Img
      src={staticFile("sidee/sidee-logo.svg")}
      style={{
        width: 460,
        height: 460 * (388 / 1129), // 원본 비율 유지 ≈ 158px
        opacity,
        transform: `translateY(${ty}px)`,
      }}
    />
  );
};

/* ───── Tagline — Pretendard 본문 ───── */
const Tagline: React.FC<{ start?: number }> = ({ start = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;
  const dur = msToFrames(SIDEE_DUR_MS.slow, fps);

  const opacity = interpolate(local, [0, dur], [0, 1], {
    easing: SIDEE_EASE.out,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ty = interpolate(local, [0, dur], [ENTRY_SLIDE_PX, 0], {
    easing: SIDEE_EASE.out,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="font-body text-md text-fg-2"
      style={{
        opacity,
        transform: `translateY(${ty}px)`,
      }}
    >
      티어로 검증된 팀원과 사이드 프로젝트를 시작하세요
    </div>
  );
};

/* ───── 메인 컴포지션 ───── */
export const MyComposition: React.FC = () => {
  const { fps } = useVideoConfig();
  const beat = msToFrames(SIDEE_DUR_MS.slow, fps); // 360ms ≈ 11 frames @ 30fps

  return (
    <AbsoluteFill className="bg-bg-app items-center justify-center gap-12">
      <Mascot start={0} />
      <Wordmark start={beat} />
      <Tagline start={beat * 2} />
    </AbsoluteFill>
  );
};
