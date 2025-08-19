# 💳 Credit Card Fraud Detection (Indian Version)

## 📖 Overview
This project detects fraudulent credit card transactions using both **anomaly detection** and **supervised machine learning** techniques.  
It is customized for the **Indian context** with INR (₹) values, IST timestamps, and manual entry fields relevant to local usage.  

The system provides:
- **Bulk Fraud Detection** via CSV Upload
- **Manual Transaction Entry** with fraud probability
- **Evaluation Metrics** (Confusion Matrix, ROC Curve, Accuracy, Precision, Recall, F1-score)

---

## 🎯 Objectives
- Identify fraudulent transactions in highly imbalanced datasets.  
- Apply **Isolation Forest** and **Local Outlier Factor (LOF)** for anomaly detection.  
- Train an **XGBoost classifier** for supervised fraud detection.  
- Provide an interactive **dashboard** for predictions.  
- Ensure accessibility on **PC, Laptop, and Mobile** devices.  

---

## 📊 Dataset
- **Source:** [Kaggle – Credit Card Fraud Detection Dataset](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)  
- **Records:** 284,807 transactions  
- **Fraud Cases:** 492 (~0.17%) → highly imbalanced  
- **Features:**
  - Time (converted to **IST**)  
  - Amount (₹)  
  - V1–V28 (anonymized PCA features)  
  - Class (0 = Genuine, 1 = Fraud)  

---

## 🛠️ Tools & Libraries
- Python (Pandas, NumPy, Scikit-Learn, XGBoost)  
- Matplotlib, Seaborn (plots)  
- React + Vite + Tailwind (frontend)  
- Netlify (deployment)  

---

## ⚙️ Methodology
1. **Preprocessing**
   - Standardized Amount & Time  
   - Balanced dataset using **SMOTE**  

2. **Modeling**
   - Isolation Forest & LOF for anomaly detection  
   - XGBoost Classifier for supervised learning  

3. **Evaluation**
   - Confusion Matrix  
   - ROC Curve  
   - Metrics: Accuracy, Precision, Recall, F1-score, AUC  

4. **Web Dashboard**
   - CSV Upload → batch predictions  
   - Manual Entry:
     - Amount (₹)  
     - Category (typed manually)  
     - Location (typed manually)  
     - Date/Time (auto IST)  
     - **No. of Previous Transactions in Last 24 Hours** (numeric entry)  
   - Last 24 Hours Transactions Count panel  

---

## 📊 Results
- **Confusion Matrix**  
  ![Confusion Matrix]  

- **ROC Curve**  
  ![ROC Curve]

- **Sample Metrics:**  
  - Accuracy: 99.7%  
  - Precision: XX%  
  - Recall: XX%  
  - F1-Score: XX%  
  - AUC: XX%  

---

## 🌐 Deployment
Live Website: [Credit Card Fraud Detection](https://credit-card-fraud.netlify.app/)  

---

## 📂 Project Structure
creditcardproject/
│── src/ # React + Vite + Tailwind source

│── notebooks/ # Jupyter notebooks with ML models

│── assets/ # Confusion Matrix, ROC Curve images

│── index.html # Entry point

│── package.json # Dependencies

│── vite.config.ts # Vite configuration

│── LICENSE # MIT License

│── README.md # Documentation

---

## 📄 License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  

---

## ✍️ Author
- **Nihal Nampally**  
- B.Tech AI & ML (2023–2027)  
- [LinkedIn](https://www.linkedin.com/in/nihal-nampally/) | [GitHub](https://github.com/NampllayNihal)  
