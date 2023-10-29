export const showModal = (setIsModalVisible, form, setIsEditing, setInitialFormData) => {
    setIsModalVisible(true);
    form.resetFields();
    setIsEditing(false);
    setInitialFormData({});
};

export const handleCancel = (setIsModalVisible) => {
    setIsModalVisible(false);
};

export const handleEdit = (data, setIsModalVisible, form, setIsEditing, setInitialFormData) => {
    setIsModalVisible(true);
    form.setFieldsValue(data);
    setIsEditing(true);
    setInitialFormData(data);
};

export const handleDelete = async (id, dispatch, tableSlice) => {
    await dispatch(tableSlice.deleteItem(id));
};

export const handleSaveError = (setSaveError) => {
    setSaveError(true);
};

export const handleSaveSuccess = (setSaveError) => {
    setSaveError(false);
};