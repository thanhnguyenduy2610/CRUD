import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Uname: string;

    @Column()
    Password: string;

    @Column({nullable: true})
    Role: string;
}
