import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Result {
    @PrimaryColumn()
    problem_id: number;

    @Column()
    output: string;

}