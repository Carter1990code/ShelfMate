
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';

export default function HomeScreen() {
  const [height, setHeight] = useState('2129');
  const [shelfCount, setShelfCount] = useState('6');
  const [thickness, setThickness] = useState('18');

  const h = Number(height);
  const n = Number(shelfCount);
  const t = Number(thickness);

  const valid =
    height.trim() !== '' &&
    shelfCount.trim() !== '' &&
    thickness.trim() !== '' &&
    Number.isFinite(h) &&
    Number.isInteger(n) &&
    n >= 1 &&
    n <= 50 &&
    h > 0 &&
    t > 0 &&
    h > n * t;

  const opening = valid ? (h - n * t) / (n + 1) : 0;

  const measurements = valid
    ? Array.from({ length: n }, (_, i) =>
        Math.round((i + 1) * opening + i * t)
      )
    : [];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>SHELFMATE</Text>
        <Text style={styles.subtitle}>
          Your kitchen fitting calculator
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Internal cupboard height (mm)
          </Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            selectTextOnFocus
          />

          <Text style={styles.label}>Number of shelves</Text>
          <TextInput
            style={styles.input}
            value={shelfCount}
            onChangeText={setShelfCount}
            keyboardType="numeric"
            selectTextOnFocus
          />

          <Text style={styles.label}>Shelf thickness (mm)</Text>
          <TextInput
            style={styles.input}
            value={thickness}
            onChangeText={setThickness}
            keyboardType="numeric"
            selectTextOnFocus
          />
        </View>

        {valid ? (
          <>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>
                EQUAL CLEAR OPENING
              </Text>
              <Text style={styles.result}>
                {opening.toFixed(2)} mm
              </Text>
              <Text style={styles.note}>
                {n + 1} compartments · {n} shelves
              </Text>
            </View>

            <Text style={styles.heading}>
              Shelf measurements
            </Text>
            <Text style={styles.help}>
              Measure upwards from the bottom of the cupboard.
            </Text>

            {measurements.map((measurement, index) => (
              <View style={styles.row} key={index}>
                <View style={styles.number}>
                  <Text style={styles.numberText}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={styles.shelfLabel}>
                  Shelf {index + 1}
                </Text>
                <Text style={styles.measurement}>
                  {measurement} mm
                </Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.error}>
            Enter a valid cupboard height, shelf count and
            shelf thickness.
          </Text>
        )}

        <Text style={styles.footer}>
          Measure twice. Fit once.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F3F5F2',
  },
  container: {
    padding: 22,
    paddingTop: 35,
    paddingBottom: 45,
  },
  brand: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 3,
    color: '#234638',
  },
  subtitle: {
    fontSize: 15,
    color: '#64746B',
    marginTop: 5,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34483C',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F3F5F2',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 20,
    color: '#1D3026',
    borderWidth: 1,
    borderColor: '#DCE4DD',
  },
  resultCard: {
    backgroundColor: '#234638',
    borderRadius: 18,
    padding: 22,
    marginBottom: 25,
  },
  resultLabel: {
    color: '#D5E6D9',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  result: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 8,
  },
  note: {
    color: '#D5E6D9',
    fontSize: 14,
    marginTop: 8,
  },
  heading: {
    color: '#234638',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  help: {
    color: '#64746B',
    fontSize: 13,
    marginBottom: 14,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  number: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#E5EEE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#234638',
    fontWeight: '800',
  },
  shelfLabel: {
    flex: 1,
    color: '#34483C',
    fontSize: 15,
    fontWeight: '600',
  },
  measurement: {
    color: '#234638',
    fontSize: 18,
    fontWeight: '800',
  },
  error: {
    color: '#B42318',
    fontSize: 15,
    padding: 12,
  },
  footer: {
    textAlign: 'center',
    color: '#819087',
    marginTop: 28,
    fontSize: 12,
  },
});
