from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

# Initialize FastAPI application
app = FastAPI(
    title="LogiPredict API",
    description="Predictive Logistics & Delivery Intelligence Platform API",
    version="1.0.0"
)

# Enable CORS so your React frontend can communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (good for development and local testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the path to your trained model
MODEL_PATH = os.path.join("data", "processed", "logipredict_model.pkl")

# Load the trained model into memory on startup
try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully into FastAPI memory!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Define Pydantic model for incoming shipment data matching your dataset features
class ShipmentInput(BaseModel):
    origin: str
    destination: str
    distance_km: float
    carrier: str
    shipping_mode: str
    order_priority: str
    product_type: str
    shipment_weight_kg: float
    package_count: int
    warehouse_processing_hours: float
    weather_condition: str
    day_of_week: str
    scheduled_delivery_days: float

@app.get("/")
def home():
    return {"message": "Welcome to the LogiPredict API! Use the /predict endpoint for ML inference."}

@app.post("/predict")
def predict_delay(data: ShipmentInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Machine learning model is not loaded in memory.")
    
    try:
        # Convert incoming JSON request body to a Pandas DataFrame
        input_data = pd.DataFrame([data.dict()])
        
        # Make prediction using your trained pipeline/model
        prediction = model.predict(input_data)[0]
        
        # Get probability if the model supports it
        probability = 0.5
        if hasattr(model, "predict_proba"):
            proba_array = model.predict_proba(input_data)
            probability = float(proba_array[0][1]) # Probability of delay (class 1)
        
        # Determine risk level category
        risk_level = "Low Risk"
        if probability >= 0.7:
            risk_level = "High Risk"
        elif probability >= 0.4:
            risk_level = "Medium Risk"
            
        return {
            "is_delayed": int(prediction),
            "delay_probability": round(probability * 100, 2),
            "risk_level": risk_level
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))