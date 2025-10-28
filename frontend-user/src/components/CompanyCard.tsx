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
      className="bg-white rounded-lg shadow p-5 flex flex-col items-start space-y-4 transition duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full"
    >
      <div className="flex items-center w-full">
        <div className="w-16 h-16 bg-white border border-gray-100 rounded-md flex items-center justify-center p-1 mr-4 shrink-0">
            <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-secondary text-base leading-tight">{company.name}</h3>
          <p className="text-xs text-primary font-medium mt-1">{company.jobsAvailable > 0 ? `${company.jobsAvailable} Lowongan Tersedia` : 'Belum ada lowongan'}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 text-truncate-2 flex-grow">{company.description}</p>
      <button className="w-full mt-auto bg-primary/10 text-primary font-medium py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition text-sm">
        Lihat Lowongan
      </button>
    </div>
  );
};

export default CompanyCard;
