import { httpMethod } from "..";
import fs from "fs/promises";
import { Request, Response } from "express";
import path from "path";

// export const getQuestions = httpMethod(async (req: Request, res: Response) => {
//   try {
//     const { testName } = req.params;
//     const filePath = path.join(__dirname, "../../../../questions.json");
//     const questionsData = await fs.readFile(filePath, "utf-8");
//     const questionsList = JSON.parse(questionsData);
//     const found = questionsList.find((obj: any) => obj.testName === testName);

//     res.status(200).json({ test: found.result });
//   } catch (err) {
//     res.status(500).json({ message: "Error reading questions list" });
//   }
// });
function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getQuestions = httpMethod(async (req: Request, res: Response) => {
  try {
    const { testName } = req.params;
    const filePath = path.join(__dirname, "../../../../questions.json");
    const questionsData = await fs.readFile(filePath, "utf-8");
    const questionsList = JSON.parse(questionsData);
    const found = questionsList.find((obj: any) => obj.testName === testName);

    if (found) {
      found.result.questions = shuffleArray(found.result.questions);
      res.status(200).json({ test: found.result });
    } else {
      res.status(404).json({ message: "Test not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error reading questions list" });
  }
});
