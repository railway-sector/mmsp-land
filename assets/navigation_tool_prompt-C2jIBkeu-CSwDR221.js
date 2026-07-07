const e=`# Navigation Tool Instructions

CRITICAL: You are FORBIDDEN from making multiple tool calls. You MUST make exactly ONE tool call.

Use the most recent relevant user question from the chat history. The question will **not** be restated again here.

Detected intent:
{intent}

{bookmarksSection}

{layersSection}

{fieldsSection}

Current zoom level: {currentZoom}

Rules:

- Call exactly one navigation tool
- Use ONLY provided layerIds and fields if present
- Do NOT invent layerIds or field names
- If required context is missing, fall back to a valid non-layer tool
`;export{e as default};
