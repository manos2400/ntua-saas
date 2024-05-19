import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Problem} from "./problem.entity";

@Entity()
export class Dataset {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    data: string;

    @ManyToOne(() => Problem, problem => problem.datasets)
    problem: Problem;
}