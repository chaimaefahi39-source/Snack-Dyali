import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetCategories } from '../api/plats/queries';

const platSchema = z.object({
  nom: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom est trop long"),
  prix: z.string()
    .min(1, "Le prix est obligatoire")
    .refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: "Le prix doit être un nombre supérieur à 0",
    }),
  categorie: z.string().min(1, "Veuillez choisir une catégorie"),
});

export default function PlatForm({ onSubmit, isPending }) {
  const { data: categories = ['Fast Food', 'Boissons'] } = useGetCategories();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(platSchema),
    defaultValues: {
      nom: '',
      prix: '',
      categorie: 'Fast Food',
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit({
      nom: data.nom,
      prix: parseFloat(data.prix),
      categorie: data.categorie
    }, () => reset());
  };

  return (
    <View style={styles.formCard}>
      <Text style={styles.formTitle}>Ajouter un nouveau plat</Text>

      <Controller
        control={control}
        name="nom"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nom du plat (ex: Tacos double)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nom && <Text style={styles.errorText}>{errors.nom.message}</Text>}

      <Controller
        control={control}
        name="prix"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Prix (DH)"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.prix && <Text style={styles.errorText}>{errors.prix.message}</Text>}

      <Controller
        control={control}
        name="categorie"
        render={({ field: { onChange, value } }) => (
          <View style={styles.formCategoryRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.miniTab, value === cat && styles.activeMiniTab]}
                onPress={() => onChange(cat)}
              >
                <Text style={[styles.miniTabText, value === cat && styles.activeMiniTabText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {errors.categorie && <Text style={styles.errorText}>{errors.categorie.message}</Text>}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(handleFormSubmit)} disabled={isPending}>
        <Text style={styles.submitButtonText}>
          {isPending ? 'Enregistrement...' : 'Enregistrer le plat'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#2D2D2D', marginBottom: 15 },
  input: { backgroundColor: '#F5F5F5', padding: 12, borderRadius: 12, marginBottom: 12, fontSize: 14 },
  formCategoryRow: { flexDirection: 'row', marginBottom: 15 },
  miniTab: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, backgroundColor: '#EFEFEF', marginRight: 8 },
  activeMiniTab: { backgroundColor: '#FF6B35' },
  miniTabText: { fontSize: 12, color: '#666', fontWeight: '600' },
  activeMiniTabText: { color: '#FFF' },
  submitButton: { backgroundColor: '#FF6B35', padding: 14, borderRadius: 12, alignItems: 'center' },
  submitButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  errorText: { color: '#FF4D4D', fontSize: 12, marginBottom: 8, marginTop: -8, marginLeft: 4 },
});
