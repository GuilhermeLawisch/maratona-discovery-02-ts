import { Router } from 'express';
import { JobController } from '@controllers/JobController';
import { ProfileController } from '@controllers/ProfileController';
import { DashboardController } from "@controllers/DashboardController";

const router = Router();

const jobController = new JobController();
const profileController = new ProfileController();
const dashboardController = new DashboardController();

router.get('/', dashboardController.index)
router.get('/job', jobController.create)
router.get('/job/:id', jobController.show)
router.get('/profile', profileController.index)

router.post('/job', jobController.save)
router.post('/job/:id', jobController.update)
router.post('/job/delete/:id', jobController.delete)
router.post('/profile', profileController.update)

export { router };