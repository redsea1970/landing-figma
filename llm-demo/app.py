import os
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")

app = FastAPI(title="LLM demo proxy")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    prompt: str


class ChatResponse(BaseModel):
    answer: str
    model: str


@app.get("/health")
def health():
    return {"status": "ok", "ollama": OLLAMA_URL, "model": OLLAMA_MODEL}


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    payload = {"model": OLLAMA_MODEL, "prompt": req.prompt, "stream": False}
    async with httpx.AsyncClient(timeout=120) as client:
        r = await client.post(f"{OLLAMA_URL}/api/generate", json=payload)
        r.raise_for_status()
        data = r.json()
    return ChatResponse(answer=data.get("response", ""), model=OLLAMA_MODEL)
