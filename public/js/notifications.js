
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}


function playSound() {
  const audio = new Audio("/notify.mp3");
  audio.play();
}


async function checkReminders() {
  try {
    const res = await fetch("/api/reminders"); 
    const reminders = await res.json();

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); 

    reminders.forEach(rem => {
      if (rem.time === currentTime) {
        if (Notification.permission === "granted") {
          new Notification("💊 Medicine Reminder", {
            body: `${rem.name} (${rem.dosage}) — ${rem.frequency}`,
            icon: "/favicon.ico"
          });
          playSound();
        }
      }
    });
  } catch (err) {
    console.error("Error checking reminders", err);
  }
}

setInterval(checkReminders, 30000);
