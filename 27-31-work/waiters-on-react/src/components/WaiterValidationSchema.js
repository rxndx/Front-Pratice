import * as Yup from 'yup';

const PHONE_TEMPLATE_REGEXP = /^\d{3}-\d{2}-\d{2}$/

export const waiterValidationSchema = Yup.object().shape({
    firstName: Yup.string().min(3).required('First Name is required'),
    phone: Yup.string()
        .matches(
            PHONE_TEMPLATE_REGEXP,
            'Phone must match the format: XXX-XX-XX'
        )
        .required('Phone is required'),
});
