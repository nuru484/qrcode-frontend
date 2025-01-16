import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/api';

const QRScanner = () => {
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState('');
  const [html5QrCode, setHtml5QrCode] = useState(null);

  useEffect(() => {
    const qrScanner = new Html5Qrcode('reader');
    setHtml5QrCode(qrScanner);

    return () => {
      if (qrScanner.isScanning) {
        qrScanner.stop();
      }
      qrScanner.clear();
    };
  }, []);

  const startScanning = async () => {
    try {
      setScanning(true);
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          setQrData(decodedText);
          handleQRData(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          console.warn('QR scan error:', errorMessage);
        }
      );
    } catch (err) {
      setError(
        'Unable to start scanning. Please ensure camera permissions are granted.'
      );
      console.error('Scanning error:', err);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (html5QrCode && html5QrCode.isScanning) {
      html5QrCode.stop().then(() => setScanning(false));
    }
  };

  const handleQRData = async (data) => {
    try {
      const response = await api.post('/attendance', data);

      console.log('QR code processed:', response);
    } catch (err) {
      setError('Failed to process QR code. Please try again.');
      console.error('API error:', err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-6 h-6" />
          QR Code Scanner
        </CardTitle>
        <p>Scan to mark your attendance.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {qrData && (
            <Alert variant="success">
              <AlertDescription>Detected QR Data: {qrData}</AlertDescription>
            </Alert>
          )}

          <div
            id="reader"
            className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
          ></div>

          <div className="flex justify-center">
            {!scanning ? (
              <Button
                onClick={startScanning}
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                Start Scanning
              </Button>
            ) : (
              <Button
                onClick={stopScanning}
                variant="destructive"
                className="w-full"
              >
                Stop Scanning
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
