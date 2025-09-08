import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function IDInfoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* University / School Header */}
        <Text style={styles.university}>University of Example</Text>
        <Text style={styles.subTitle}>Student Identification Card</Text>

        {/* Student Photo */}
        <Image
          source={{ uri: 'https://via.placeholder.com/120x120.png?text=Student+Photo' }}
          style={styles.image}
        />

        {/* Student Info */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}></Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Student ID:</Text>
          <Text style={styles.value}></Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Course:</Text>
          <Text style={styles.value}></Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Year Level:</Text>
          <Text style={styles.value}></Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Valid Until:</Text>
          <Text style={styles.value}></Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Authorized by: Registrar Office</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    padding: 20,
  },
  card: {
    width: 320,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  university: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 2,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  infoSection: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    width: 100,
    color: '#1e293b',
  },
  value: {
    flex: 1,
    color: '#111',
  },
  footer: {
    marginTop: 15,
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
});
