import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Shield,
  IdCard,
  AlertCircle,
} from 'lucide-react';
import schema from '@/validation/signupValidation';
import PropTypes from 'prop-types';

const SignupForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 border border-emerald-200 rounded-2xl p-8 m-4 md:m-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Create your account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in your information to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  {...register('firstName')}
                  placeholder="First Name"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
                />
                {errors.firstName && (
                  <span className="text-sm text-red-500 mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="relative">
                <User
                  className="absolute top-3 left-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  {...register('lastName')}
                  placeholder="Last Name"
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
                />
                {errors.lastName && (
                  <span className="text-sm text-red-500 mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 border-b pb-2">
              Account Information
            </h3>
            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="text"
                {...register('username')}
                placeholder="Username"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {errors.username && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {errors.email && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 border-b pb-2">
              Set Password
            </h3>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {showPassword ? (
                <EyeOff
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-600 transition duration-200"
                  size={20}
                  onClick={() => togglePasswordVisibility('password')}
                />
              ) : (
                <Eye
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-600 transition duration-200"
                  size={20}
                  onClick={() => togglePasswordVisibility('password')}
                />
              )}
              {password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1"></div>
                </div>
              )}
              {errors.password && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="Confirm Password"
                className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {showConfirmPassword ? (
                <EyeOff
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-600 transition duration-200"
                  size={20}
                  onClick={() => togglePasswordVisibility('confirm')}
                />
              ) : (
                <Eye
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-600 transition duration-200"
                  size={20}
                  onClick={() => togglePasswordVisibility('confirm')}
                />
              )}
              {errors.confirmPassword && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 border-b pb-2">
              Additional Information
            </h3>
            <div className="relative">
              <Shield
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <select
                {...register('role')}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              >
                <option value="">Select Role</option>
                <option value="ADMIN">Admin</option>
                <option value="STUDENT">Student</option>
              </select>
              {errors.role && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.role.message}
                </span>
              )}
            </div>

            <div className="relative">
              <IdCard
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                {...register('identification')}
                placeholder="Identification"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.identification ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {errors.identification && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.identification.message}
                </span>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <span>Creating account...</span>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-500 hover:underline transition duration-200"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default SignupForm;
