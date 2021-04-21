import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { JobRepository } from "@repositories/JobRepository";
import { ProfileRepository } from "@repositories/ProfileRepository";
import { JobUtils } from "@utils/JobUtils";

export class DashboardController {
  async index(req:Request, res:Response) {
    const profileRepository = getCustomRepository(ProfileRepository)
    const jobRepository = getCustomRepository(JobRepository)

    const jobUtils = new JobUtils

    const allJobs = await jobRepository.find();
    const profile = await profileRepository.findOne(1);

    if (!profile) {
      res.redirect('/profile')
    }

    let statusCount = {
      progress: 0,
      done: 0,
      total: allJobs.length
    }

    let jobTotalHours = 0;
    
    const updatedJobs = allJobs.map((jobs) => {
      const remaining = jobUtils.remainingDays(jobs);
      const status = remaining <= 0 ? 'done' : 'progress';

      statusCount[status] += 1;

      // jobTotalHours = status === 'progress' ?? jobTotalHours + job['daily-hours']
      jobTotalHours = status === 'progress' ? jobTotalHours + Number(jobs['daily_hours']) : jobTotalHours

      return {
        ...jobs,
        remaining,
        status,
        budget: jobUtils.calculateBudget(Number(jobs["total_hours"]), Number(profile["value_hour"]))
      }
    })

    const freeHours = profile['hours_per_day'] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount, freeHours });
  }
}