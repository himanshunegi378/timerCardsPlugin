import { jsx as t } from "react/jsx-runtime";
function i() {
  return /* @__PURE__ */ t("button", { onClick: () => {
    alert("hello form plugin");
  } });
}
const r = ctx.timerCard.injector, o = r.get("timerDisplay");
o.updateTimerDisplay(i);
