import { Easing } from "remotion";

/* ───── Easing curves (Sidee --ease-* tokens) ───── */
export const SIDEE_EASE = {
  /** 기본 — 빠르게 빠져나가는 곡선 (--ease-out). 거의 모든 entry/exit에 사용 */
  out: Easing.bezier(0.2, 0.8, 0.2, 1),
  /** 양방향 균형 (--ease-in-out). 좌우 이동, 회전 같은 대칭 모션 */
  inOut: Easing.bezier(0.4, 0, 0.2, 1),
  /** 바운스 (--ease-bounce). ⚠️ 마스코트 전용 (README 규칙) */
  bounce: Easing.bezier(0.34, 1.56, 0.64, 1),
} as const;

/* ───── Durations (Sidee --dur-* tokens, ms 단위) ───── */
export const SIDEE_DUR_MS = {
  /** 120ms — 마이크로 인터랙션 (hover, 작은 강조) */
  fast: 120,
  /** 200ms — 컴포넌트 단위 (카드 hover, 버튼 press) */
  base: 200,
  /** 360ms — 페이지/씬 단위 (hero 등장, 씬 전환) */
  slow: 360,
} as const;

/* ───── ms → frames 변환 (fps는 useVideoConfig().fps) ───── */
export const msToFrames = (ms: number, fps: number): number =>
  Math.round((ms / 1000) * fps);

/* ───── Sidee entry 슬라이드 거리 (README: "fade + 4–8px slide") ───── */
export const ENTRY_SLIDE_PX = 8;
