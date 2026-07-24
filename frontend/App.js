import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient();
const API_URL = 'http://localhost:3000/api/plats';
const { width } = Dimensions.get('window');

function PlatsManager() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('Fast Food');

  const { data: plats, isLoading, error } = useQuery({
    queryKey: ['plats'],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });

  const addPlatMutation = useMutation({
    mutationFn: async (newPlat) => {
      const response = await axios.post(API_URL, newPlat);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plats'] });
      alert('Plat ajouté avec succès ! ');
      setNom('');
      setPrix('');
      setShowForm(false);
    },
    onError: (err) => {
      console.error(err);
      alert("Erreur lors de l'ajout: " + (err.response?.data?.message || err.message));
    }
  });

  const deletePlatMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plats'] });
    },
    onError: (err) => {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  });

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault(); 
    
    if (!nom || !prix) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    addPlatMutation.mutate({ 
      nom: nom.trim(), 
      prix: parseFloat(prix), 
      categorie 
    });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.heroHeader}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.brandTitle}>Snack Dyali ✨</Text>
          <Text style={styles.brandTagline}>Gestion du menu en temps réel</Text>
        </View>
        <TouchableOpacity style={styles.toggleFormButton} onPress={() => setShowForm(!showForm)}>
          <Text style={styles.toggleFormButtonText}>{showForm ? '✕' : '＋ Ajouter'}</Text>
        </TouchableOpacity>
      </View>

      {showForm && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Ajouter un nouveau plat</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nom du plat (ex: Tacos double)" 
            value={nom} 
            onChangeText={setNom} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Prix (DH)" 
            keyboardType="numeric" 
            value={prix} 
            onChangeText={setPrix} 
          />
          <View style={styles.formCategoryRow}>
            <TouchableOpacity 
              style={[styles.miniTab, categorie === 'Fast Food' && styles.activeMiniTab]} 
              onPress={() => setCategorie('Fast Food')}
            >
              <Text style={[styles.miniTabText, categorie === 'Fast Food' && styles.activeMiniTabText]}>Fast Food</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.miniTab, categorie === 'Boissons' && styles.activeMiniTab]} 
              onPress={() => setCategorie('Boissons')}
            >
              <Text style={[styles.miniTabText, categorie === 'Boissons' && styles.activeMiniTabText]}>Boissons</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={(e) => handleSubmit(e)}>
            <Text style={styles.submitButtonText}>
              {addPlatMutation.isPending ? 'Enregistrement...' : 'Enregistrer le plat'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        {isLoading && <Text style={styles.statusText}>Chargement du menu...</Text>}
        {error && <Text style={styles.errorText}>Erreur de connexion.</Text>}

        <View style={styles.gridRow}>
          {plats && plats.map((plat) => (
            <View key={plat.id} style={styles.gridCard}>
              <View style={styles.foodImagePlaceholder}>
                <Text style={styles.foodEmoji}>
                  {plat.categorie === 'Boissons' ? '🥤' : '🌮'}
                </Text>
                
                <TouchableOpacity 
                  style={styles.deleteButton} 
                  onPress={() => deletePlatMutation.mutate(plat.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.platNom} numberOfLines={1}>{plat.nom}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.platPrix}>{plat.prix} <Text style={styles.currencyText}>DH</Text></Text>
                  <Text style={styles.platCategoryTag}>{plat.categorie}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#dd6235" />
        <PlatsManager />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flex: 1 },
  heroHeader: {
    backgroundColor: '#dd6235',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTitle: { fontSize: 28, fontWeight: '900', color: '#FFFFFF' },
  brandTagline: { fontSize: 13, color: '#FFE0D3', marginTop: 4 },
  toggleFormButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  toggleFormButtonText: { color: '#FF6B35', fontWeight: 'bold', fontSize: 14 },
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
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  formCategoryRow: { flexDirection: 'row', marginBottom: 15 },
  miniTab: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12, backgroundColor: '#EFEFEF', marginRight: 8 },
  activeMiniTab: { backgroundColor: '#FF6B35' },
  miniTabText: { fontSize: 12, color: '#666', fontWeight: '600' },
  activeMiniTabText: { color: '#FFF' },
  submitButton: { backgroundColor: '#FF6B35', padding: 14, borderRadius: 12, alignItems: 'center' },
  submitButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  gridContainer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 40 },
  gridRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: {
    backgroundColor: '#FFFFFF',
    width: (width - 48) / 2,
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  foodImagePlaceholder: {
    height: 120,
    backgroundColor: '#FFF3EE',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  foodEmoji: { fontSize: 45 },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: { fontSize: 14 },
  cardBody: { padding: 14 },
  platNom: { fontSize: 15, fontWeight: '700', color: '#2D2D2D' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  platPrix: { fontSize: 16, fontWeight: '800', color: '#2D2D2D' },
  currencyText: { fontSize: 11, color: '#FF6B35', fontWeight: '700' },
  platCategoryTag: { fontSize: 10, color: '#888', fontWeight: '600' },
  statusText: { textAlign: 'center', marginTop: 40, color: '#888', width: '100%' },
  errorText: { textAlign: 'center', marginTop: 40, color: '#FF4D4D', width: '100%' },
});