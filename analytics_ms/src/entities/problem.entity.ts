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

    @Column({ type: 'decimal', precision: 10, scale: 4 })
    execTime: number; // in seconds

    @Column({ type: 'decimal', precision: 10, scale: 4 })
    userTime: number; // in seconds

    @Column({ type: 'decimal', precision: 10, scale: 4 })
    sysTime: number; // in seconds

    @Column({ type: 'decimal', precision: 10, scale: 4 })
    memory: number; // in MB

    @Column({ type: 'decimal', precision: 10, scale: 4 })
    memoryPeak: number; // in MB

    // generated

    @Column({ type: 'decimal', precision: 10, scale: 4 })
    timeAfterSubmission: number; // in seconds

}