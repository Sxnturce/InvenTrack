function ParseDate(fecha) {
  const date = new Date(fecha);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const formated = date.toLocaleString("es-ES", options);
  return formated;
}

export default ParseDate;