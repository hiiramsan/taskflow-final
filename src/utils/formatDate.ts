/* 
prompt i used: my backend is returning due dates like this:
2026-09-08  

Make a util method to format the date like:
SEP 08
but if the day is tomorrow will say TOMORROW
and if the day is today will say TODAY, TS 
*/
export const formatDueDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-").map(Number);

    const dueDate = new Date(year, month - 1, day);
    const today = new Date();
    const tomorrow = new Date();

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    dueDate.setHours(0, 0, 0, 0);

    if (dueDate.getTime() === today.getTime()) {
        return "TODAY";
    }

    if (dueDate.getTime() === tomorrow.getTime()) {
        return "TOMORROW";
    }

    return dueDate
        .toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
        })
        .toUpperCase();
};