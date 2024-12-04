import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useHadith } from '@/hooks/useHadith';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function PerawiScreen() {
  const router = useRouter();
  const { loading, error, getPerawiList } = useHadith();
  const [perawiList, setPerawiList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = Dimensions.get('window');

  useEffect(() => {
    loadPerawiList();
  }, []);

  const loadPerawiList = async () => {
    const result = await getPerawiList();
    if (result) {
      setPerawiList(result);
    }
  };
  const acak = 'Hadits ';

  const filteredPerawi = perawiList.filter(perawi =>
    perawi.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPerawiItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.menuItem, { width: width - 32 }]}
      onPress={() => router.push(`/detail-hadist-perawi/${item.slug}`)}
    >
      <LinearGradient
        colors={['#ffffff', '#f5f5f5']}
        style={styles.menuGradient}
      >
        <MaterialIcons name="book" size={40} color="#004D40" />
        <View style={styles.menuContent}>
          <Text style={[styles.menuTitle, { color: '#004D40' }]}>{item.name}</Text>
          <Text style={[styles.menuDescription, { color: '#004D40' }]}>Total Hadits: {item.total}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={30} color="#004D40" />
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
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
          placeholder="Cari perawi..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
        <TouchableOpacity 
          style={styles.randomButton}
          onPress={() => router.push(`/detail-hadist-perawi/${acak}/acak`)}
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
        data={filteredPerawi}
        renderItem={renderPerawiItem}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004D40',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#004D40',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004D40',
  },
  listContainer: {
    padding: 16,
    alignItems: 'center',
  },
  menuItem: {
    marginBottom: 16,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  menuContent: {
    flex: 1,
    marginLeft: 15,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuDescription: {
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  }
});