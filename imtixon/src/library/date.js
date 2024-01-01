export const generateDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let soat;
    let minut;
    let sekund;
    if (hours < 10) {
      soat = `0${hours}`;
    } else {
      soat = hours;
    }
    if (minutes < 10) {
      minut = `0${minutes}`;
    } else {
      minut = minutes;
    }
    if (seconds < 10) {
      sekund = `0${seconds}`;
    } else {
      sekund = seconds;
    }
    const newDate = `${year}:${month + 1}:${days} ${soat}:${minut}:${sekund}`;
    return newDate;
  };
  