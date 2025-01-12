import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import {
  Calendar,
  MapPin,
  Edit3,
  List,
  FileText,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

import { eventValidationSchema } from '@/validation/eventValidation';

const EventForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(eventValidationSchema) });

  return (
    <div>
      <div className="bg-gray-100 border border-emerald-200 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Create New Event
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in the details to create an event
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Event Details Section */}
          <div className="space-y-4">
            <div className="relative">
              <FileText
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                {...register('title')}
                placeholder="Event Title"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {errors.title && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="relative">
              <Edit3
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <textarea
                {...register('description')}
                placeholder="Event Description"
                rows="4"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {errors.description && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          {/* Event Schedule Section */}
          <div className="space-y-4">
            <div className="relative">
              <Calendar
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                type="datetime-local"
                {...register('date')}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {errors.date && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.date.message}
                </span>
              )}
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <div className="relative">
              <MapPin
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                {...register('location')}
                placeholder="Event Location"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              />
              {errors.location && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.location.message}
                </span>
              )}
            </div>
          </div>

          {/* Category Section */}
          <div className="space-y-4">
            <div className="relative">
              <List className="absolute top-3 left-3 text-gray-400" size={20} />
              <select
                {...register('category')}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent transition duration-200`}
              >
                <option value="">Select Category</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Academic">Academic</option>
              </select>
              {errors.category && (
                <span className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <span>Creating event...</span>
              ) : (
                <>
                  Create Event
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default EventForm;
