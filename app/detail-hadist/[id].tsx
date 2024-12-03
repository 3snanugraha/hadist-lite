import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter  } from 'expo-router';
import { useHadith } from '@/hooks/useHadith';
import { Hadith } from '@/types/hadith';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function HadithDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { loading, error, getArbainHadith, getRandomArbainHadith, getRandomBulughulHadith, getBulughulHadith } = useHadith();
  const [hadith, setHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    loadHadith();
  }, [id]);

  const loadHadith = async () => {
    if (!id) return;
    
    let result;
    if (id === 'acak') {
      // Determine which collection to use based on route or state
      const isArbain = true; // Add logic to determine collection
      result = isArbain ? 
        await getRandomArbainHadith() : 
        await getRandomBulughulHadith();
    } else {
      // Determine which collection to use based on route or state
      const isArbain = true; // Add logic to determine collection
      result = isArbain ? 
        await getArbainHadith(Number(id)) : 
        await getBulughulHadith(Number(id));
    }
    
    if (result) {
      setHadith(result);
    }
  };
  
  

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading hadith...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!hadith) return null;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <LinearGradient
        colors={['#ffffff', '#f5f5f5']}
        style={styles.contentContainer}
      >
        <Text style={styles.hadithNumber}>Hadith #{id}</Text>
        <Text style={styles.title}>{hadith.judul}</Text>
        <Text style={styles.arabicText}>{hadith.arab}</Text>
        <Text style={styles.translationText}>{hadith.indo}</Text>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004D40',
  },
  backButton: {
    position: 'relative',
    top: 16,
    left: 16,
    zIndex: 1,
    marginBottom: 4,
    padding: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  hadithNumber: {
    color: '#004D40',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    color: '#004D40',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  arabicText: {
    color: '#004D40',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'right',
    marginBottom: 16,
  },
  translationText: {
    color: '#004D40',
    fontSize: 16,
    lineHeight: 24,
  },
});