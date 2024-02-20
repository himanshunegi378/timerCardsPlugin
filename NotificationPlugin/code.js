ctx.timerCard.on("timerFinished", async (timerId) => {
  const cardName = ctx.timerCard.timerCardData.timerGroup.name;
  const timerData = ctx.timerCard.timerCardData.timerGroup.timers.find(
    (timer) => timer.id === timerId
  );

  showNotification(`${cardName} => ${timerData?.name} finished`);
  const audioId = timerData?.options.audioId;
  if (audioId) {
    const audioBlob = await audioStorage.load(audioId);
    //@ts-ignore
    ctx.timerCard.audioPlayer.play(URL.createObjectURL(audioBlob));
  } else {
    // if speech syntesis is available use that else use default sound
    console.log(defaultSound);
    ctx.timerCard.audioPlayer.play(defaultSound, 2);
    return;
    if ("speechSynthesis" in window) {
      speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          `${timerData?.name} timer. finished playing`
        )
      );
    } else {
      ctx.timerCard.audioPlayer.play(defaultSound, 2);
    }
  }
});
