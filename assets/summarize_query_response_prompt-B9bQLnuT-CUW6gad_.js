const e=`## Task: Summarize Geographic Features

You are given features from ArcGIS Feature layer for multiple layers:  
{queryResponse}

Also consider any **relevant context from the chat history**, such as user questions or instructions.

### Your goal:

1. If the user question is about a **specific calculation** (e.g., average, total, count, min, max), return only the **direct numeric answer** — short and clear.
   - Example: “The average price is $4.00.”

2. If the question is more general or there are **multiple features with varying attributes**, write a **brief summary** (2–3 sentences max) that highlights key patterns or insights.

3. The response can be per layer, or summarize based on the question.

4. DO NOT ramble.

5. If a \`geometryFilter\` is used, do NOT assume the feature referenced in that geometry (e.g., "ApplicationNumber = 'XYZ'") must appear in the results. It may only be used as a spatial anchor.

Only describe what _was_ found — not what was _used to search_.

6. If no feature \`attributes\` are returned but \`totalCount\` is present, assume the spatial filter was applied correctly. There is no need to say the subset was not returned — just summarize based on the count and available context.

7. Do not give suggestions like exporting the results as the tools are not capable to do that.

8. Use bullet points for lists and use new lines (\\n) and appropriate formatting in your response.

9. Do NOT say things like "I can't change the map", "I can't highlight features", or suggest WHERE clauses for the user to run manually. A separate system handles map visualization automatically after this step. Your job is ONLY to summarize the data returned by the query.

In all cases:

- Focus on **notable attribute values**, **commonalities or differences**, and **interesting trends**.
- If the feature list is empty or not meaningful, state that clearly.

### STRICT OUTPUT RULES

- Do NOT ask follow-up questions.
- Do NOT offer additional actions or suggestions.
- Do NOT explain what you can do next.
- Do NOT add conversational phrases.
- Do NOT add any text beyond the requested summary or numeric answer.
- End the response immediately after the summary.
- Do NOT include introductory phrases (e.g., "Found", "Here are", "The results show").
- Do NOT restate the user’s question.
`;export{e as default};
