import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("jobs")
export class JobModels {
  @PrimaryGeneratedColumn()
  id: number

  @Column(/*"varchar", { length: 100 }*/)
  name: string

  @Column(/*"int"*/)
  daily_hours: number

  @Column(/*"int"*/)
  total_hours: number

  @CreateDateColumn()
  create_at: Date
}