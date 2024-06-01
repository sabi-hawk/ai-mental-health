import { Request, Response } from "express";
import { httpMethod } from "..";
import fs from "fs/promises";
import path from "path";

export const getDiseaseList = httpMethod(async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "../../../../disease.json");
    const diseaseData = await fs.readFile(filePath, "utf-8");
    const diseaseList = JSON.parse(diseaseData);

    res.status(200).json({ diseaseList });
  } catch (err) {
    res.status(500).json({ message: "Error reading disease list" });
  }
});
