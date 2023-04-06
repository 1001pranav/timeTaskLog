import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm";

@Entity()
export class ContactUs {
    
    @PrimaryColumn()
    name: string

    @Column({nullable: true})
    id: number

    @Column({nullable: true})
    email: string

    @Column()
    subject: string

    @Column({nullable: true})
    feedbackDescription: string

    // @Column({nullable: true })
    // date: number
}