/** Datum auf Deutsch, z. B. „5. Juli 2026“ */
export const getFormattedDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("de-DE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
