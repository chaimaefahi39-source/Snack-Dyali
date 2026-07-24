import { useQuery } from '@tanstack/react-query';
import { getPlats } from './api';

export const useGetPlats = () => {
  return useQuery({
    queryKey: ['plats'],
    queryFn: getPlats,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['plats'],
    queryFn: getPlats,
    select: (plats) => {
      const categories = plats ? plats.map(plat => plat.categorie) : [];
      const uniqueCategories = [...new Set(categories)];
      // Ensure default categories are present
      if (!uniqueCategories.includes('Fast Food')) uniqueCategories.push('Fast Food');
      if (!uniqueCategories.includes('Boissons')) uniqueCategories.push('Boissons');
      return uniqueCategories;
    }
  });
};
