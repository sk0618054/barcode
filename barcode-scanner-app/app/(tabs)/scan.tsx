import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

export default function ScanScreen() {
  // Allow hasPermission to be either null or a boolean
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  // Properly type the handleBarCodeScanned function
  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    setBarcodeData(data);
    alert(`Barcode type: ${type}\nData: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
      {barcodeData && (
        <Text style={styles.barcodeText}>Scanned Data: {barcodeData}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeText: {
    fontSize: 18,
    margin: 10,
  },
});
