import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("jobs")
export class JobModels {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  daily_hours: number

  @Column()
  total_hours: number

  @CreateDateColumn()
  create_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}