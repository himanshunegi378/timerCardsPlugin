import { Button } from "./components/Button";

const injector = ctx.timerCard.injector;
const timerDisplay = injector.get("timerDisplay");

timerDisplay.updateTimerDisplay(Button);
