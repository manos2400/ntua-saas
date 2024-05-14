import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Problem} from "./problem.entity";

@Entity()
export class Metadata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    value: string;

    @Column()
    description: string;

    @ManyToOne(() => Problem, problem => problem.metadata)
    problem: Problem;
}