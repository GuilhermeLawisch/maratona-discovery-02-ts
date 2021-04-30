import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("profile")
export class ProfileModels {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  
  @Column()
  avatar: string

  @Column()
  monthly_budget: number

  @Column()
  days_per_week: number

  @Column()
  hours_per_day: number

  @Column()
  vacation_per_year: number

  @Column()
  value_hour: number
}