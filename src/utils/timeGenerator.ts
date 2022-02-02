export const generator = (quantity: Number) => {
  let hours = 8;
  let minutes = 0;

  let availableSlots = [];

  for (let i = 0; i < quantity; i++) {
    availableSlots.push({ h: hours, m: minutes });

    if (minutes === 30) {
      minutes = 0;
      hours++;
    } else {
      minutes = 30;
    }
  }

  return availableSlots;
};
