import pandas as pd

# Path to your dataset
file_path = "data/raw/logipredict_shipments_80k.csv"

try:
    df = pd.read_csv(file_path)
    print("="*50)
    print("DATASET LOADED SUCCESSFULLY!")
    print("="*50)
    print(f"Total Rows (Shipments): {df.shape[0]:,}")
    print(f"Total Columns: {df.shape[1]}")
    print("\nColumn Names & Data Types:")
    print(df.dtypes)
    print("\nFirst 3 Rows:")
    print(df.head(3))
    print("="*50)
except Exception as e:
    print(f"Error loading dataset: {e}")
    