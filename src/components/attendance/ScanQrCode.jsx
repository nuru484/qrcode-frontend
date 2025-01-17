import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMarkAttendance } from '@/hooks/useAttendance';

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [html5QrCode, setHtml5QrCode] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    mutate: markAttendance,
    isPending,
    isError,
    error,
  } = useMarkAttendance();

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
      const config = { fps: 10 };

      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          handleQRData(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          console.warn('QR scan error:', errorMessage);
        }
      );
    } catch (err) {
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
    markAttendance(data, {
      onSuccess: () => {
        setSuccess(true);
      },
    });
  };

  useEffect(() => {
    let successTimer;
    if (success) {
      successTimer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(successTimer);
  }, [success]);

  useEffect(() => {
    let errorTimer;
    if (isError) {
      setShowError(true);
      errorTimer = setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    return () => clearTimeout(errorTimer);
  }, [isError]);

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
          {showError && (
            <Alert variant="destructive">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {isPending && (
            <Alert variant="success">
              <AlertDescription>Marking Attendance...</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="success" className="border border-emerald-600">
              <AlertDescription>
                Attendance Marked Successfully.
              </AlertDescription>
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
