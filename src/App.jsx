import React, { useState } from 'react';
import { Upload, FileText, Menu, X, Send, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const LegalAIClauseAssistant = () => {
  const [currentPage, setCurrentPage] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [selectedClause, setSelectedClause] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [mobileView, setMobileView] = useState('clauses');

  const sampleFile = {
    file_name: "Sample_Employment_Contract.pdf",
    clauses: [
      {
        id: 1,
        title: "Salary & Compensation",
        text: "Employee shall receive a gross monthly salary of ₹85,000, paid on the last working day of each month. Annual increments are at management discretion.",
        risk: "🟡 Medium risk",
        riskScore: 6,
        category: "Compensation",
        advice: "Salary clause lacks automatic increment structure. Consider negotiating annual review guarantees.",
        keyPoints: ["No guaranteed increments", "Management discretion clause", "Fixed monthly payment"],
        alternatives: "Suggest: 'Annual salary review with minimum 5% increment subject to performance evaluation.'"
      },
      {
        id: 2,
        title: "Non-Compete Clause",
        text: "Employee agrees not to engage in any competing business activities for 24 months after termination within a 50km radius.",
        risk: "🔴 High risk",
        riskScore: 9,
        category: "Restrictions",
        advice: "Overly restrictive non-compete clause. 24 months is excessive and may not be legally enforceable.",
        keyPoints: ["24-month restriction period", "50km geographical limit", "All competing activities banned"],
        alternatives: "Negotiate: '6-12 months restriction for direct competitors only, with geographical limit to city boundaries.'"
      },
      {
        id: 3,
        title: "Probation Period",
        text: "Employee shall serve a probation period of 6 months during which either party may terminate employment with 1 week notice.",
        risk: "🟢 Low risk",
        riskScore: 3,
        category: "Employment Terms",
        advice: "Standard probation clause. Duration and notice period are reasonable and industry-standard.",
        keyPoints: ["6-month probation", "1-week notice during probation", "Mutual termination right"],
        alternatives: "Consider: Requesting performance review milestones during probation period."
      },
      {
        id: 4,
        title: "Intellectual Property",
        text: "All inventions, discoveries, and creative works made during employment belong exclusively to the Company, including those made outside working hours.",
        risk: "🔴 High risk",
        riskScore: 8,
        category: "IP Rights",
        advice: "Extremely broad IP assignment clause extends beyond work hours and work-related activities.",
        keyPoints: ["All-encompassing IP assignment", "Includes after-hours work", "No personal IP protection"],
        alternatives: "Limit to: 'Work-related inventions made during employment hours using company resources.'"
      }
    ]
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = { ...sampleFile, file_name: file.name };
      setUploadedFiles([...uploadedFiles, newFile]);
      setCurrentFile(newFile);
      setCurrentPage('analysis');
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const newFile = { ...sampleFile, file_name: file.name };
      setUploadedFiles([...uploadedFiles, newFile]);
      setCurrentFile(newFile);
      setCurrentPage('analysis');
    }
  };

  const handleClauseClick = (clause) => {
    setSelectedClause(clause);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = { type: 'user', text: inputMessage };
      const botResponse = { type: 'bot', text: "Demo Reply – This is just a sample response to show how the AI works. It’s not real legal advice." };

      setChatMessages(prev => [...prev, userMessage, botResponse]);
      setInputMessage('');
    }
  };

  const getRiskIcon = (risk) => {
    if (risk.includes('Low')) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (risk.includes('Medium')) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    if (risk.includes('High')) return <AlertCircle className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getRiskColor = (risk) => {
    if (risk.includes('Low')) return 'border-green-200 bg-green-50';
    if (risk.includes('Medium')) return 'border-yellow-200 bg-yellow-50';
    if (risk.includes('High')) return 'border-red-200 bg-red-50';
    return 'border-gray-200 bg-gray-50';
  };

  // Upload Page
  if (currentPage === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-4">
        <div className="max-w-xl w-full px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <FileText className="w-14 h-14 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Legal AI Clause Assistant</h1>
            <p className="text-gray-600 mb-5">Upload your contract or paste text for analysis</p>

            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-blue-300 rounded-lg p-6 hover:border-blue-400 transition-colors cursor-pointer mb-4"
            >
              <Upload className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <p className="text-gray-600 mb-3">Drag and drop your file here, or click to browse</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Choose File
              </label>
              <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, TXT</p>
            </div>

            <div className="text-gray-500 mb-4">OR</div>

            <div className="text-left">
              <textarea
                id="contract-text"
                placeholder="Paste your contract text here..."
                className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
              ></textarea>
              <button
                onClick={() => {
                  const textArea = document.getElementById('contract-text');
                  const text = textArea.value.trim();
                  if (text) {
                    const newFile = { ...sampleFile, file_name: "Pasted_Contract.txt" };
                    setUploadedFiles([...uploadedFiles, newFile]);
                    setCurrentFile(newFile);
                    setCurrentPage('analysis');
                  }
                }}
                className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze Text
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Analysis Page
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* Mobile Toggle Tabs */}
      <div className="lg:hidden bg-white border-b border-gray-200 flex">
        <button
          onClick={() => setMobileView('clauses')}
          className={`flex-1 p-3 text-sm font-medium ${
            mobileView === 'clauses'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          Contract Analysis
        </button>
        <button
          onClick={() => setMobileView('chat')}
          className={`flex-1 p-3 text-sm font-medium ${
            mobileView === 'chat'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          AI Assistant
        </button>
      </div>

      {/* Hamburger Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="bg-white w-80 h-full p-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Uploaded Files</h3>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentFile(file);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentFile?.file_name === file.file_name
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  {file.file_name}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setCurrentPage('upload');
                setIsMenuOpen(false);
              }}
              className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              + Upload Another File
            </button>
          </div>
        </div>
      )}

      {/* Left Panel - Clauses */}
      <div className={`flex-1 overflow-y-auto lg:h-screen ${mobileView === 'clauses' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}`}>
        <div className="p-4 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-gray-200 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 lg:block hidden">Contract Analysis</h2>
          </div>

          <div className="space-y-4">
            {currentFile?.clauses.map((clause) => (
              <div
                key={clause.id}
                onClick={() => {
                  handleClauseClick(clause);
                  setMobileView('chat'); // Auto-switch to chat on mobile
                }}
                className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${getRiskColor(clause.risk)} ${
                  selectedClause?.id === clause.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-gray-700">Clause {clause.id} - {clause.title}</span>
                    <span className="text-xs text-gray-500">{clause.category}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {getRiskIcon(clause.risk)}
                    <span className="text-xs sm:text-sm font-medium">{clause.risk}</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-800">{clause.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Chatbot */}
      <div className={`w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col h-screen ${mobileView === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">AI Legal Assistant</h3>
            {selectedClause && <p className="text-sm text-gray-500 truncate">Context: {selectedClause.title}</p>}
          </div>
          <button onClick={() => setMobileView('clauses')} className="lg:hidden p-1 hover:bg-gray-200 rounded text-gray-600">
            ← Back
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={selectedClause ? "Ask about this clause..." : "Select a clause first..."}
              disabled={!selectedClause}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100"
            />
            <button
              onClick={handleSendMessage}
              disabled={!selectedClause || !inputMessage.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0 disabled:bg-gray-400"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAIClauseAssistant;
