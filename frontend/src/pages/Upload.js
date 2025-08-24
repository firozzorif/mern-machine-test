import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CloudArrowUpIcon, 
  DocumentIcon,
  CheckCircleIcon,
  ArrowUpTrayIcon
} from "@heroicons/react/24/outline";
import API from "../api";
import toast from "react-hot-toast";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      toast.success(`File "${selectedFile.name}" selected`);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "text/csv" || 
          droppedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          droppedFile.type === "application/vnd.ms-excel") {
        setFile(droppedFile);
        toast.success(`File "${droppedFile.name}" selected`);
      } else {
        toast.error("Please select a CSV or Excel file");
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a CSV/XLSX file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.msg);
      setFile(null);
    } catch (err) {
      toast.error("Upload error: " + (err.response?.data?.msg || err.message));
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CloudArrowUpIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upload Leads</h1>
            <p className="text-gray-600">Upload CSV or Excel files to distribute leads to agents</p>
          </div>
        </div>
      </motion.div>

      {/* Upload Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-3">File Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-blue-600" />
            <span>Supported formats: CSV, XLSX, XLS</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-blue-600" />
            <span>Maximum file size: 10MB</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-blue-600" />
            <span>Required columns: firstName, phone, notes</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-blue-600" />
            <span>Automatic distribution to available agents</span>
          </div>
        </div>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
      >
        <form onSubmit={handleUpload} className="space-y-6">
          {/* Drag and Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : file
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            
            <div className="space-y-4">
              {file ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center space-x-3"
                >
                  <DocumentIcon className="w-12 h-12 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </motion.div>
              ) : (
                <>
                  <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Drop your file here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports CSV, XLSX, and XLS files up to 10MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* File Info */}
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <DocumentIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Selected File</p>
                    <p className="text-sm text-gray-500">{file.name} ({formatFileSize(file.size)})</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          )}

          {/* Upload Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: file && !uploading ? 1.05 : 1 }}
              whileTap={{ scale: file && !uploading ? 0.95 : 1 }}
              type="submit"
              disabled={!file || uploading}
              className={`flex items-center space-x-3 px-8 py-4 rounded-lg font-medium transition-all duration-200 ${
                file && !uploading
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Uploading & Distributing...</span>
                </>
              ) : (
                <>
                  <ArrowUpTrayIcon className="w-5 h-5" />
                  <span>Upload & Distribute Leads</span>
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Process Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <h4 className="font-medium text-gray-900 mb-3">What happens after upload?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 font-bold text-xs">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">File Processing</p>
                <p className="text-gray-600">Your file is validated and parsed</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 font-bold text-xs">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Lead Distribution</p>
                <p className="text-gray-600">Leads are automatically assigned to agents</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 font-bold text-xs">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Task Creation</p>
                <p className="text-gray-600">Tasks are created and ready for agents</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Upload;
