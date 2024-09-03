import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import PushNotification from 'react-native-push-notification';

const Functions = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    const pdfUrl = 'https://css4.pub/2015/icelandic/dictionary.pdf'; // Replace with your PDF URL
    const downloadDest = `${RNFS.DocumentDirectoryPath}/sample.pdf`;

    setIsDownloading(true);

    const options = {
      fromUrl: pdfUrl,
      toFile: downloadDest,
      background: true,
      begin: (res) => {
        console.log('Download started');
        showNotification(0);
      },
      progress: (res) => {
        let progress = Math.floor((res.bytesWritten / res.contentLength) * 100);
        showNotification(progress);
      },
    };

    try {
      const downloadResult = RNFS.downloadFile(options);
      const result = await downloadResult.promise;

      if (result.statusCode === 200) {
        console.log('File downloaded successfully:', downloadDest);
        PushNotification.localNotification({
          channelId: 'download-channel',
          title: 'Download Complete',
          message: 'Your PDF has been downloaded successfully.',
          autoCancel: true,
        });
        Alert.alert('Download Complete', 'PDF downloaded successfully.');
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Download Failed', 'There was an error downloading the PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const showNotification = (progress) => {
    PushNotification.localNotification({
      channelId: 'download-channel',
      title: 'Downloading PDF...',
      message: `Download progress: ${progress}%`,
      progress: progress, // Only on Android
      autoCancel: false, // Do not automatically cancel the notification
      ongoing: true, // Keep the notification ongoing
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Download PDF" onPress={downloadPDF} disabled={isDownloading} />
    </View>
  );
};

export default Functions;