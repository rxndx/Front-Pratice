import React, { useState } from 'react';
import { useFormik } from "formik";
import { waiterValidationSchema } from "../components/WaiterValidationSchema";
import { renderError } from "../components/ValidationError";

export function WaitersItem({ waiter, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: waiter.firstName,
            phone: waiter.phone,
        },
        validationSchema: waiterValidationSchema,
        onSubmit: (values) => {
            if (formik.isValid) {
                onEdit(waiter.id, values);
                setIsEditing(false);
            }
        },
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <tr>
            <td>{waiter.id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                ) : (
                    waiter.firstName
                )}
                {isEditing && renderError(formik.errors, formik.touched, 'firstName')}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                ) : (
                    waiter.phone
                )}
                {isEditing && renderError(formik.errors, formik.touched, 'phone')}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <button type="submit">Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEditClick}>Edit</button>
                        <button onClick={() => onDelete(waiter.id)}>Delete</button>
                    </>
                )}
            </td>
        </tr>
    );
}