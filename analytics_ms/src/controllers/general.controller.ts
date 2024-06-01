import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";

const MIN_INIT = -1;
const MAX_INIT = 999999999;

function ff(num: number) { // force float
    return parseFloat(num.toString());
}

export const getGeneral = async (req: Request, res: Response) => {
    
    // get general statistics for all problems
    const problems = await database.getRepository(Problem).find();

    if (!problems) {
        res.status(404).json({ message: 'No problems found!' });
        return;
    }
    
    const general = {
        nProblemsSubmitted: problems.length,
        nProblemsSolved: 0,

        // submission time
        avgTimeAfterSubmission: 0,
        minTimeAfterSubmission: MAX_INIT,
        maxTimeAfterSubmission: MIN_INIT,

        // exec time
        avgExecTime: 0,
        minExecTime: MAX_INIT,
        maxExecTime: MIN_INIT,

        // user time
        avgUserTime: 0,
        minUserTime: MAX_INIT,
        maxUserTime: MIN_INIT,

        // sys time
        avgSysTime: 0,
        minSysTime: MAX_INIT,
        maxSysTime: MIN_INIT,

        // memory
        avgMemory: 0, // in MB
        minMemory: MAX_INIT,
        maxMemory: MIN_INIT,
        
        // memory peak
        avgMemoryPeak: 0, // in MB
        minMemoryPeak: MAX_INIT,
        maxMemoryPeak: MIN_INIT,

        solversStats: [{}],
        monthlyStats: [{}]
    };
    let solversStatsArray : any[] = [];
    let monthlyStats : any[] = [];
    
    problems.forEach(problem => {

        if(problem.timeAfterSubmission === -1) return; // problem not finished yet
        general.nProblemsSolved++; // else problem is solved

        // get tss (Thistss - solver object that ontains stats for this specific solver)
        const solverName = problem.solver;
        let tss = solversStatsArray.find(solver => solver.name === solverName);
        if (!tss) {
            solversStatsArray.push({
                name: solverName,
                nProblemsSolved: 0,
                
                // submission time
        avgTimeAfterSubmission: 0,
        minTimeAfterSubmission: MAX_INIT,
        maxTimeAfterSubmission: MIN_INIT,

        // exec time
        avgExecTime: 0,
        minExecTime: MAX_INIT,
        maxExecTime: MIN_INIT,

        // user time
        avgUserTime: 0,
        minUserTime: MAX_INIT,
        maxUserTime: MIN_INIT,

        // sys time
        avgSysTime: 0,
        minSysTime: MAX_INIT,
        maxSysTime: MIN_INIT,

        // memory
        avgMemory: 0, // in MB
        minMemory: MAX_INIT,
        maxMemory: MIN_INIT,
        
        // memory peak
        avgMemoryPeak: 0, // in MB
        minMemoryPeak: MAX_INIT,
        maxMemoryPeak: MIN_INIT
            });
        }
        const tssIndex = solversStatsArray.findIndex(solver => solver.name === solverName);
        tss = solversStatsArray[tssIndex];
        tss.nProblemsSolved++;
        
        // get tms (ThisMonthlyStats - monthly object that contains stats for this specific month)
        const currentMonth = problem.solvedAt.slice(0, 7);
        let monthlyStatsIndex = monthlyStats.findIndex(month => month.month === currentMonth);
        if (monthlyStatsIndex === -1) {
            monthlyStats.push({
                month: currentMonth,
                nProblemsFinishedInThisMonth: 0,
                
                // submission time
        avgTimeAfterSubmission: 0,
        minTimeAfterSubmission: MAX_INIT,
        maxTimeAfterSubmission: MIN_INIT,

        // exec time
        avgExecTime: 0,
        minExecTime: MAX_INIT,
        maxExecTime: MIN_INIT,

        // user time
        avgUserTime: 0,
        minUserTime: MAX_INIT,
        maxUserTime: MIN_INIT,

        // sys time
        avgSysTime: 0,
        minSysTime: MAX_INIT,
        maxSysTime: MIN_INIT,

        // memory
        avgMemory: 0, // in MB
        minMemory: MAX_INIT,
        maxMemory: MIN_INIT,
        
        // memory peak
        avgMemoryPeak: 0, // in MB
        minMemoryPeak: MAX_INIT,
        maxMemoryPeak: MIN_INIT
            });
            monthlyStatsIndex = monthlyStats.length - 1;
        }
        const tms = monthlyStats[monthlyStatsIndex];
        tms.nProblemsFinishedInThisMonth++;


        // ======== update stats =========

        // 1. time after submission

        // 1.1 general
        const probTAS = ff(problem.timeAfterSubmission);
        general.avgTimeAfterSubmission += probTAS;
        if (probTAS < general.minTimeAfterSubmission) general.minTimeAfterSubmission = probTAS;
        if (probTAS > general.maxTimeAfterSubmission) general.maxTimeAfterSubmission = probTAS;
        // 1.2 solver
        tss.avgTimeAfterSubmission += probTAS;
        if (probTAS < tss.minTimeAfterSubmission) tss.minTimeAfterSubmission = probTAS;
        if (probTAS > tss.maxTimeAfterSubmission) tss.maxTimeAfterSubmission = probTAS;
        // 1.3 monthly
        tms.avgTimeAfterSubmission += probTAS;
        if (probTAS < tms.minTimeAfterSubmission) tms.minTimeAfterSubmission = probTAS;
        if (probTAS > tms.maxTimeAfterSubmission) tms.maxTimeAfterSubmission = probTAS;

        // 2. exec time

        // 2.1 general
        const probET = ff(problem.execTime);
        general.avgExecTime += probET;
        if (probET < general.minExecTime) general.minExecTime = probET;
        if (probET > general.maxExecTime) general.maxExecTime = probET;
        // 2.2 solver
        tss.avgExecTime += probET;
        if (probET < tss.minExecTime) tss.minExecTime = probET;
        if (probET > tss.maxExecTime) tss.maxExecTime = probET;
        // 2.3 monthly
        tms.avgExecTime += probET;
        if (probET < tms.minExecTime) tms.minExecTime = probET;
        if (probET > tms.maxExecTime) tms.maxExecTime = probET;

        // 3. user time

        // 3.1 general
        const probUT = ff(problem.userTime);
        general.avgUserTime += probUT;
        if (probUT < general.minUserTime) general.minUserTime = probUT;
        if (probUT > general.maxUserTime) general.maxUserTime = probUT;
        // 3.2 solver
        tss.avgUserTime += probUT;
        if (probUT < tss.minUserTime) tss.minUserTime = probUT;
        if (probUT > tss.maxUserTime) tss.maxUserTime = probUT;
        // 3.3 monthly
        tms.avgUserTime += probUT;
        if (probUT < tms.minUserTime) tms.minUserTime = probUT;
        if (probUT > tms.maxUserTime) tms.maxUserTime = probUT;

        // 4. sys time

        // 4.1 general
        const probST = ff(problem.sysTime);
        general.avgSysTime += probST;
        if (probST < general.minSysTime) general.minSysTime = probST;
        if (probST > general.maxSysTime) general.maxSysTime = probST;
        // 4.2 solver
        tss.avgSysTime += probST;
        if (probST < tss.minSysTime) tss.minSysTime = probST;
        if (probST > tss.maxSysTime) tss.maxSysTime = probST;
        // 4.3 monthly
        tms.avgSysTime += probST;
        if (probST < tms.minSysTime) tms.minSysTime = probST;
        if (probST > tms.maxSysTime) tms.maxSysTime = probST;

        // 5. memory

        // 5.1 general
        const probM = ff(problem.memory);
        general.avgMemory += probM;
        if (probM < general.minMemory) general.minMemory = probM;
        if (probM > general.maxMemory) general.maxMemory = probM;
        // 5.2 solver
        tss.avgMemory += probM;
        if (probM < tss.minMemory) tss.minMemory = probM;
        if (probM > tss.maxMemory) tss.maxMemory = probM;
        // 5.3 monthly
        tms.avgMemory += probM;
        if (probM < tms.minMemory) tms.minMemory = probM;
        if (probM > tms.maxMemory) tms.maxMemory = probM;

        // 6. memory peak

        // 6.1 general
        const probMP = ff(problem.memoryPeak);
        general.avgMemoryPeak += probMP;
        if (probMP < general.minMemoryPeak) general.minMemoryPeak = probMP;
        if (probMP > general.maxMemoryPeak) general.maxMemoryPeak = probMP;
        // 6.2 solver
        tss.avgMemoryPeak += probMP;
        if (probMP < tss.minMemoryPeak) tss.minMemoryPeak = probMP;
        if (probMP > tss.maxMemoryPeak) tss.maxMemoryPeak = probMP;
        // 6.3 monthly
        tms.avgMemoryPeak += probMP;
        if (probMP < tms.minMemoryPeak) tms.minMemoryPeak = probMP;
        if (probMP > tms.maxMemoryPeak) tms.maxMemoryPeak = probMP;

    });


    // ===== post loop calculations (averages and assignments) =====

    // 1. Averages

    // 1.1 general
    general.avgTimeAfterSubmission = general.avgTimeAfterSubmission / general.nProblemsSolved;
    general.avgExecTime = general.avgExecTime / general.nProblemsSolved;
    general.avgUserTime = general.avgUserTime / general.nProblemsSolved;
    general.avgSysTime = general.avgSysTime / general.nProblemsSolved;
    general.avgMemory = general.avgMemory / general.nProblemsSolved;
    general.avgMemoryPeak = general.avgMemoryPeak / general.nProblemsSolved;
    // 1.2 solver
    solversStatsArray.forEach(solver => {
        if (solver.nProblemsSolved > 0) {
            solver.avgTimeAfterSubmission = solver.avgTimeAfterSubmission / solver.nProblemsSolved;
            solver.avgExecTime = solver.avgExecTime / solver.nProblemsSolved;
            solver.avgUserTime = solver.avgUserTime / solver.nProblemsSolved;
            solver.avgSysTime = solver.avgSysTime / solver.nProblemsSolved;
            solver.avgMemory = solver.avgMemory / solver.nProblemsSolved;
            solver.avgMemoryPeak = solver.avgMemoryPeak / solver.nProblemsSolved;
        }
    });
    // 1.3 monthly
    monthlyStats.forEach(month => {
        if (month.nProblemsFinishedInThisMonth > 0) {
            month.avgTimeAfterSubmission = month.avgTimeAfterSubmission / month.nProblemsFinishedInThisMonth;
            month.avgExecTime = month.avgExecTime / month.nProblemsFinishedInThisMonth;
            month.avgUserTime = month.avgUserTime / month.nProblemsFinishedInThisMonth;
            month.avgSysTime = month.avgSysTime / month.nProblemsFinishedInThisMonth;
            month.avgMemory = month.avgMemory / month.nProblemsFinishedInThisMonth;
            month.avgMemoryPeak = month.avgMemoryPeak / month.nProblemsFinishedInThisMonth;
        }
    });

    // 2. Assignments
    
    general.solversStats = solversStatsArray;
    general.monthlyStats = monthlyStats;
    res.json(general);

}
