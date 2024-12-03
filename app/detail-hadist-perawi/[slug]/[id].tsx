import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function HadithDetail() {
  const { slug, id } = useLocalSearchParams();
  
  return (
    <View>
      <Text>Hadith Detail for {slug} #{id}</Text>
    </View>
  );
}
