import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("profile")
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  name: string;
  
  @Column("varchar", { length: 250 })
  avatar: string;

  @Column("int")
  monthly_budget: number;

  @Column("int")
  days_per_weekend: number;

  @Column("int")
  hours_per_day: number;

  @Column("int")
  vacation_per_year: number;

  @Column("int")
  value_hour: number;
}