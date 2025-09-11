// public/js/notifications.js

// Ask for notification permission
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Play sound helper
function playSound() {
  const audio = new Audio("/notify.mp3");
  audio.play();
}

// Check reminders every 30 seconds
async function checkReminders() {
  try {
    const res = await fetch("/api/reminders"); // call backend endpoint
    const reminders = await res.json();

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // format: HH:MM

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

// Run every 30s
setInterval(checkReminders, 30000);
