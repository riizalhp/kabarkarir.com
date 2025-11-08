
import React from 'react';
import { Category } from '../types';

interface CategoriesProps {
  onSelectCategory: (categoryName: string) => void;
  categories: Category[];
}

const CategoryCard: React.FC<{ category: Category; onSelectCategory: (categoryName: string) => void; }> = ({ category, onSelectCategory }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); onSelectCategory(category.name); }} className="bg-white rounded-lg shadow p-5 text-center transition duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className={`${category.iconBgColor} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
      <i className={`${category.icon} ${category.iconTextColor} text-xl`}></i>
    </div>
    <h3 className="text-secondary font-medium">{category.name}</h3>
    <p className="text-xs text-gray-500 mt-1">{category.count} Lowongan</p>
  </a>
);

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory, categories }) => {
  const educationLevels = ['SD', 'SMP', 'SMA/SMK', 'Diploma III', 'Strata 1'];

  return (
    <section className="pt-10 pb-4 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map(cat => <CategoryCard key={cat.name} category={cat} onSelectCategory={onSelectCategory} />)}
        </div>

        <div className="flex flex-wrap justify-center mt-2 gap-2">
          {educationLevels.map(level => (
            <a
              href="#"
              key={level}
              onClick={(e) => { e.preventDefault(); onSelectCategory(level); }}
              className="bg-white text-primary border border-primary py-2 px-4 rounded-full font-medium hover:bg-blue-50 transition inline-flex items-center text-sm"
            >
              <i className="fas fa-graduation-cap mr-2"></i> {level}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;