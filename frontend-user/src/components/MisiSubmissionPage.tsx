import React, { useState } from 'react';
import { MisiCuanOffer } from '../types';

interface MisiSubmissionPageProps {
  offer: MisiCuanOffer;
  onSubmit: () => void;
}

const MisiSubmissionPage: React.FC<MisiSubmissionPageProps> = ({ offer, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [isDragging, setIsDragging] = useState<number | null>(null);

  const handleInputChange = (fieldId: number, value: string | File) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>, fieldId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(fieldId);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(null);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, fieldId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleInputChange(fieldId, e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (offer.submissionFields?.some(field => !formData[field.id])) {
       alert('Mohon isi semua field yang diperlukan.');
       return;
    }
    onSubmit();
  };
  
  const renderField = (field: { id: number; label: string; type: 'text' | 'file' | 'url' }) => {
    const value = formData[field.id];

    switch (field.type) {
      case 'file':
        return (
          <label 
            onDragEnter={(e) => handleDragEnter(e, field.id)}
            onDragOver={(e) => handleDragEnter(e, field.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, field.id)}
            className={`flex justify-center w-full min-h-[120px] px-6 pt-5 pb-6 border-2 ${isDragging === field.id ? 'border-primary' : 'border-gray-300'} border-dashed rounded-md cursor-pointer transition`}
          >
            <div className="space-y-1 text-center self-center">
              <i className={`fas ${value ? 'fa-check-circle text-green-500' : 'fa-cloud-upload-alt text-gray-400'} fa-2x`}></i>
              <div className="flex text-sm text-gray-600">
                <span className="relative rounded-md font-medium text-primary hover:text-secondary">
                  {value ? 'File terpilih:' : 'Pilih file'}
                </span>
                <input 
                  id={`file-upload-${field.id}`} 
                  name={`file-upload-${field.id}`} 
                  type="file" 
                  className="sr-only" 
                  onChange={(e) => e.target.files && handleInputChange(field.id, e.target.files[0])} 
                />
              </div>
              {value instanceof File ? 
                <p className="text-xs text-gray-500">{value.name} ({(value.size / 1024).toFixed(2)} KB)</p> 
                :
                <p className="text-xs text-gray-500">atau seret & lepas</p>
              }
            </div>
          </label>
        );
      case 'url':
        return <input type="url" value={typeof value === 'string' ? value : ''} onChange={(e) => handleInputChange(field.id, e.target.value)} placeholder="https://..." className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md p-2" />;
      case 'text':
      default:
        return <input type="text" value={typeof value === 'string' ? value : ''} onChange={(e) => handleInputChange(field.id, e.target.value)} className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md p-2" />;
    }
  }

  return (
    <div className="py-10 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary">Pengumpulan Bukti</h1>
            <p className="text-gray-600 mt-2">Satu langkah lagi untuk menyelesaikan misi: {offer.title}</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg text-gray-800 mb-6">
            <h3 className="font-semibold">Instruksi Pengumpulan:</h3>
            <p>{offer.submissionRequirement || 'Tidak ada instruksi spesifik.'}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {offer.submissionFields && offer.submissionFields.map(field => (
                <div key={field.id}>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <button 
                type="submit"
                className="w-full text-center bg-accent hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Kirim Bukti <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MisiSubmissionPage;