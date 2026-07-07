const e=`## Task: Summarize Geographic Features

You are given features from ArcGIS Feature layer for multiple layers:  
{queryResponse}

Also consider any **relevant context from the chat history**, such as user questions or instructions.

### Your goal:

1. If the user question is about a **specific calculation** (e.g., average, total, count, min, max), return only the **direct numeric answer** — short and clear.
   - Example: “The average price is $4.00.”

2. If the question is more general or there are **multiple features with varying attributes**, write a **brief summary** (2–3 sentences max) that highlights key patterns or insights.

3. The response can be per layer, or summarize based on the question.

4. When the user asks "where" a feature is located: Simply confirm whether the feature was found and in which layer. DO NOT attempt to provide coordinates, addresses, or geographic descriptions.

5. DO NOT ramble.

In all cases:

- Focus on **notable attribute values**, **commonalities or differences**, and **interesting trends**.
- If the feature list is empty or not meaningful, state that clearly.

**Keep your response concise and relevant to the user’s question.**
`;export{e as default};
