
// usage: const executionTime = timeDiff(problem.timestampStart, problem.timestampEnd);
/** timeDiff
* @param start: string (eg: "2021-01-11T10:25:59.784Z")
* @param end: string (eg: "2021-01-11T10:25:59.784Z")
* @returns number (time diffrence in milliseconds)
* */
export const timeDiff = (start: string, end: string): number => {
    if(end === "") return -1;
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    return endTime - startTime;
}

/** timeFormat
 * @param time: number (time in milliseconds)
 * @returns string (time in human readable format, eg: "2 hours 30 minutes 10 seconds")
 * */
export const timeFormat = (time: number): string => {

    if(time === -1) return "Not finished yet";

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    let formattedTime = "";

    if (days > 0) {
        formattedTime += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
        formattedTime += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
        formattedTime += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
    if (seconds > 0) {
        formattedTime += `${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    // Remove trailing space
    formattedTime = formattedTime.trim();

    return formattedTime;
}

