from fastapi import APIRouter, Depends
from sqlmodel import Session, delete
from app.core.db import get_session
from app.models import User, Pack
import json

router = APIRouter()

@router.post("/seed")
def seed_database(session: Session = Depends(get_session)):
    # 1. Clear existing data
    session.exec(delete(Pack))
    session.exec(delete(User))
    session.commit()

    # 2. Setup Base Users
    admin = User(email="admin@gest.com", password="123", role="admin", name="Admin Gest")
    client = User(email="cliente@gest.com", password="123", role="client", name="Cliente Nuevo")
    session.add(admin)
    session.add(client)
    session.commit()

    # Real Providers in Huaraz
    providers_data = [
        ("california@gest.com", "California Café", "Café & Bakery", "/images/cafe.png", ["Café", "Desayuno", "Orgánico", "Libros"], "S/ 25.00", "S/ 12.00"),
        ("trivio@gest.com", "Trivio Resto Bar", "Sierra Andina Pub", "/images/burger.png", ["Cerveza Artesanal", "Hamburguesas", "Bar"], "S/ 45.00", "S/ 22.00"),
        ("chilli@gest.com", "Chilli Heaven", "Comida Internacional", "/images/healthy.png", ["Curry", "Thai", "Mexicano", "Picante"], "S/ 38.00", "S/ 18.00"),
        ("elhorno@gest.com", "El Horno", "Pizzería a la Leña", "/images/pizza.png", ["Pizza", "Leña", "Pasta"], "S/ 40.00", "S/ 20.00"),
        ("manka@gest.com", "Manka", "Fusión Andina", "/images/healthy.png", ["Novoandina", "Gourmet", "Fusión"], "S/ 55.00", "S/ 25.00"),
        ("cafeandino@gest.com", "Café Andino", "Cafetería con Vista", "/images/cafe.png", ["Café", "Vistas", "Postres"], "S/ 28.00", "S/ 14.00"),
        ("mi_comedia@gest.com", "Mi Comedia Pizzeria", "Restaurante Italiano", "/images/pizza.png", ["Pizza", "Italiano", "Romántico"], "S/ 42.00", "S/ 21.00"),
        ("creperie@gest.com", "Creperie Patrick", "Crepes Franceses", "/images/bakery.png", ["Crepes", "Postres", "Vino"], "S/ 20.00", "S/ 10.00"),
        ("encuentro@gest.com", "El Encuentro", "Restaurante Tradicional", "/images/healthy.png", ["Trucha", "Cuy", "Típico"], "S/ 45.00", "S/ 22.00"),
        ("sala@gest.com", "Sala de Estar", "Bar Cultural", "/images/cafe.png", ["Tapas", "Arte", "Música"], "S/ 30.00", "S/ 15.00"),
        ("luigi@gest.com", "Luigi's Pizza", "Pastas & Pizza", "/images/pizza.png", ["Pizza", "Lasagna", "Familiar"], "S/ 35.00", "S/ 17.00"),
        ("wayta@gest.com", "Wayta", "Cocina Peruana", "/images/healthy.png", ["Lomo Saltado", "Criollo", "Peruano"], "S/ 38.00", "S/ 19.00"),
    ]

    # Real Coordinates for Huaraz (Approximated based on known locations)
    # Center of Huaraz approx: -9.5277, -77.5277
    coords = {
        "California Café": (-9.5280, -77.5285),  # Jr. 28 de Julio
        "Trivio Resto Bar": (-9.5284, -77.5287), # Parque del Periodista
        "Chilli Heaven": (-9.5245, -77.5300),    # Parque Ginebra area
        "El Horno": (-9.5282, -77.5271),
        "Manka": (-9.5290, -77.5265),
        "Café Andino": (-9.5305, -77.5255),      # Lucar y Torre
        "Mi Comedia Pizzeria": (-9.5285, -77.5280),
        "Creperie Patrick": (-9.5250, -77.5288),
        "El Encuentro": (-9.5260, -77.5290),
        "Sala de Estar": (-9.5260, -77.5275),
        "Luigi's Pizza": (-9.5270, -77.5270),
        "Wayta": (-9.5280, -77.5280),
    }

    for i, (email, biz_name, category, img, tags, orig, disc) in enumerate(providers_data):
        # Create Provider User
        # Use biz_name for both name and businessName for simplicity
        user = User(email=email, password="123", role="provider", name=biz_name, businessName=biz_name)
        session.add(user)
        session.commit() # Get ID
        session.refresh(user)

        # Get coords or default to center
        lat, lng = coords.get(biz_name, (-9.5277, -77.5277))

        # Create Pack for this provider
        pack = Pack(
            provider_id=user.id,
            businessName=biz_name, # Correctly use the business name
            distance=f"{0.2 + (i * 0.1):.1f} km",
            originalPrice=orig,
            discountedPrice=disc,
            timeLeft=f"{20 + (i%3)}:00",
            tags_str=json.dumps(tags),
            imageUrl=img,
            itemsLeft=3 + (i % 5),
            lat=lat,
            lng=lng,
            description=f"Caja sorpresa deliciosa de {category}. ¡Salva comida de calidad!",
            rating=4.2 + ((i % 8) / 10.0)
        )
        session.add(pack)
    
    session.commit()

    return {"message": "Database seeded with REAL Huaraz locations!", "status": "success"}
