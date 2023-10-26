import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Modal, Form, Space, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import Navigation from '../../components/Navigation';
import generateSlice from '../../store/reducer';
import { waitersUrl } from '../../api/url';

const { Search } = Input;

const waiterSlice = generateSlice('waiters', waitersUrl);

function WaiterList() {
    const dispatch = useDispatch();
    const waiters = useSelector((state) => state.waiters.list);
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialFormData, setInitialFormData] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [saveError, setSaveError] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(waiterSlice.fetchItems());
    }, [dispatch]);

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const filterWaiters = (filter) => {
        if (!filter) {
            return waiters;
        }

        return waiters.filter((waiter) => {
            return waiter.firstName.toLowerCase().includes(filter.toLowerCase());
        });
    };

    const updateFilter = (value) => {
        navigate(`/waiters?filter=${value}`);
        setSearchValue('');
    };

    const clearFilter = () => {
        navigate('/waiters');
        setSearchValue('');
    };

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
        setIsEditing(false);
        setInitialFormData({});
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (isDuplicate(values)) {
                message.error("A waiter with the same name and phone number already exists.");
            } else {
                if (isEditing) {
                    dispatch(waiterSlice.updateItem(form.getFieldValue('id'), values));
                } else {
                    await dispatch(waiterSlice.createItem(values));
                }
                setIsModalVisible(false);
                handleSaveSuccess();
            }
        } catch (error) {
            handleSaveError();
        }
    };

    const isDuplicate = (newWaiter) => {
        return waiters.some(
            (waiter) =>
                waiter.firstName === newWaiter.firstName &&
                waiter.phone === newWaiter.phone
        );
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEdit = (data) => {
        setIsModalVisible(true);
        form.setFieldsValue(data);
        setIsEditing(true);
        setInitialFormData(data);
    };

    const handleDelete = (id) => {
        dispatch(waiterSlice.deleteItem(id));
    };

    const handleSaveError = () => {
        setSaveError(true);
    };

    const handleSaveSuccess = () => {
        setSaveError(false);
    };

    return (
        <div>
            <Navigation />
            <Search
                placeholder="Search by waiter name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={updateFilter}
                enterButton
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={showModal}>
                Add Waiter
            </Button>
            <Button onClick={clearFilter}>Show All</Button>
            <Table
                dataSource={filterWaiters(
                    new URLSearchParams(location.search).get('filter')
                )}
                columns={columns}
            />
            <Modal
                title={isEditing ? 'Edit Waiter' : 'Add Waiter'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="waiterForm">
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the phone number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {isEditing && (
                        <Form.Item
                            name="id"
                            initialValue={initialFormData.id}
                            style={{ display: 'none' }}
                        >
                            <Input type="hidden" />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </div>
    );
}

export default WaiterList;