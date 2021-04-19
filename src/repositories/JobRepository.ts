import { EntityRepository, Repository } from "typeorm";
import { JobModels } from "@models/JobModels";

@EntityRepository(JobModels)
class JobRepository extends Repository<JobModels> {}

export { JobRepository };

