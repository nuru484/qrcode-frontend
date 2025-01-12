import * as yup from 'yup';

export const eventValidationSchema = yup.object({
  title: yup
    .string()
    .required('Event title is required')
    .min(4, 'Title must be at least 4 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  date: yup
    .date()
    .required('Date is required')
    .min(new Date(), 'Date cannot be in the past'),
  location: yup
    .string()
    .required('Location is required')
    .min(5, 'Location must be at least 5 characters'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(
      ['Sports', 'Music', 'Arts', 'Academic'],
      'Invalid category selected'
    ),
});
