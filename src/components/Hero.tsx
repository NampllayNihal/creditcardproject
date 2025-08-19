import React from 'react';
import { AlertTriangle, TrendingUp, Users, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const stats = [
    { icon: AlertTriangle, label: 'Fraud Detected', value: '₹2.3Cr+', color: 'text-red-600 bg-red-50' },
    { icon: TrendingUp, label: 'Accuracy Rate', value: '99.4%', color: 'text-green-600 bg-green-50' },
    { icon: Users, label: 'Protected Users', value: '50K+', color: 'text-blue-600 bg-blue-50' },
    { icon: Clock, label: 'Avg Response', value: '<2s', color: 'text-purple-600 bg-purple-50' }
  ];

  return (
    <section id="home" className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Credit Card Fraud Detection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered fraud detection system designed specifically for Indian banking transactions. 
            Protect your customers with real-time anomaly detection using XGBoost and machine learning algorithms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('detection')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Detection
            </button>
            <button 
              onClick={() => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
            >
              View Analytics
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className={`p-3 rounded-lg ${stat.color} w-fit mb-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;