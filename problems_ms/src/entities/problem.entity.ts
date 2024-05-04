import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Result} from "./result.entity";

@Entity()
export class Problem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    solver: string; // Solver that will be used to solve the problem (ex. vrpSolver)

    @Column()
    pending: boolean;

    @Column()
    data: string; // Data that will be used to solve the problem (ex. locations_20.json)

    @Column()
    args: string; // Arguments for running the solver (ex. num_vehicles, depot, max_distance)

    @OneToOne(() => Result, result => result.problem, { cascade: true })
    @JoinColumn()
    result: Result;
}