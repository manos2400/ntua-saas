import { Request, Response } from "express";
import { Problem } from "../entities/problem.entity";
import { database } from "../utils/database";
import { timeDiff, timeFormat } from "../utils/analysis";

export const getGeneral = async (req: Request, res: Response) => {
    
    // get general statistics for all problems
    const problems = await database.getRepository(Problem).find();

    if (!problems) {
        res.status(404).json({ message: 'No problems found!' });
        return;
    }

    const general = {
        nProblemsTotal: problems.length,
        nProblemsFinished: 0,
        avgTimeAfterSubmission: 0,
        avgTimeAfterSubmissionHR: "0",
        minTimeAfterSubmission: Number.MAX_SAFE_INTEGER,
        minTimeAfterSubmissionHR: "",
        maxTimeAfterSubmission: Number.MIN_SAFE_INTEGER,
        maxTimeAfterSubmissionHR: "",
        solversStats: [{}],
        monthlyStats: [{}]
    };
    let solversStatsArray : any[] = [];
    let monthlyStats : any[] = [];
    
    problems.forEach(problem => {

        // get solver name
        const solverName = problem.solver;
        let solverStats = solversStatsArray.find(solver => solver.name === solverName);
        if (!solverStats) {
            solversStatsArray.push({
                name: solverName,
                nProblemsSubmitted: 0,
                nProblemsSolved: 0,
                avgTimeAfterSubmission: 0,
                avgTimeAfterSubmissionHR: "0",
                minTimeAfterSubmission: Number.MAX_SAFE_INTEGER,
                minTimeAfterSubmissionHR: "",
                maxTimeAfterSubmission: Number.MIN_SAFE_INTEGER,
                maxTimeAfterSubmissionHR: ""
            });
        }
        const solverStatsIndex = solversStatsArray.findIndex(solver => solver.name === solverName);
        solverStats = solversStatsArray[solverStatsIndex];
        solverStats.nProblemsSubmitted++;

        const timeAfterSubmit = timeDiff(problem.timestampStart, problem.timestampEnd);
        if(timeAfterSubmit === -1) return; // problem not finished yet

        // get current maonth in format: yyyy-mm
        const currentMonth = problem.timestampEnd.slice(0, 7);
        let monthlyStatsIndex = monthlyStats.findIndex(month => month.month === currentMonth);
        if (monthlyStatsIndex === -1) {
            monthlyStats.push({
                month: currentMonth,
                nProblemsFinishedInThisMonth: 0,
                avgTimeAfterSubmission: 0,
                avgTimeAfterSubmissionHR: "0",
                minTimeAfterSubmission: Number.MAX_SAFE_INTEGER,
                minTimeAfterSubmissionHR: "",
                maxTimeAfterSubmission: Number.MIN_SAFE_INTEGER,
                maxTimeAfterSubmissionHR: ""
            });
            monthlyStatsIndex = monthlyStats.length - 1;
        }

        const monthlyStatsElement = monthlyStats[monthlyStatsIndex];
        monthlyStatsElement.nProblemsFinishedInThisMonth++;
        monthlyStatsElement.avgTimeAfterSubmission += timeAfterSubmit;
        if (timeAfterSubmit < monthlyStatsElement.minTimeAfterSubmission) {
            monthlyStatsElement.minTimeAfterSubmission = timeAfterSubmit;
        }
        if (timeAfterSubmit > monthlyStatsElement.maxTimeAfterSubmission) {
            monthlyStatsElement.maxTimeAfterSubmission = timeAfterSubmit;
        }

        general.nProblemsFinished++;
        solverStats.nProblemsSolved++;
        general.avgTimeAfterSubmission += timeAfterSubmit;
        solverStats.avgTimeAfterSubmission += timeAfterSubmit;
        if (timeAfterSubmit < general.minTimeAfterSubmission) {
            general.minTimeAfterSubmission = timeAfterSubmit;
        }
        if (timeAfterSubmit > general.maxTimeAfterSubmission) {
            general.maxTimeAfterSubmission = timeAfterSubmit;
        }
        if (timeAfterSubmit < solverStats.minTimeAfterSubmission) {
            solverStats.minTimeAfterSubmission = timeAfterSubmit;
        }
        if (timeAfterSubmit > solverStats.maxTimeAfterSubmission) {
            solverStats.maxTimeAfterSubmission = timeAfterSubmit;
        }
    });
    
    
    solversStatsArray.forEach(solver => {
        if (solver.nProblemsSolved > 0) {
            solver.avgTimeAfterSubmission /= solver.nProblemsSolved;
            solver.avgTimeAfterSubmissionHR = timeFormat(solver.avgTimeAfterSubmission);
            solver.minTimeAfterSubmissionHR = timeFormat(solver.minTimeAfterSubmission);
            solver.maxTimeAfterSubmissionHR = timeFormat(solver.maxTimeAfterSubmission);
        }
    });
    monthlyStats.forEach(month => {
        if (month.nProblemsFinishedInThisMonth > 0) {
            month.avgTimeAfterSubmission /= month.nProblemsFinishedInThisMonth;
            month.avgTimeAfterSubmissionHR = timeFormat(month.avgTimeAfterSubmission);
            month.minTimeAfterSubmissionHR = timeFormat(month.minTimeAfterSubmission);
            month.maxTimeAfterSubmissionHR = timeFormat(month.maxTimeAfterSubmission);
        }
    });

    general.avgTimeAfterSubmission /= general.nProblemsFinished;
    general.avgTimeAfterSubmissionHR = timeFormat(general.avgTimeAfterSubmission);
    general.minTimeAfterSubmissionHR = timeFormat(general.minTimeAfterSubmission);
    general.maxTimeAfterSubmissionHR = timeFormat(general.maxTimeAfterSubmission);
    
    general.solversStats = solversStatsArray;
    general.monthlyStats = monthlyStats;
    res.json(general);

}
