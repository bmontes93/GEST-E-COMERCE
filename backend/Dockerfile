FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Initialize DB on start? OR run manually.
# For now, we launch uvicorn. db init happens on startup event.

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
