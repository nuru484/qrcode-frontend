import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '@/hooks/useSignup';
import SignupForm from '@/components/SignupForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CircleAlert } from 'lucide-react';
import { useLogin } from '@/hooks/useAuth';
import encryptStorage from '@/lib/encryptedStorage';

const SignupPage = () => {
  const { mutate: signup, isPending, isError, error } = useSignup();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  const onSubmit = async (data) => {
    signup(data, {
      onSuccess: () => {
        setSuccess(true);

        const loginDetails = {
          username: data.username,
          password: data.password,
        };

        login(loginDetails, {
          onSuccess: (response) => {
            encryptStorage.setItem('jwtAccessToken', response.accessToken);
            encryptStorage.setItem('jwtRefreshToken', response.refreshToken);
          },
        });
      },
    });
  };

  const handleRedirect = () => {
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto min-h-screen bg-gray-100 flex justify-center items-center gap-5">
        <div>
          <SignupForm onSubmit={onSubmit} isLoading={isPending} />
        </div>

        {isError && (
          <Alert className="w-11/12 max-w-lg x-4 border-red-600 mt-8 fixed top-4">
            <div className="flex items-center gap-4">
              <CircleAlert color="#ff0000" />{' '}
              <AlertDescription className="text-red-600">
                {error?.message || 'An unexpected error occurred.'}
              </AlertDescription>
            </div>
          </Alert>
        )}

        {success && (
          <AlertDialog
            open={success}
            onOpenChange={() => {}}
            aria-live="assertive"
          >
            <AlertDialogContent>
              <AlertDialogTitle role="alert">
                Signup Successful
              </AlertDialogTitle>
              <AlertDialogDescription>
                Your signup was successful! Click &quot;Okay&quot; to proceed to
                your dashboard.
              </AlertDialogDescription>
              <AlertDialogAction
                className="bg-emerald-600 hover:bg-emerald-500"
                onClick={handleRedirect}
                aria-label="Proceed to Dashboard"
              >
                Okay
              </AlertDialogAction>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
