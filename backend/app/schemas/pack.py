from pydantic import BaseModel
from typing import List, Optional

class Pack(BaseModel):
    id: int
    businessName: str
    distance: str
    originalPrice: str
    discountedPrice: str
    timeLeft: str
    tags: List[str]
    imageUrl: str
    itemsLeft: int
    lat: Optional[float] = None
    lng: Optional[float] = None
    description: Optional[str] = "Una caja sorpresa llena de deliciosos productos rescatados."
    rating: Optional[float] = 4.5

    class Config:
        from_attributes = True
