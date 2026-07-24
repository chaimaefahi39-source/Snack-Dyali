import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAddPlat } from '../api/plats/mutations';
import PlatForm from '../components/PlatForm';

export default function CreateScreen() {
  const router = useRouter();
  const addPlatMutation = useAddPlat();

  const handleAddPlat = (data, resetForm) => {
    addPlatMutation.mutate(data, {
      onSuccess: () => {
        resetForm();
        router.back();
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Nouveau Plat</Text>
          <Text style={styles.subtitle}>Ajoutez un plat au menu de Snack Dyali</Text>
        </View>

        <PlatForm 
          onSubmit={handleAddPlat} 
          isPending={addPlatMutation.isPending} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { paddingVertical: 16 },
  header: { marginHorizontal: 20, marginTop: 20, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2D2D2D' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4 },
});
