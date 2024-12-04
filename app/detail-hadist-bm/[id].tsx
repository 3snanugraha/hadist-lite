import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useHadith } from '@/hooks/useHadith';
import { Hadith } from '@/types/hadith';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ArabicTextViewer } from '@/components/ArabicTextViewer';

export default function HadithDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { loading, error, getBulughulHadith, getRandomBulughulHadith } = useHadith();
  const [hadith, setHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    loadHadith();
  }, [id]);

  const loadHadith = async () => {
    if (!id) return;
    
    let result;
    if (id === 'acak') {
      result = await getRandomBulughulHadith();
    } else {
      result = await getBulughulHadith(Number(id));
    }
    
    if (result) {
      setHadith(result);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading hadith...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
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
        <ArabicTextViewer 
          text={hadith.arab} 
          fontSize={24}
          textAlign="right"
        />
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  contentContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 1,
    minHeight: 500,
  },
  arabicContainer: {
    flex: 1,
    marginVertical: 16,
    paddingVertical: 16,
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
  translationText: {
    color: '#004D40',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  }
});
