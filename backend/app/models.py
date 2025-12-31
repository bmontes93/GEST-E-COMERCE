from typing import List, Optional
from sqlmodel import Field, SQLModel

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password: str # In real production, hash this!
    role: str = "client" # client, provider, admin
    name: str
    businessName: Optional[str] = None # Only for providers
    avatarUrl: Optional[str] = None
    google_id: Optional[str] = Field(default=None, index=True)
    facebook_id: Optional[str] = Field(default=None, index=True)
    x_id: Optional[str] = Field(default=None, index=True)
    city: str = "Huaraz"
    region: str = "Ancash"

class Pack(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    provider_id: Optional[int] = Field(default=None, foreign_key="user.id")
    businessName: str # Denormalized for easier query, or join
    distance: str = "0.5 km"
    originalPrice: str
    discountedPrice: str
    timeLeft: str
    imageUrl: str
    itemsLeft: int
    lat: Optional[float] = None
    lng: Optional[float] = None
    city: str = "Huaraz"
    region: str = "Ancash"
    description: Optional[str] = "Una caja sorpresa."
    rating: Optional[float] = 4.5
    
    tags_str: str = "[]" 

    @property
    def tags(self) -> List[str]:
        import json
        try:
            return json.loads(self.tags_str)
        except:
            return []

    @tags.setter
    def tags(self, value: List[str]):
        import json
        self.tags_str = json.dumps(value)

class Reservation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    pack_id: int = Field(foreign_key="pack.id")
    status: str = "active" # active, completed, cancelled
    pickup_time: str
    created_at: str # ISO format string for simplicity

