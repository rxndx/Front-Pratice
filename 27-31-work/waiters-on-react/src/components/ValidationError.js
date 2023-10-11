import React from 'react';
import { ErrorMessage } from 'formik';

export function renderError(errors, touched, fieldName) {
    return errors[fieldName] && touched[fieldName] ? <div className="error" style={{ color: 'red' }}>{errors[fieldName]}</div> : null;
}

export function ValidationError ({ name }) {
    return <ErrorMessage style={{ color: 'red' }} component='div' name={name} />
}