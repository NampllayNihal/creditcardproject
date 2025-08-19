import React from 'react';
import { AlertTriangle, CheckCircle, Clock, IndianRupee, Filter } from 'lucide-react';
import { useFraudDetection } from '../context/FraudDetectionContext';

const ResultsSection: React.FC = () => {
  const { results, isProcessing } = useFraudDetection();
  const [filter, setFilter] = React.useState<'all' | 'fraud' | 'normal'>('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  if (!results && !isProcessing) return null;

  const filteredTransactions = results?.transactions?.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'fraud') return transaction.isFraud;
    return !transaction.isFraud;
  }) || [];

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const formatTime = (timeSeconds: number) => {
    const date = new Date(Date.now() - (timeSeconds * 1000));
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'short',
      timeStyle: 'short'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (isProcessing) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Transactions</h2>
            <p className="text-gray-600">Please wait while our AI models process your data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Detection Results</h2>
          <p className="text-xl text-gray-600">Analysis completed with advanced fraud detection algorithms</p>
        </div>

        {results && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                    <p className="text-2xl font-bold text-gray-900">{results.summary.totalTransactions.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Fraudulent</p>
                    <p className="text-2xl font-bold text-red-600">{results.summary.fraudCount.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Fraud Rate</p>
                    <p className="text-2xl font-bold text-orange-600">{results.summary.fraudRate.toFixed(2)}%</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Filter className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Processing Time</p>
                    <p className="text-2xl font-bold text-green-600">{results.summary.processingTime}ms</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Filter:</span>
                  <button
                    onClick={() => {setFilter('all'); setCurrentPage(1);}}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({results.transactions.length})
                  </button>
                  <button
                    onClick={() => {setFilter('fraud'); setCurrentPage(1);}}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'fraud' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Fraud ({results.summary.fraudCount})
                  </button>
                  <button
                    onClick={() => {setFilter('normal'); setCurrentPage(1);}}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === 'normal' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Normal ({results.summary.totalTransactions - results.summary.fraudCount})
                  </button>
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time (IST)
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Confidence
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTransactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTime(transaction.time)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.isFraud 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {transaction.isFraud ? (
                              <>
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Fraud
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Normal
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(transaction.confidence * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredTransactions.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              page === currentPage
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;