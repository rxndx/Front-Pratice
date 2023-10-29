import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Modal, Form, Space, message } from 'antd';
import {useSearchParams} from 'react-router-dom';

import Navigation from '../../components/Navigation';
import {clearFilter, updateFilter} from "../../utils/Filters";
import {
    handleCancel,
    handleDelete,
    handleEdit,
    handleSaveError,
    handleSaveSuccess,
    showModal
} from "../../utils/BasicHandlers";
import {WaitersColumn} from "./DataForm/WaitersColumn";
import {waiterSlice} from "../../store/store";

const { Search } = Input;

function WaiterList() {
    const dispatch = useDispatch();
    const waiters = useSelector((state) => state.waiters.list);
    let [searchParams, setSearchParams] = useSearchParams()
    const filter = searchParams.get('filter');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialFormData, setInitialFormData] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [saveError, setSaveError] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(waiterSlice.fetchItems());
    }, [dispatch]);

    const filterWaiters = (filter) => {
        if (!filter) {
            return waiters;
        }

        return waiters.filter((waiter) => {
            return waiter.firstName.toLowerCase().includes(filter.toLowerCase());
        });
    };

    const updateFilterWaiters = () => {
        updateFilter(searchValue, setSearchParams, setSearchValue);
    }

    const clearFilterWaiters = () => {
        clearFilter(setSearchParams, setSearchValue);
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (isDuplicate(values)) {
                message.error("A waiter with the same name and phone number already exists.");
            } else {
                if (isEditing) {
                    await dispatch(waiterSlice.updateItem(form.getFieldValue('id'), values));
                } else {
                    await dispatch(waiterSlice.createItem(values));
                }
                setIsModalVisible(false);
                handleSaveSuccess(setSaveError);
                message.success('Successfully.');
            }
        } catch (error) {
            handleSaveError(setSaveError);
            message.error(error);
        }
    };

    const isDuplicate = (newWaiter) => {
        return waiters.some(
            (waiter) =>
                waiter.firstName === newWaiter.firstName &&
                waiter.phone === newWaiter.phone
        );
    };

    const handleEditWaiters = (data) => {
        handleEdit(data, setIsModalVisible, form, setIsEditing, setInitialFormData);
    }

    const handleDeleteWaiters = (id) => {
        handleDelete(id, dispatch, waiterSlice).then(r => message.success('Deleted.'));
    }

    const handleCancelWaiter = () => {
        handleCancel(setIsModalVisible);
    }

    const showModalWaiter = () => {
        showModal(setIsModalVisible, form, setIsEditing, setInitialFormData);
    }

    const columns = WaitersColumn(handleEditWaiters, handleDeleteWaiters);

    return (
        <div>
            <Navigation />
            <Search
                placeholder="Search by waiter name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={updateFilterWaiters}
                enterButton
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={showModalWaiter}>
                Add Waiter
            </Button>
            <Button onClick={clearFilterWaiters}>Show All</Button>
            <Table
                dataSource={filterWaiters(filter)}
                columns={columns}
            />
            <Modal
                title={isEditing ? 'Edit Waiter' : 'Add Waiter'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancelWaiter}
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
                        />
                    )}
                </Form>
            </Modal>
        </div>
    );
}

export default WaiterList;