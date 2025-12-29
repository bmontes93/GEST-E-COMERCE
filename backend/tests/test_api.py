from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "ReAprovecha API" in response.json().get("message", "")

def test_get_packs():
    response = client.get(f"{settings.API_V1_STR}/packs/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "businessName" in data[0]
