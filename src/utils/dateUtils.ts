export const formatDate = (isoString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(isoString).toLocaleDateString(undefined, options);
}
