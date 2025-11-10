import React from 'react';
import { CompanyProfile } from '../types';

interface CompanyCardProps {
  company: CompanyProfile;
  onSelectCompany: (companySlug: string) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSelectCompany }) => {
  return (
    <div 
      onClick={() => onSelectCompany(company.slug)} 
      className="bg-white rounded-lg shadow p-3 flex flex-col items-start space-y-2 transition duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full"
    >
      <div className="flex items-center w-full">
        <div className="w-12 h-12 bg-white border border-gray-100 rounded-md flex items-center justify-center p-1 mr-3 shrink-0">
            <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-secondary text-xs leading-tight truncate">{company.name}</h3>
          <p className="text-[10px] text-gray-500 font-medium mt-0.5">
            {company.jobsAvailable > 0 ? (
              <span className="text-primary">{company.jobsAvailable} Lowongan</span>
            ) : (
              'Belum ada lowongan'
            )}
          </p>
        </div>
      </div>
      <p className="text-[11px] text-gray-600 line-clamp-2 leading-snug overflow-hidden" style={{ maxHeight: '2.6rem' }}>{company.description}</p>
      <div className="w-full mt-auto text-right">
        <span className="text-gray-900 font-medium hover:text-gray-700 cursor-pointer transition text-[10px]">
          Lihat Detail
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
