import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  time: number;
  amount: number;
  isFraud: boolean;
  confidence: number;
}

interface DetectionResults {
  summary: {
    totalTransactions: number;
    fraudCount: number;
    fraudRate: number;
    processingTime: number;
  };
  transactions: Transaction[];
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    auc: number;
    specificity: number;
    falsePositiveRate: number;
    confusionMatrix: {
      truePositive: number;
      falsePositive: number;
      trueNegative: number;
      falseNegative: number;
    };
  };
}

interface UploadStatus {
  type: 'success' | 'error';
  message: string;
}

interface FraudDetectionContextType {
  results: DetectionResults | null;
  isProcessing: boolean;
  uploadStatus: UploadStatus | null;
  uploadFile: (file: File) => Promise<void>;
  processManualEntry: (data: any) => Promise<void>;
  clearResults: () => void;
}

const FraudDetectionContext = createContext<FraudDetectionContextType | undefined>(undefined);

export const useFraudDetection = (): FraudDetectionContextType => {
  const context = useContext(FraudDetectionContext);
  if (!context) {
    throw new Error('useFraudDetection must be used within a FraudDetectionProvider');
  }
  return context;
};

interface FraudDetectionProviderProps {
  children: ReactNode;
}

export const FraudDetectionProvider: React.FC<FraudDetectionProviderProps> = ({ children }) => {
  const [results, setResults] = useState<DetectionResults | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);

  // Mock fraud detection function
  const generateMockResults = (transactionCount: number): DetectionResults => {
    const transactions: Transaction[] = [];
    let fraudCount = 0;

    for (let i = 0; i < transactionCount; i++) {
      const isFraud = Math.random() < 0.03; // 3% fraud rate
      const confidence = isFraud ? 0.7 + Math.random() * 0.3 : 0.1 + Math.random() * 0.4;
      
      if (isFraud) fraudCount++;

      transactions.push({
        time: Math.floor(Math.random() * 172800), // Random time within 48 hours
        amount: Math.random() * 50000 + 100, // Random amount between ₹100 and ₹50,100
        isFraud,
        confidence
      });
    }

    const fraudRate = (fraudCount / transactionCount) * 100;

    // Generate realistic confusion matrix
    const truePositive = Math.floor(fraudCount * 0.85); // 85% of frauds caught
    const falseNegative = fraudCount - truePositive;
    const falsePositive = Math.floor((transactionCount - fraudCount) * 0.01); // 1% false positive rate
    const trueNegative = transactionCount - fraudCount - falsePositive;

    const precision = truePositive / (truePositive + falsePositive);
    const recall = truePositive / (truePositive + falseNegative);
    const specificity = trueNegative / (trueNegative + falsePositive);
    const accuracy = (truePositive + trueNegative) / transactionCount;
    const f1Score = 2 * (precision * recall) / (precision + recall);
    const falsePositiveRate = falsePositive / (falsePositive + trueNegative);

    return {
      summary: {
        totalTransactions: transactionCount,
        fraudCount,
        fraudRate,
        processingTime: Math.floor(Math.random() * 500) + 100
      },
      transactions,
      metrics: {
        accuracy,
        precision,
        recall,
        f1Score,
        auc: 0.985 + Math.random() * 0.01,
        specificity,
        falsePositiveRate,
        confusionMatrix: {
          truePositive,
          falsePositive,
          trueNegative,
          falseNegative
        }
      }
    };
  };

  const processManualEntry = async (data: any): Promise<void> => {
    setIsProcessing(true);
    setUploadStatus(null);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate single transaction result
      const isFraud = Math.random() < 0.15; // 15% chance for manual entry
      const confidence = isFraud ? 0.8 + Math.random() * 0.2 : 0.1 + Math.random() * 0.3;

      const transaction: Transaction = {
        time: data.time,
        amount: data.amount,
        isFraud,
        confidence
      };

      const mockResults: DetectionResults = {
        summary: {
          totalTransactions: 1,
          fraudCount: isFraud ? 1 : 0,
          fraudRate: isFraud ? 100 : 0,
          processingTime: Math.floor(Math.random() * 200) + 50
        },
        transactions: [transaction],
        metrics: {
          accuracy: 0.994,
          precision: 0.85,
          recall: 0.82,
          f1Score: 0.835,
          auc: 0.987,
          specificity: 0.998,
          falsePositiveRate: 0.002,
          confusionMatrix: {
            truePositive: isFraud ? 1 : 0,
            falsePositive: 0,
            trueNegative: isFraud ? 0 : 1,
            falseNegative: 0
          }
        }
      };

      setResults(mockResults);
      setUploadStatus({
        type: 'success',
        message: `Transaction analyzed successfully. ${isFraud ? 'FRAUD DETECTED!' : 'Transaction appears normal.'}`
      });

      // Scroll to results section
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Error processing transaction. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadFile = async (file: File): Promise<void> => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadStatus({
        type: 'error',
        message: 'Please upload a CSV file.'
      });
      return;
    }

    setIsProcessing(true);
    setUploadStatus(null);

    try {
      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock results based on file size (simulate transaction count)
      const transactionCount = Math.max(100, Math.floor(file.size / 100));
      const mockResults = generateMockResults(Math.min(transactionCount, 10000)); // Cap at 10k for demo

      setResults(mockResults);
      setUploadStatus({
        type: 'success',
        message: `Successfully processed ${mockResults.summary.totalTransactions.toLocaleString('en-IN')} transactions.`
      });

      // Scroll to results section
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Error processing file. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const clearResults = (): void => {
    setResults(null);
    setUploadStatus(null);
  };

  const contextValue: FraudDetectionContextType = {
    results,
    isProcessing,
    uploadStatus,
    uploadFile,
    processManualEntry,
    clearResults
  };

  return (
    <FraudDetectionContext.Provider value={contextValue}>
      {children}
    </FraudDetectionContext.Provider>
  );
};