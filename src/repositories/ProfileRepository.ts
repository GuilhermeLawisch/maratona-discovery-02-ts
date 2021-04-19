import { EntityRepository, Repository } from "typeorm";
import { ProfileModels } from "@models/ProfileModels";

@EntityRepository(ProfileModels)
class ProfileRepository extends Repository<ProfileModels> {}

export { ProfileRepository };