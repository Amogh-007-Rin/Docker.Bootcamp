import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
model = joblib.load("model.joblib")

class Features(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(f: Features):
    X = np.array([[f.sepal_length, f.sepal_width, f.petal_length, f.petal_width]])
    pred = int(model.predict(X)[0])
    return {"class_id": pred}
