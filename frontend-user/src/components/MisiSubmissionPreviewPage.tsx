import React from 'react';
import { MisiCuanOffer, SubmissionField } from '../types';

interface MisiSubmissionPreviewPageProps {
  offer: MisiCuanOffer;
}

const MisiSubmissionPreviewPage: React.FC<MisiSubmissionPreviewPageProps> = ({ offer }) => {
  
  const renderField = (field: SubmissionField) => {
    switch (field.type) {
      case 'file':
        return (
          <label className="flex justify-center w-full min-h-[120px] px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-not-allowed bg-gray-50">
            <div className="space-y-1 text-center self-center">
              <i className="fas fa-cloud-upload-alt text-gray-400 fa-2x"></i>
              <div className="flex text-sm text-gray-600">
                <span className="relative rounded-md font-medium text-primary">
                  Pilih file
                </span>
              </div>
              <p className="text-xs text-gray-500">atau seret & lepas</p>
            </div>
          </label>
        );
      case 'url':
        return <input type="url" placeholder="https://..." disabled className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed" />;
      case 'text':
      default:
        return <input type="text" placeholder={`Input untuk "${field.label}"`} disabled className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed" />;
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
          
          <form>
            <div className="space-y-6">
              {offer.submissionFields && offer.submissionFields.map(field => (
                <div key={field.id}>
                   <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
              {(!offer.submissionFields || offer.submissionFields.length === 0) && (
                <p className="text-center text-gray-500">Tidak ada field input khusus untuk misi ini.</p>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <button 
                type="button"
                disabled
                className="w-full text-center bg-accent text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg bg-gray-400 cursor-not-allowed"
              >
                Kirim Bukti (Pratinjau) <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MisiSubmissionPreviewPage;
