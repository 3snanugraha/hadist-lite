import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

interface ArabicTextViewerProps {
  text: string;
  fontSize?: number;
  textAlign?: 'right' | 'left' | 'center';
  numberOfLines?: number;
}

export function ArabicTextViewer({ 
  text, 
  fontSize = 18, 
  textAlign = 'right',
  numberOfLines
}: ArabicTextViewerProps) {
  const [webViewHeight, setWebViewHeight] = useState(50);
  
  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: transparent;
            height: auto;
          }
          .arabic-text {
            font-size: ${fontSize}px;
            text-align: ${textAlign};
            direction: rtl;
            line-height: 1.6;
            color: #004D40;
            font-family: 'Traditional Arabic', Arial;
            padding: 2px 16px;
            ${numberOfLines ? `-webkit-line-clamp: ${numberOfLines}; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;` : ''}
          }
        </style>
      </head>
      <body>
        <div class="arabic-text">${text}</div>
      </body>
      <script>
        const height = document.documentElement.scrollHeight;
        window.ReactNativeWebView.postMessage(height);
      </script>
    </html>
  `;

  const onMessage = (event: any) => {
    const height = Number(event.nativeEvent.data);
    setWebViewHeight(height);
  };

  return (
    <View style={[styles.container, { height: webViewHeight }]}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        originWhitelist={['*']}
        onMessage={onMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginVertical: 2,
  },
  webview: {
    backgroundColor: 'transparent',
    flex: 1,
  }
});
