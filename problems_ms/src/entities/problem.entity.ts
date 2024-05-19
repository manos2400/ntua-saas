import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Dataset} from "./dataset.entity";
import {Metadata} from "./metadata.entity";

export enum Status {
    PENDING = 0, // Problem is pending to be solved
    SOLVED = 1 // Problem has been solved
}

@Entity()
export class Problem {
    @PrimaryColumn()
    id: string;

    @Column()
    solver: string; // Solver that will be used to solve the problem (ex. vrpSolver)

    @Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING
    })
    status: Status;

    @OneToMany(() => Dataset, dataset => dataset.problem, { cascade: true })
    datasets: Dataset[]; // Datasets to be used to solve the problem

    @OneToMany(() => Metadata, metadata => metadata.problem, { cascade: true })
    metadata: Metadata[]; // Arguments for running the solver (ex. num_vehicles, depot, max_distance)

}