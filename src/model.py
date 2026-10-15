import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from xgboost import XGBClassifier
import joblib

def load_and_preprocess_data(file_path):
    """Loads the dataset and prepares features and target."""
    df = pd.read_csv(file_path)
    
    # Feature Engineering from order_date if needed
    # Drop columns that are IDs or direct leakage to the delay target
    drop_cols = ['shipment_id', 'order_date', 'delivery_date', 'delay_days', 'delivery_time_days']
    
    # Keep only existing columns to drop
    drop_cols = [col for col in drop_cols if col in df.columns]
    
    X = df.drop(columns=drop_cols + ['is_delayed'])
    y = df['is_delayed']
    
    return X, y

def train_model():
    """Trains an XGBoost model inside a Scikit-Learn Pipeline and saves it."""
    file_path = "data/raw/logipredict_shipments_80k.csv"
    print("Loading data for training...")
    X, y = load_and_preprocess_data(file_path)
    
    # Identify categorical and numerical columns
    cat_cols = X.select_dtypes(include=['object']).columns.tolist()
    num_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()
    
    print(f"Categorical Features: {cat_cols}")
    print(f"Numerical Features: {num_cols}")
    
    # Preprocessor for categorical columns using OneHotEncoding
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), cat_cols)
        ],
        remainder='passthrough'
    )
    
    # Full ML Pipeline: Preprocessing + XGBoost Classifier
    model_pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', XGBClassifier(
            n_estimators=100, 
            learning_rate=0.1, 
            max_depth=5, 
            random_state=42,
            eval_metric='logloss'
        ))
    ])
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print("Training XGBoost Model (this may take a few seconds on 80k rows)...")
    model_pipeline.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = model_pipeline.predict(X_test)
    y_prob = model_pipeline.predict_proba(X_test)[:, 1]
    
    acc = accuracy_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_prob)
    
    print("="*40)
    print(f"Model Training Complete!")
    print(f"Accuracy: {acc:.4f}")
    print(f"ROC-AUC Score: {roc_auc:.4f}")
    print("="*40)
    
    # Save the trained model artifact
    os.makedirs("data/processed", exist_ok=True)
    model_path = "data/processed/logipredict_model.pkl"
    joblib.dump(model_pipeline, model_path)
    print(f"Model saved successfully to {model_path}")

if __name__ == "__main__":
    train_model()