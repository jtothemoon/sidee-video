import { Easing, useCurrentFrame, useVideoConfig } from "remotion";

export const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

// 샘플 easing → Remotion Easing.bezier 매핑
export const ease = {
  linear: Easing.linear,
  easeInQuad: Easing.bezier(0.55, 0.085, 0.68, 0.53),
  easeOutQuad: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  easeInOutQuad: Easing.bezier(0.455, 0.03, 0.515, 0.955),
  easeInCubic: Easing.bezier(0.55, 0.055, 0.675, 0.19),
  easeOutCubic: Easing.bezier(0.215, 0.61, 0.355, 1),
  easeInOutCubic: Easing.bezier(0.645, 0.045, 0.355, 1),
  easeOutQuart: Easing.bezier(0.165, 0.84, 0.44, 1),
  easeInExpo: Easing.bezier(0.95, 0.05, 0.795, 0.035),
  easeOutExpo: Easing.bezier(0.19, 1, 0.22, 1),
  easeOutBack: Easing.bezier(0.34, 1.56, 0.64, 1),
  easeInBack: Easing.bezier(0.6, -0.28, 0.735, 0.045),
};

// 샘플의 useSprite().localTime 대체 — 현재 Sequence 시작점 기준 초 단위 시간
export const useLocalTime = (): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

// 공통 색·폰트 토큰 (샘플의 NAVY/BLUE/SKY 등을 그대로)
export const COLORS = {
  NAVY: "#1D2955",
  BLUE: "#3368FF",
  SKY: "#EBF0FF",
  SKY_DEEP: "#D6E0FF",
  NAVY_50: "#F4F5F9",
  NAVY_100: "#E5E7EF",
  NAVY_200: "#C7CBDB",
  NAVY_300: "#9AA1BD",
  NAVY_500: "#455080",
  WHITE: "#FFFFFF",
};

export const FONT_DISPLAY = "'Quicksand', 'Pretendard Variable', sans-serif";
export const FONT_BODY = "'Pretendard Variable', 'Pretendard', sans-serif";
export const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";
