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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useHadith } from '@/hooks/useHadith';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ArabicTextViewer } from '@/components/ArabicTextViewer';

export default function HadithListByPerawi() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { loading, error, getHadithByPerawi } = useHadith();
  const [hadithList, setHadithList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [indexedHadith, setIndexedHadith] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadInitialHadith();
    indexAllHadith();
  }, []);

  const loadInitialHadith = async () => {
    const initialHadiths = await loadHadith(1);
    setHadithList(initialHadiths);
  };

  const indexAllHadith = async () => {
    const allHadithPromises = Array.from({ length: 42 }, (_, i) => 
      getHadithByPerawi(String(slug), i + 1)
    );
    const results = await Promise.all(allHadithPromises);
    const validResults = results.filter((h) => h !== null);
    setIndexedHadith(validResults);
  };

  const loadHadith = async (pageNumber: number) => {
    const startIdx = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    
    const hadithPromises = Array.from(
      { length: ITEMS_PER_PAGE }, 
      (_, i) => getHadithByPerawi(String(slug), startIdx + i + 1)
    );
    
    const results = await Promise.all(hadithPromises);
    return results.filter((h) => h !== null);
  };

  const loadMore = async () => {
    if (loadingMore) return;
    
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
      hadith.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, indexedHadith, hadithList]);

  const renderHadithItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.hadithCard}
      onPress={() => router.push(`/detail-hadist-perawi/${slug}/${item.number}`)}
    >
      <LinearGradient
        colors={['#ffffff', '#f5f5f5']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.hadithNumber}>Hadith #{item.number}</Text>
          <MaterialIcons name="chevron-right" size={24} color="#004D40" />
        </View>
        <ArabicTextViewer 
          text={item.arab} 
          fontSize={22}
          numberOfLines={2}
        />
        <Text style={styles.translationText} numberOfLines={3}>
          {item.id}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator size="large" color="#fff" />;
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
        {searchQuery ? (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <MaterialIcons name="clear" size={24} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Kumpulan Hadits {typeof slug === 'string' ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : ''}
        </Text>
      </View>

      <FlatList
        data={filteredHadith}
        renderItem={renderHadithItem}
        keyExtractor={(item, index) => `${item.number}-${index}`}
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
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
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
  translationText: {
    color: '#004D40',
    fontSize: 14,
    marginTop: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  }
});
