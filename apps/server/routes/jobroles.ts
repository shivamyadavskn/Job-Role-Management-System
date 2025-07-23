import { Router, Request, Response } from "express";
import JobRole from "../models/JobRole";
import { SortOrder } from "mongoose";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { search, department, sort, page = "1", limit = "10" } = req.query;

    const filter: any = {};
    if (search) {
      filter.jobTitle = { $regex: search, $options: "i" };
    }
    if (department) {
      filter.department = department;
    }

    let sortOption: Record<string, SortOrder> = { createdAt: "desc" };
    if (sort === "oldest") sortOption = { createdAt: "asc" };

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      JobRole.find(filter).sort(sortOption).skip(skip).limit(limitNum),
      JobRole.countDocuments(filter),
    ]);

    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job roles" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { jobTitle, department, level, description } = req.body;
    const jobRole = new JobRole({ jobTitle, department, level, description });
    await jobRole.save();
    res.status(201).json(jobRole);
  } catch (err) {
    res.status(400).json({ error: "Failed to create job role" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { jobTitle, department, level, description } = req.body;
    const jobRole = await JobRole.findByIdAndUpdate(
      id,
      { jobTitle, department, level, description },
      { new: true }
    );
    if (!jobRole) return res.status(404).json({ error: "Job role not found" });
    res.json(jobRole);
  } catch (err) {
    res.status(400).json({ error: "Failed to update job role" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobRole = await JobRole.findByIdAndDelete(id);
    if (!jobRole) return res.status(404).json({ error: "Job role not found" });
    res.json({ message: "Job role deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete job role" });
  }
});

export default router;
