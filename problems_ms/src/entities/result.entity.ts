import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Problem} from "./problem.entity";

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    output: string;

    @OneToOne(() => Problem, problem => problem.result)
    problem: Problem;
}