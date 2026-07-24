import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function PlatsList({ plats, isLoading, error, onDelete }) {
  return (
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
              <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(plat.id)}>
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
  );
}

const styles = StyleSheet.create({
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
  foodImagePlaceholder: { height: 120, backgroundColor: '#FFF3EE', alignItems: 'center', justifyContent: 'center', position: 'relative' },
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