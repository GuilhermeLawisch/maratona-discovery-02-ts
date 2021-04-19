import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 100 })
  name: string

  @Column("int")
  daily_hours: number

  @Column("int")
  total_hours: number

  @CreateDateColumn()
  create_at: Date
/*
  @Column()
  remaining: number

  @Column()
  status: number

  @Column()
  budget: number
*/
}