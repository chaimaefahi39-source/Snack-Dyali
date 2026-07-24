import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useGetPlats } from '../api/plats/queries';
import { useDeletePlat } from '../api/plats/mutations';
import PlatsList from '../components/PlatsList';

export default function HomeScreen() {
  const router = useRouter();
  const { data: plats, isLoading, error } = useGetPlats();
  const deletePlatMutation = useDeletePlat();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#dd6235" />
      <View style={styles.heroHeader}>
        <View>
          <Text style={styles.brandTitle}>Snack Dyali ✨</Text>
          <Text style={styles.brandTagline}>Gestion du menu en temps réel</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => router.push('/create')}
        >
          <Text style={styles.addButtonText}>＋ Ajouter</Text>
        </TouchableOpacity>
      </View>
      <PlatsList 
        plats={plats} 
        isLoading={isLoading} 
        error={error} 
        onDelete={(id) => deletePlatMutation.mutate(id)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
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
  addButton: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16 },
  addButtonText: { color: '#FF6B35', fontWeight: 'bold', fontSize: 14 },
});
