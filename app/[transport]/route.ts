import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
    (server) => {
    server.tool(
        "aiContentWritingAndPost",
        "Post to LinkedIn or Twitter",
        {
            // Input
            experienceLevel: z.enum(["beginner", "intermediate"])
        },
        ({experienceLevel}) => ({
            content: [
                {
                    type: "text",
                    text: `I Recommend you to take the ${experienceLevel === "beginner" ? "Professional Javascript" : "Professional React & Next.js" } course`
                }
            ]
            
        })
    )
}, {
    capabilities: {
        tools: {
            aiContentAndPost: {
                description: "Post to LinkedIn or Twitter"
            }
        }
    }
}, {
    redisUrl: process.env.REDIS.URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mccp",
    verboseLogs: true,
    maxDuration: 60
});

export {handler as GET, handler as POST, handler as DELETE}