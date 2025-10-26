export const formatDate = (dateString: string) => {
    if (!dateString) return "Ugyldig dato";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Ugyldig dato";

    return date.toLocaleDateString("no-NO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};
