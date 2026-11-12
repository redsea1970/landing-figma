# LLM demo (Ollama proxy)

FastAPI-прокси в локальную Ollama.

## Запуск
1. ollama pull llama3.2 (если не стоит)
2. В папке llm-demo: uvicorn app:app --reload`n3. POST http://localhost:8000/chat {"prompt": "hi"}

GET /health -> статус. Модель/URL через env OLLAMA_MODEL, OLLAMA_URL.
