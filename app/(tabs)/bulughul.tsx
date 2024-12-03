import { useEffect, useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useHadith } from '@/hooks/useHadith';
import { Hadith } from '@/types/hadith';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BulughulScreen() {
  const router = useRouter();
  const { loading, error, getBulughulHadith } = useHadith();
  const [hadithList, setHadithList] = useState<Hadith[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [indexedHadith, setIndexedHadith] = useState<Hadith[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    loadInitialHadith();
    indexAllHadith();
  }, []);

  const loadInitialHadith = async () => {
    const initialHadiths = await loadHadith(1);
    setHadithList(initialHadiths);
  };

  const indexAllHadith = async () => {
    const allHadithPromises = Array.from({ length: 1597 }, (_, i) => 
      getBulughulHadith(i + 1)
    );
    const results = await Promise.all(allHadithPromises);
    const validResults = results.filter((h): h is Hadith => h !== null);
    setIndexedHadith(validResults);
  };

  const loadHadith = async (pageNumber: number) => {
    const startIdx = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, 1597);
    
    const hadithPromises = Array.from(
      { length: endIdx - startIdx }, 
      (_, i) => getBulughulHadith(startIdx + i + 1)
    );
    
    const results = await Promise.all(hadithPromises);
    return results.filter((h): h is Hadith => h !== null);
  };

  const loadMore = async () => {
    if (loadingMore || hadithList.length >= 1597) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    const moreHadiths = await loadHadith(nextPage);
    
    setHadithList(prev => [...prev, ...moreHadiths]);
    setPage(nextPage);
    setLoadingMore(false);
  };

  const filteredHadith = useMemo(() => {
    if (!searchQuery) return hadithList;
    return indexedHadith.filter(hadith => 
      hadith.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.indo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, indexedHadith, hadithList]);

  const handleHadithPress = (hadith: Hadith) => {
    router.push(`/detail-hadist/${hadith.no}`);
  };

  const renderHadithItem = ({ item, index }: { item: Hadith; index: number }) => (
    <TouchableOpacity 
      style={styles.hadithCard}
      onPress={() => handleHadithPress(item)}
    >
      <LinearGradient
        colors={['#ffffff', '#f5f5f5']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.hadithNumber}>Hadist #{item.no || index + 1}</Text>
          <MaterialIcons name="chevron-right" size={24} color="#004D40" />
        </View>
        <Text style={styles.title}>{item.judul}</Text>
        <Text style={styles.arabicText} numberOfLines={2}>{item.arab}</Text>
        <Text style={styles.translationText} numberOfLines={3}>{item.indo}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator size="large" color="#fff" />;
    }
    
    if (hadithList.length < 1597) {
      return (
        <TouchableOpacity 
          style={styles.loadMoreButton}
          onPress={loadMore}
        >
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  if (loading && !loadingMore) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#fff" />
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Hadist..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
        <TouchableOpacity 
          style={styles.randomButton}
          onPress={() => router.push('/detail-hadist/acak')}
        >
          <MaterialIcons name="shuffle" size={24} color="#004D40" />
        </TouchableOpacity>
        {searchQuery ? (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <MaterialIcons name="clear" size={24} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filteredHadith}
        renderItem={renderHadithItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
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
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    elevation: 2,
  },
  randomButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
  },
  clearButton: {
    position: 'absolute',
    right: 24,
    padding: 8,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  hadithCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hadithNumber: {
    color: '#004D40',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: '#004D40',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  arabicText: {
    color: '#004D40',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'right',
  },
  translationText: {
    color: '#004D40',
    opacity: 0.9,
    fontSize: 14,
  },
  loadMoreButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  loadMoreText: {
    color: '#004D40',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  }
});
