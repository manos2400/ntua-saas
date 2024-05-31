import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";

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
        minTimeAfterSubmission: Number.MAX_SAFE_INTEGER,
        maxTimeAfterSubmission: Number.MIN_SAFE_INTEGER,

        // exec time
        avgExecTime: 0,
        minExecTime: Number.MAX_SAFE_INTEGER,
        maxExecTime: Number.MIN_SAFE_INTEGER,

        // user time
        avgUserTime: 0,
        minUserTime: Number.MAX_SAFE_INTEGER,
        maxUserTime: Number.MIN_SAFE_INTEGER,

        // sys time
        avgSysTime: 0,
        minSysTime: Number.MAX_SAFE_INTEGER,
        maxSysTime: Number.MIN_SAFE_INTEGER,

        // memory
        avgMemory: 0, // in MB
        minMemory: Number.MAX_SAFE_INTEGER,
        maxMemory: Number.MIN_SAFE_INTEGER,
        
        // memory peak
        avgMemoryPeak: 0, // in MB
        minMemoryPeak: Number.MAX_SAFE_INTEGER,
        maxMemoryPeak: Number.MIN_SAFE_INTEGER,

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
        minTimeAfterSubmission: Number.MAX_SAFE_INTEGER,
        maxTimeAfterSubmission: Number.MIN_SAFE_INTEGER,

        // exec time
        avgExecTime: 0,
        minExecTime: Number.MAX_SAFE_INTEGER,
        maxExecTime: Number.MIN_SAFE_INTEGER,

        // user time
        avgUserTime: 0,
        minUserTime: Number.MAX_SAFE_INTEGER,
        maxUserTime: Number.MIN_SAFE_INTEGER,

        // sys time
        avgSysTime: 0,
        minSysTime: Number.MAX_SAFE_INTEGER,
        maxSysTime: Number.MIN_SAFE_INTEGER,

        // memory
        avgMemory: 0, // in MB
        minMemory: Number.MAX_SAFE_INTEGER,
        maxMemory: Number.MIN_SAFE_INTEGER,
        
        // memory peak
        avgMemoryPeak: 0, // in MB
        minMemoryPeak: Number.MAX_SAFE_INTEGER,
        maxMemoryPeak: Number.MIN_SAFE_INTEGER
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
        minTimeAfterSubmission: Number.MAX_SAFE_INTEGER,
        maxTimeAfterSubmission: Number.MIN_SAFE_INTEGER,

        // exec time
        avgExecTime: 0,
        minExecTime: Number.MAX_SAFE_INTEGER,
        maxExecTime: Number.MIN_SAFE_INTEGER,

        // user time
        avgUserTime: 0,
        minUserTime: Number.MAX_SAFE_INTEGER,
        maxUserTime: Number.MIN_SAFE_INTEGER,

        // sys time
        avgSysTime: 0,
        minSysTime: Number.MAX_SAFE_INTEGER,
        maxSysTime: Number.MIN_SAFE_INTEGER,

        // memory
        avgMemory: 0, // in MB
        minMemory: Number.MAX_SAFE_INTEGER,
        maxMemory: Number.MIN_SAFE_INTEGER,
        
        // memory peak
        avgMemoryPeak: 0, // in MB
        minMemoryPeak: Number.MAX_SAFE_INTEGER,
        maxMemoryPeak: Number.MIN_SAFE_INTEGER
            });
            monthlyStatsIndex = monthlyStats.length - 1;
        }
        const tms = monthlyStats[monthlyStatsIndex];
        tms.nProblemsFinishedInThisMonth++;


        // ======== update stats =========

        // 1. time after submission

        // 1.1 general
        general.avgTimeAfterSubmission += problem.timeAfterSubmission;
        if (problem.timeAfterSubmission < general.minTimeAfterSubmission) general.minTimeAfterSubmission = problem.timeAfterSubmission;
        if (problem.timeAfterSubmission > general.maxTimeAfterSubmission) general.maxTimeAfterSubmission = problem.timeAfterSubmission;
        // 1.2 solver
        tss.avgTimeAfterSubmission += problem.timeAfterSubmission;
        if (problem.timeAfterSubmission < tss.minTimeAfterSubmission) tss.minTimeAfterSubmission = problem.timeAfterSubmission;
        if (problem.timeAfterSubmission > tss.maxTimeAfterSubmission) tss.maxTimeAfterSubmission = problem.timeAfterSubmission;
        // 1.3 monthly
        tms.avgTimeAfterSubmission += problem.timeAfterSubmission;
        if (problem.timeAfterSubmission < tms.minTimeAfterSubmission) tms.minTimeAfterSubmission = problem.timeAfterSubmission;
        if (problem.timeAfterSubmission > tms.maxTimeAfterSubmission) tms.maxTimeAfterSubmission = problem.timeAfterSubmission;

        // 2. exec time

        // 2.1 general
        general.avgExecTime += problem.execTime;
        if (problem.execTime < general.minExecTime) general.minExecTime = problem.execTime;
        if (problem.execTime > general.maxExecTime) general.maxExecTime = problem.execTime;
        // 2.2 solver
        tss.avgExecTime += problem.execTime;
        if (problem.execTime < tss.minExecTime) tss.minExecTime = problem.execTime;
        if (problem.execTime > tss.maxExecTime) tss.maxExecTime = problem.execTime;
        // 2.3 monthly
        tms.avgExecTime += problem.execTime;
        if (problem.execTime < tms.minExecTime) tms.minExecTime = problem.execTime;
        if (problem.execTime > tms.maxExecTime) tms.maxExecTime = problem.execTime;

        // 3. user time

        // 3.1 general
        general.avgUserTime += problem.userTime;
        if (problem.userTime < general.minUserTime) general.minUserTime = problem.userTime;
        if (problem.userTime > general.maxUserTime) general.maxUserTime = problem.userTime;
        // 3.2 solver
        tss.avgUserTime += problem.userTime;
        if (problem.userTime < tss.minUserTime) tss.minUserTime = problem.userTime;
        if (problem.userTime > tss.maxUserTime) tss.maxUserTime = problem.userTime;
        // 3.3 monthly
        tms.avgUserTime += problem.userTime;
        if (problem.userTime < tms.minUserTime) tms.minUserTime = problem.userTime;
        if (problem.userTime > tms.maxUserTime) tms.maxUserTime = problem.userTime;

        // 4. sys time

        // 4.1 general
        general.avgSysTime += problem.sysTime;
        if (problem.sysTime < general.minSysTime) general.minSysTime = problem.sysTime;
        if (problem.sysTime > general.maxSysTime) general.maxSysTime = problem.sysTime;
        // 4.2 solver
        tss.avgSysTime += problem.sysTime;
        if (problem.sysTime < tss.minSysTime) tss.minSysTime = problem.sysTime;
        if (problem.sysTime > tss.maxSysTime) tss.maxSysTime = problem.sysTime;
        // 4.3 monthly
        tms.avgSysTime += problem.sysTime;
        if (problem.sysTime < tms.minSysTime) tms.minSysTime = problem.sysTime;
        if (problem.sysTime > tms.maxSysTime) tms.maxSysTime = problem.sysTime;

        // 5. memory

        // 5.1 general
        general.avgMemory += problem.memory;
        if (problem.memory < general.minMemory) general.minMemory = problem.memory;
        if (problem.memory > general.maxMemory) general.maxMemory = problem.memory;
        // 5.2 solver
        tss.avgMemory += problem.memory;
        if (problem.memory < tss.minMemory) tss.minMemory = problem.memory;
        if (problem.memory > tss.maxMemory) tss.maxMemory = problem.memory;
        // 5.3 monthly
        tms.avgMemory += problem.memory;
        if (problem.memory < tms.minMemory) tms.minMemory = problem.memory;
        if (problem.memory > tms.maxMemory) tms.maxMemory = problem.memory;

        // 6. memory peak

        // 6.1 general
        general.avgMemoryPeak += problem.memoryPeak;
        if (problem.memoryPeak < general.minMemoryPeak) general.minMemoryPeak = problem.memoryPeak;
        if (problem.memoryPeak > general.maxMemoryPeak) general.maxMemoryPeak = problem.memoryPeak;
        // 6.2 solver
        tss.avgMemoryPeak += problem.memoryPeak;
        if (problem.memoryPeak < tss.minMemoryPeak) tss.minMemoryPeak = problem.memoryPeak;
        if (problem.memoryPeak > tss.maxMemoryPeak) tss.maxMemoryPeak = problem.memoryPeak;
        // 6.3 monthly
        tms.avgMemoryPeak += problem.memoryPeak;
        if (problem.memoryPeak < tms.minMemoryPeak) tms.minMemoryPeak = problem.memoryPeak;
        if (problem.memoryPeak > tms.maxMemoryPeak) tms.maxMemoryPeak = problem.memoryPeak;

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
