import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Problem {

    // original

    @PrimaryColumn()
    id: string;

    @Column()
    solver: string; // Solver that will be used to solve the problem (ex. vrpSolver)

    @Column()
    submittedAt: string; // Timestamp when the problem was submitted

    @Column()
    solvedAt: string; // Timestamp when the problem was solved

    @Column()
    execTime: number; // in seconds

    @Column()
    userTime: number; // in seconds

    @Column()
    sysTime: number; // in seconds

    @Column()
    memory: number; // in MB

    @Column()
    memoryPeak: number; // in MB

    // generated

    @Column()
    timeAfterSubmission: number; // in seconds

}