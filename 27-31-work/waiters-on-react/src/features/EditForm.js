import React  from 'react';
import { Formik, Field } from 'formik';
import { waiterValidationSchema } from "../components/WaiterValidationSchema";
import { ValidationError } from "../components/ValidationError";

export function EditWaiterForm({ onWaiterSubmit }) {
    const initialValues = {
        firstName: '',
        phone: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        onWaiterSubmit(values);
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={waiterValidationSchema}
            onSubmit={handleSubmit}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                    />
                    <ValidationError name="firstName" touched={formik.touched} />

                    <label htmlFor="phone">Phone</label>
                    <Field
                        type="text"
                        id="phone"
                        name="phone"
                    />
                    <ValidationError name="phone" touched={formik.touched} />

                    <button type="submit">Add Waiter</button>
                </form>
            )}
        </Formik>
    );
}