import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    solver: string; // Solver that will be used to solve the problem (ex. vrpSolver)

    @Column()
    timestampStart: string; // Timestamp when the problem was submitted

    @Column()
    timestampEnd: string; // Timestamp when the problem was solved

    @Column()
    output: string; // Output of the solver (from generate result ms) - it should contain statistics

}