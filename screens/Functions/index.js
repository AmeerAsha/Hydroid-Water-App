import React from 'react';
import { View, Button, Alert, Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs access to Storage data.',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};

const createPDF = async () => {
  const options = {
    html: '<h1>PDF Test</h1><p>This is a test PDF document.</p>',
    fileName: 'test',
    directory: 'Documents',
  };

  if (Platform.OS === 'android') {
    const hasPermission = await requestExternalWritePermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'You need to give storage permission to download the PDF.');
      return;
    }
  }

  try {
    const pdf = await RNHTMLtoPDF.convert(options);
    Alert.alert('PDF Generated', `PDF saved to: ${pdf.filePath}`);

    if (Platform.OS === 'android') {
      const destPath = `${RNFS.DownloadDirectoryPath}/test.pdf`;
      await RNFS.moveFile(pdf.filePath, destPath);
      Alert.alert('PDF Moved', `PDF moved to: ${destPath}`);
    } else {
      // Handle iOS case if needed
    }
  } catch (error) {
    Alert.alert('Error', `Failed to generate PDF: ${error.message}`);
    console.error(error);
  }
};

const Functions = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Create PDF" onPress={createPDF} />
    </View>
  );
};

export default Functions;
