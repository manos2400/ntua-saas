import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Problem {
    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    solver: string; // Solver that will be used to solve the problem (ex. vrpSolver)

    @Column()
    timestampStart: string; // Timestamp when the problem was submitted

    @Column()
    timestampEnd: string; // Timestamp when the problem was solved

}