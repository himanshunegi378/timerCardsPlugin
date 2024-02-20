function showNotification(title) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    return createNotification("TimerCards", {
      body: title,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
    });
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        return createNotification("TimerCards", {
          body: title,
          vibrate: [200, 100, 200, 100, 200, 100, 200],
        });
      }
    });
  }
}

function createNotification(title, options) {
  try {
    new Notification(title, options);
    return true;
  } catch (error) {
    console.log(error);
  }
  navigator.serviceWorker
    .getRegistration()
    .then(function (registration) {
      if (!registration) return false;
      registration.showNotification("TimerCards", options);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

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
    ctx.timerCard.audioPlayer.play(
      "https://raw.githubusercontent.com/himanshunegi378/timerCardsPlugin/main/NotificationPlugin/alarm.mp3",
      2
    );
    // if ("speechSynthesis" in window) {
    //   speechSynthesis.speak(
    //     new SpeechSynthesisUtterance(
    //       `${timerData?.name} timer. finished playing`
    //     )
    //   );
    // } else {
    //   ctx.timerCard.audioPlayer.play(defaultSound, 2);
    // }
  }
});
