
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

// input "data" string from generate result and return object with parsed stats
/*
data is a sting like this:
Objective: 1377631
Route for vehicle 0:
 0 ->  17 ->  11 ->  3 ->  15 ->  10 ->  8 ->  12 ->  7 -> 0
Distance of the route: 13222m

Route for vehicle 1:
 0 ->  13 ->  4 ->  2 ->  18 ->  16 ->  14 ->  9 ->  6 ->  1 ->  19 ->  5 -> 0
Distance of the route: 13509m

Maximum of the route distances: 13509m
Execution time: 0.03887581825256348 seconds
User CPU time: 0.07 seconds
System CPU time: 0.01 seconds
Memory used: 36.890625 MB
Peak memory usage: 285.78125 MB

or this:
No solution found!
*/
export const parseStats = (data: string): any => {
    const stats: any = {};
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('No solution')) {
            stats.execTime = 0;
            stats.userTime = 0;
            stats.sysTime = 0;
            stats.memory = 0;
            stats.memoryPeak = 0;
            return stats;
        }
        else if (line.startsWith('Execution time:')) {
            stats.execTime = parseFloat(line.split(':')[1].trim().split(' ')[0]);
        } else if (line.startsWith('User CPU time:')) {
            stats.userTime = parseFloat(line.split(':')[1].trim().split(' ')[0]);
        } else if (line.startsWith('System CPU time:')) {
            stats.sysTime = parseFloat(line.split(':')[1].trim().split(' ')[0]);
        } else if (line.startsWith('Memory used:')) {
            stats.memory = parseFloat(line.split(':')[1].trim().split(' ')[0]);
        } else if (line.startsWith('Peak memory usage:')) {
            stats.memoryPeak = parseFloat(line.split(':')[1].trim().split(' ')[0]);
        }
    }
    return stats;
}

