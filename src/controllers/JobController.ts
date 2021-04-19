import { JobRepository } from "@repositories/JobRepository";
import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

class JobController {
  // GET
  async show(req, res) {
    
  }
  async create(req:Request, res:Response) {
    return res.render("job")
  }
  
  // POST
  save(req, res) {

  }
  update(req, res) {

  }
  delete(req, res) {

  }
  
}

export { JobController }
