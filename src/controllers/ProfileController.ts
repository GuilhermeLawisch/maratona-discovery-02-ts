import { ProfileRepository } from "@repositories/ProfileRepository";
import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { ProfileModels } from "@models/ProfileModels";

export class ProfileController {
  // GET
  async index(req:Request, res:Response) {
    const profileRepository = getCustomRepository(ProfileRepository)

    const profile = await profileRepository.findOne(1)
    
    if (profile) {
      return res.status(200).render("profile", { profile })
    } else {
      const profileNull = {
        name: '',
        avatar: '',
        value_hour: '',
        monthly_budget: '',
        hours_per_day: '',
        days_per_week: '',
        vacation_per_year: ''
      }

      return res.status(200).render("profile", { profile: profileNull })
    }
    
  }

  // POST 
  async update(req:Request, res:Response) {
    const data = req.body

    // definir quantas semanas tem em um ano
    const weeksPerYear = 52
    // remover as semanas de férias do ano
    const weeksPerMonth = (weeksPerYear - data["vacation_per_year"])/12
    // total de horas por semana
    const weekTotalHours = data["hours_per_day"] * data["days_per_week"]
    // horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth
    // valor da hora
    const valueHour = data["monthly_budget"] / monthlyTotalHours

    const profileRepository = getCustomRepository(ProfileRepository)

    const profile = await profileRepository.findOne(1)

    if (!profile) {
      const newProfile = profileRepository.create({
        name: data.name, 
        avatar: data.avatar,
        monthly_budget: Number(data.monthly_budget),
        hours_per_day: Number(data.hours_per_day),
        days_per_week: Number(data.days_per_week),
        vacation_per_year: Number(data.vacation_per_year),
        value_hour: valueHour
      });

      await profileRepository.save(newProfile);

      return res.status(201).redirect('/profile')
    } else {
      await getConnection()
        .createQueryBuilder()
        .update(ProfileModels)
        .set({ 
          ...profile,
          ...data,
          "value_hour": valueHour
        })
        .where("id = :id", { id: 1 })
        .execute();

      return res.status(200).redirect('/profile')
    }
    
  }
}
