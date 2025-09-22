import { connectToDB } from "../db/index.js";
import { SuccessResponse, FailureResponse } from "../Utilities/index.js";
import {
  INSERT_PATH,
  INSERT_SKILL,
  INSERT_STEP,
} from "../Models/roadmap-model-db.js";
import openai from "openai";
import axios from "axios";

const pool = connectToDB();

export const generateRoadmap = async (PathName) => {
  try {
    const prompt = `Generate a roadmap for becoming a ${PathName}. Return the response in valid JSON format with the following structure:
        {
            "steps": [
                {
                    "name": "Step Name",
                    "skills": [
                        { "name": "Skill Name" }
                    ]
                }
            ]
        }`;

    const completion = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
        },
      }
    );

    const roadmapText = completion.data.choices[0].message.content;

    try {
      JSON.parse(roadmapText);
      return roadmapText;
    } catch (jsonError) {
      console.error("Invalid JSON received from OpenAI:", roadmapText);
      throw new Error("Invalid JSON format received from OpenAI");
    }
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error(`Error generating roadmap: ${error.message}`);
  }
};
export const createPath = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user?.userId;

    if (!name) {
      return FailureResponse(res, "Please provide path", null, 404);
    }
    if (!userId) {
      return FailureResponse(res, "User not authenticated", null, 404);
    }

    // Convert callback-based query to Promise
    const insertPath = () => {
      return new Promise((resolve, reject) => {
        pool.query(INSERT_PATH, [name, userId], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    const insertStep = (stepName, pathId) => {
      return new Promise((resolve, reject) => {
        pool.query(INSERT_STEP, [stepName, pathId], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    const insertSkill = (skillName, stepId) => {
      return new Promise((resolve, reject) => {
        pool.query(INSERT_SKILL, [skillName, stepId], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    const pathResult = await insertPath();
    const pathId = pathResult.insertId;

    // Generate and parse the roadmap
    const roadmapText = await generateRoadmap(name);
    const roadmap = JSON.parse(roadmapText);

    // Insert steps and skills sequentially
    for (const step of roadmap.steps) {
      const stepResult = await insertStep(step.name, pathId);
      const stepId = stepResult.insertId;

      await Promise.all(
        step.skills.map((skill) => insertSkill(skill.name, stepId))
      );
    }

    return SuccessResponse(
      res,
      { id: pathId, roadmap: roadmap },
      "Path is created and roadmap generated",
      200
    );
  } catch (error) {
    console.error("Error in createPath:", error);
    return FailureResponse(res, "Internal Server Error", error.message, 500);
  }
};
export const getPathDetails = async (req, res) => {
  try {
    const pathId = req.params.id;
    const userId = req.user?.userId;

    if (!userId) {
      return FailureResponse(res, "User not authenticated", null, 401);
    }

    if (!pathId) {
      return FailureResponse(res, "Path not found", null, 404);
    }

    const pathQuery = "SELECT * FROM path WHERE id = ?";
    const stepsQuery = "SELECT * FROM steps WHERE path_id = ?";
    const skillsQuery = "SELECT * FROM skills WHERE step_id = ?";

    const pathResult = await new Promise((resolve, reject) => {
      pool.query(pathQuery, [pathId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (!pathResult || pathResult.length === 0) {
      return FailureResponse(res, "Path not found", null, 404);
    }

    const stepsResult = await new Promise((resolve, reject) => {
      pool.query(stepsQuery, [pathId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const steps = await Promise.all(
      stepsResult.map(async (step) => {
        const skillsResults = await new Promise((resolve, reject) => {
          pool.query(skillsQuery, [step.id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
        return {
          ...step,
          skills: skillsResults,
        };
      })
    );

    const roadmap = {
      id: pathResult[0].id,
      name: pathResult[0].name,
      steps: steps.map((step) => ({
        name: step.name,
        skills: step.skills.map((skill) => ({
          name: skill.name,
        })),
      })),
    };

    return SuccessResponse(
      res,
      { id: roadmap.id, roadmap },
      "Roadmap fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error in getPathDetails:", error);
    return FailureResponse(res, "Internal Server Error", error.message, 500);
  }
};
export const getUserPaths = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const fetch_user_paths = "SELECT path FROM path WHERE user_id = ? ORDER BY id DESC LIMIT 3";
    
    pool.query(fetch_user_paths, [userId], (err, result) => {
      if (err) {
        console.log(err);
        
        return FailureResponse(res, 'Internal Server Error', null, 500);
      }
      return SuccessResponse(res, 'Success', result, 200);
    });
  } catch (error) {
    console.log(error);
    return FailureResponse(res, "Internal Server Error", null, 500);
  }
};
export const totalRoadmapGenerates = async (req,res) =>{
  try{
    const sqlQuery = `
      SELECT path, COUNT(*) as count, 
      ROUND((COUNT(*) / (SELECT COUNT(*) FROM path) * 100), 2) as percentage
      FROM path
      GROUP BY path
      ORDER BY count DESC
    `;

    pool.query(sqlQuery, (err, pathResults )=>{
      if(err){
        console.log(err);
        return FailureResponse(res, 'Internal Server Error', null, 500)
      }
      if(pathResults.length === 0){
        return FailureResponse(res, 'Path not found', null, 400)
      }
      const data = pathResults.map((row)=>({
        pathName: row.path,
        percentage: row.percentage
      }))
      return SuccessResponse(res, 'Success', {data}, 200)
    })
  }
  catch(error){
    console.log(error);
    return FailureResponse(res, 'Internal Server Error',null, 500)
    
  }
}
