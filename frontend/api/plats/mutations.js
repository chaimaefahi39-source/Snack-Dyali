import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPlat, deletePlat } from './api';

export const useAddPlat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPlat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plats'] });
      alert('Plat ajouté avec succès ! 🎉');
    },
    onError: (err) => {
      console.error(err);
      alert("Erreur lors de l'ajout. Vérifiez que le Backend est allumé !");
    },
  });
};

export const useDeletePlat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plats'] });
      alert('Plat supprimé ! 🗑️');
    },
    onError: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression");
    },
  });
};
