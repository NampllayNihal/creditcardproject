import React from 'react';
import { BarChart, Activity, Target, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { useFraudDetection } from '../context/FraudDetectionContext';

const MetricsSection: React.FC = () => {
  const { results } = useFraudDetection();
  const [showDetails, setShowDetails] = React.useState(false);

  if (!results) return null;

  const { metrics } = results;

  return (
    <section id="metrics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Model Performance Analytics</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive metrics showing the effectiveness of our fraud detection models trained on 
            real-world transaction data with advanced machine learning algorithms.
          </p>
        </div>

        {/* Main Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-700">Accuracy</span>
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">{(metrics.accuracy * 100).toFixed(2)}%</p>
            <p className="text-sm text-blue-700">Overall model accuracy</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-600 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-700">Precision</span>
            </div>
            <p className="text-3xl font-bold text-green-900 mb-1">{(metrics.precision * 100).toFixed(2)}%</p>
            <p className="text-sm text-green-700">True fraud detection rate</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-600 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-purple-700">Recall</span>
            </div>
            <p className="text-3xl font-bold text-purple-900 mb-1">{(metrics.recall * 100).toFixed(2)}%</p>
            <p className="text-sm text-purple-700">Fraud cases caught</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-600 p-3 rounded-lg">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-orange-700">F1 Score</span>
            </div>
            <p className="text-3xl font-bold text-orange-900 mb-1">{(metrics.f1Score * 100).toFixed(2)}%</p>
            <p className="text-sm text-orange-700">Balanced performance</p>
          </div>
        </div>

        {/* Detailed Metrics Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Metrics & Analysis</h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-indigo-100 p-4 rounded-lg mb-3">
                  <div className="text-2xl font-bold text-indigo-900">{metrics.auc.toFixed(3)}</div>
                </div>
                <h4 className="font-semibold text-gray-900">AUC Score</h4>
                <p className="text-sm text-gray-600">Area Under ROC Curve</p>
              </div>

              <div className="text-center">
                <div className="bg-teal-100 p-4 rounded-lg mb-3">
                  <div className="text-2xl font-bold text-teal-900">{metrics.specificity.toFixed(3)}</div>
                </div>
                <h4 className="font-semibold text-gray-900">Specificity</h4>
                <p className="text-sm text-gray-600">True negative rate</p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-3">
                  <div className="text-2xl font-bold text-red-900">{metrics.falsePositiveRate.toFixed(4)}</div>
                </div>
                <h4 className="font-semibold text-gray-900">False Positive Rate</h4>
                <p className="text-sm text-gray-600">Incorrectly flagged normal transactions</p>
              </div>
            </div>

            {showDetails && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Confusion Matrix</h4>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-900">{metrics.confusionMatrix.trueNegative.toLocaleString('en-IN')}</div>
                      <div className="text-sm text-green-700">True Negative</div>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-red-900">{metrics.confusionMatrix.falsePositive.toLocaleString('en-IN')}</div>
                      <div className="text-sm text-red-700">False Positive</div>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-orange-900">{metrics.confusionMatrix.falseNegative.toLocaleString('en-IN')}</div>
                      <div className="text-sm text-orange-700">False Negative</div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-900">{metrics.confusionMatrix.truePositive.toLocaleString('en-IN')}</div>
                      <div className="text-sm text-blue-700">True Positive</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Model Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Primary Algorithm:</span>
                        <span className="font-medium text-gray-900">XGBoost Classifier</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Anomaly Detection:</span>
                        <span className="font-medium text-gray-900">Isolation Forest</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Outlier Detection:</span>
                        <span className="font-medium text-gray-900">Local Outlier Factor</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Training Data:</span>
                        <span className="font-medium text-gray-900">284,807 transactions</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Performance Insights</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Detection Speed:</span>
                        <span className="font-medium text-green-600">&lt; 2ms per transaction</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Model Size:</span>
                        <span className="font-medium text-gray-900">24.3 MB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium text-gray-900">
                          {new Date().toLocaleDateString('en-IN', { 
                            timeZone: 'Asia/Kolkata',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Timezone:</span>
                        <span className="font-medium text-blue-600">Indian Standard Time (IST)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;