import { getCustomRepository, getConnection } from "typeorm";
import { Request, Response } from "express";
import { JobRepository } from "@repositories/JobRepository";
import { ProfileRepository } from "@repositories/ProfileRepository";
import { JobUtils } from "@utils/JobUtils";
import { JobModels } from "@models/JobModels";

class JobController {
  // GET
  async show(req:Request, res:Response) {  
    const jobId = req.params.id

    const jobRepository = getCustomRepository(JobRepository)
    const profileRepository = getCustomRepository(ProfileRepository)

    const jobUtils = new JobUtils

    const allJobs = await jobRepository.find()
    const profile = await profileRepository.findOne(1)

    const job = allJobs.find((job) => {
      if (Number(job.id) === Number(jobId)) {
        return job
      }
    })
    if (!job) {
      return res.send('Job not found!')
    }

    let jobBudget = jobUtils.calculateBudget(Number(job["total_hours"]), Number(profile["value_hour"]))

    return res.render("job-edit", { job, jobBudget })
  }
  async create(req:Request, res:Response) {
    return res.render("job")
  }
  
  // POST
  async save(req:Request, res:Response) {
    const { name, daily_hours, total_hours } = req.body

    const jobRepository = getCustomRepository(JobRepository)

    const job = jobRepository.create({
      name, 
      daily_hours, 
      total_hours
    });

    await jobRepository.save(job);

    return res.redirect('/')
  }
  async update(req:Request, res:Response) {
    const jobId = req.params.id

    await getConnection()
      .createQueryBuilder()
      .update(JobModels)
      .set({ 
        name: req.body.name,
        total_hours: req.body["total_hours"], 
        daily_hours: req.body["daily_hours"]
      })
      .where("id = :id", { id: jobId })
      .execute();

    res.redirect('/')
  }
  async delete(req:Request, res:Response) {
    const jobId = req.params.id

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(JobModels)
      .where("id = :id", { id: jobId })
      .execute();

    return res.redirect('/')
  }
}

export { JobController }
