const e=`# ArcgisKnowledge Tool Instructions

CRITICAL: You are FORBIDDEN from making multiple tool calls. You MUST make exactly ONE tool call.

Use the most recent relevant user question from the chat history. The question will **not** be restated again here.

Detected intent:
{intent}

Rules:

- Call exactly one arcgisKnowledge tool
`;export{e as default};
