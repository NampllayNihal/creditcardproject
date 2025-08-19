import React from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Edit3 } from 'lucide-react';
import { useFraudDetection } from '../context/FraudDetectionContext';

const UploadSection: React.FC = () => {
  const { uploadFile, processManualEntry, isProcessing, uploadStatus } = useFraudDetection();
  const [dragActive, setDragActive] = React.useState(false);
  const [showManualEntry, setShowManualEntry] = React.useState(false);
  const [manualData, setManualData] = React.useState({
    time: '',
    amount: '',
    v1: '', v2: '', v3: '', v4: '', v5: ''
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      uploadFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      uploadFile(files[0]);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData = {
      time: parseFloat(manualData.time) || 0,
      amount: parseFloat(manualData.amount) || 0,
      v1: parseFloat(manualData.v1) || 0,
      v2: parseFloat(manualData.v2) || 0,
      v3: parseFloat(manualData.v3) || 0,
      v4: parseFloat(manualData.v4) || 0,
      v5: parseFloat(manualData.v5) || 0
    };
    processManualEntry(transactionData);
    setManualData({
      time: '', amount: '', v1: '', v2: '', v3: '', v4: '', v5: ''
    });
  };

  return (
    <section id="detection" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Upload Transaction Data</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your CSV file containing credit card transaction data. Our AI model will analyze each transaction 
            and identify potential fraudulent activities in real-time.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setShowManualEntry(false)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                !showManualEntry ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upload CSV
            </button>
            <button
              onClick={() => setShowManualEntry(true)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                showManualEntry ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manual Entry
            </button>
          </div>
        </div>

        {!showManualEntry ? (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors duration-200">
          <div
            className={`${dragActive ? 'border-blue-500 bg-blue-50' : ''} border-2 border-dashed border-transparent rounded-lg p-8 transition-all duration-200`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              {isProcessing ? (
                <div className="animate-pulse">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-blue-600 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Transactions...</h3>
                  <p className="text-gray-600">Analyzing data with AI models</p>
                </div>
              ) : (
                <>
                  <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV File</h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your transaction file here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition-colors duration-200 inline-block"
                  >
                    Choose File
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
        ) : (
          <div className="bg-white border-2 border-gray-300 rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Edit3 className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manual Transaction Entry</h3>
              <p className="text-gray-600">Enter transaction details manually for fraud detection</p>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time (seconds from first transaction)
                  </label>
                  <input
                    type="number"
                    value={manualData.time}
                    onChange={(e) => setManualData({...manualData, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 3600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={manualData.amount}
                    onChange={(e) => setManualData({...manualData, amount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 1500.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PCA Features (V1-V5) - Optional
                </label>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {['v1', 'v2', 'v3', 'v4', 'v5'].map((field) => (
                    <input
                      key={field}
                      type="number"
                      step="any"
                      value={manualData[field as keyof typeof manualData]}
                      onChange={(e) => setManualData({...manualData, [field]: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={field.toUpperCase()}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Leave PCA features empty for automatic feature generation
                </p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isProcessing ? 'Processing...' : 'Analyze Transaction'}
                </button>
              </div>
            </form>
          </div>
        )}

          {uploadStatus && (
            <div className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
              uploadStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {uploadStatus.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span className="font-medium">{uploadStatus.message}</span>
            </div>
          )}

        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">CSV Format Requirements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Required Columns:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Time (seconds from first transaction)</li>
                <li>• V1-V28 (PCA transformed features)</li>
                <li>• Amount (transaction amount in ₹)</li>
                <li>• Class (0=Normal, 1=Fraud) - optional</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Model Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• XGBoost Classification</li>
                <li>• Isolation Forest (Anomaly Detection)</li>
                <li>• Local Outlier Factor</li>
                <li>• Indian Standard Time (IST) Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;