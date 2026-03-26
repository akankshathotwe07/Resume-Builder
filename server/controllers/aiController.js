
import Resume from "../models/Resume.js";
import ai from '../config/ai.js'

//Controller for enhancing the resumes professional summary
//post : /api/ai/enhance-pro-sum


export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        // Validation
        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // OpenAI response
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are a professional resume writer. Improve the given resume summary and return ONLY one concise professional summary in 3-4 lines. Do not give multiple options, explanations, or bullet points. Output should be clean and direct.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
            temperature: 0.7,
        });

        const enhancedContent = response.choices[0].message.content;
        res.status(200).json({ enhancedContent });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Enhancing job description 
//Post : /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        // Validation
        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // OpenAI response
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in writing ATS-friendly job descriptions. Rewrite the given content into ONLY 2-3 concise lines. Keep it professional, keyword-rich, and clear. Do not include headings, bullet points, or explanations. Return only the final answer.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
            temperature: 0.7,
        });

        const enhancedContent = response.choices[0].message.content;
        res.status(200).json({ enhancedContent });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//controller for uploading a resume to the database
//post: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {

        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing required fields" });
        }


        // OpenAI response

        const systemPrompt = "You are an expert AI Agent to extract data from resume.";

        const userPrompt = `extract data from this resume: ${resumeText}

        Provide data in the following JSON format with no additional text before or after
        :
        {
        professional_summary: { type: String, default: "" },

    skills: [{ type: String }],

    personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        website: { type: String, default: "" },
    },
    experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: Boolean },
        },
    ],

    project: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        },
    ],
        education: [
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            gpa: { type: String },
        
        },
    ],
        }

        `

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: { type: 'json_object' }
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({ userId, title, ...parsedData })

        res.status(200).json({ resumeId: newResume._id });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};