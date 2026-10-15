# 🚀 LogiPredict: B2B Logistics Intelligence Platform

An enterprise-grade, full-stack predictive logistics and supply chain risk analytics platform designed to forecast shipment delays in real-time using machine learning.

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?logo=fastapi)
![XGBoost](https://img.shields.io/badge/XGBoost-ML-orange?logo=xgboost)
![React](https://img.shields.io/badge/React-Vite-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

---

## 🌟 Overview
Supply chain bottlenecks cost global businesses billions annually. **LogiPredict** bridges the gap between historical logistics data and actionable foresight by predicting whether a shipment is at risk of delay *before* it leaves the warehouse. 

The platform features a decoupled architecture: a high-performance **FastAPI** backend serving a serialized **XGBoost** model trained on extensive shipment records, paired with a modern, responsive **React & Vite** dashboard.

---

## 🛠️ Tech Stack

* **Machine Learning:** Python, Scikit-Learn, XGBoost, Pandas, Joblib
* **Backend API:** FastAPI, Uvicorn, Pydantic, CORS Middleware
* **Frontend Dashboard:** React, Vite, Tailwind CSS, Modern UI/UX Architecture
* **Version Control & Deployment:** Git, GitHub, Vercel (Frontend), Render (Backend)

---

## 📊 Key Features
* **Real-Time Risk Scoring:** Instantly calculates delay probabilities and categorizes shipments into *Low, Medium, or High Risk*.
* **Dynamic Parameter Input:** Customize origin cities, carriers, shipping modes (Air, Road, Rail, Sea), weights, distances, and weather conditions.
* **Production-Ready REST API:** Fully documented interactive API endpoints available via FastAPI (`/docs`).
* **Optimized UI Design:** Sleek, dark-mode analytics dashboard built for logistics coordinators and data science portfolios.

---

## 📂 Project Structure

```text
Logipredict/
│
├── data/
│   ├── processed/          # Serialized ML model (logipredict_model.pkl)
│   └── raw/                # Source shipment datasets
│
├── frontend/               # React + Vite Dashboard
│   ├── src/                # Components and App.jsx UI logic
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite build configuration
│
├── src/                    # FastAPI Backend
│   ├── main.py             # API routes, CORS configuration, & model loading
│   └── model.py            # Model training & pipeline definition
│
├── requirements.txt        # Python backend dependencies
└── README.md               # Project Documentation