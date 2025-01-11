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

const SignupPage = () => {
  const { mutate: signup, isPending, isError, error } = useSignup();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    signup(data, {
      onSuccess: () => {
        setSuccess(true);
      },
    });
  };

  const handleRedirect = () => {
    navigate('/dashboard/STUDENT');
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto min-h-screen bg-gray-100 flex justify-center items-center gap-5">
        <div>
          <SignupForm onSubmit={onSubmit} isLoading={isPending} />
        </div>

        {isError && (
          <Alert className="border-red-600 mt-4 fixed top-2 text-black">
            <AlertDescription className="text-red-600">
              {error?.message}
            </AlertDescription>
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
