import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const router = useRouter();
  const { width } = Dimensions.get('window');

  const menuItems = [
    {
      title: 'Hadits Arbain',
      description: 'Kumpulan 42 hadits pilihan Imam Nawawi',
      icon: 'collections-bookmark',
      route: '/arbain',
      gradient: ['#00796B', '#004D40'] as const
    },
    {
      title: 'Bulughul Maram',
      description: 'Kumpulan hadits hukum dari Ibnu Hajar',
      icon: 'book',
      route: '/bulughul',
      gradient: ['#00695C', '#004D40'] as const
    },
    {
      title: '9 Perawi Hadits',
      description: 'Kumpulan hadits dari 9 perawi utama',
      icon: 'people',
      route: '/perawi',
      gradient: ['#00897B', '#004D40'] as const
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/background.png')}
        style={styles.header}
      >
        <LinearGradient
          colors={['rgba(0,77,64,0.8)', 'rgba(0,77,64,0.95)'] as const}
          style={styles.headerOverlay}
        >
          <Text style={styles.title}>Hadist Lengkap</Text>
          <Text style={styles.subtitle}>Kumpulan Hadits Pilihan</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Arbain</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1596</Text>
              <Text style={styles.statLabel}>Bulughul</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>Perawi</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { width: width - 32 }]}
            onPress={() => router.push(item.route as any)}
          >
            <LinearGradient
              colors={item.gradient}
              style={styles.menuGradient}
            >
              <MaterialIcons name={item.icon as any} size={40} color="#fff" />
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={30} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 280,
  },
  headerOverlay: {
    padding: 20,
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  menuContainer: {
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
    color: '#fff',
  },
  menuDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
});