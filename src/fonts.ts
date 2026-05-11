import { loadFont as loadQuicksand } from "@remotion/google-fonts/Quicksand";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont } from "@remotion/fonts";
import { staticFile, delayRender, continueRender } from "remotion";

// Display — 워드마크/헤드라인용
loadQuicksand("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Mono — 코드/숫자 디스플레이용 (필요 없으면 이 블록 삭제)
loadJetBrainsMono("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

// Body — Pretendard Variable (한+영 본문)
const pretendardHandle = delayRender("Loading Pretendard Variable");

loadFont({
  family: "Pretendard Variable",
  url: staticFile("fonts/PretendardVariable.woff2"),
  weight: "100 900", // variable font weight 범위
  format: "woff2",
})
  .then(() => continueRender(pretendardHandle))
  .catch((err) => {
    console.error("Pretendard load failed:", err);
    continueRender(pretendardHandle);
  });
