import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Modal, Form, Space } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";

import Navigation from "../../components/Navigation";
import generateSlice from '../../store/reducer';
import { tablesUrl } from '../../api/url';

const { Search } = Input;

const tableSlice = generateSlice('tables', tablesUrl);

function TableList() {
    const dispatch = useDispatch();
    const tables = useSelector((state) => state.tables.list);
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialFormData, setInitialFormData] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [saveError, setSaveError] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(tableSlice.fetchItems());
    }, [dispatch]);

    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
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

    const filterTables = (filter) => {
        if (!filter) {
            return tables;
        }

        return tables.filter((table) => {
            return table.number.toString() === filter;
        });
    };

    const updateFilter = (value) => {
        navigate(`/tables?filter=${value}`);
        setSearchValue('');
    };

    const clearFilter = () => {
        navigate('/tables');
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
            if (isEditing) {
                if (JSON.stringify(values) !== JSON.stringify(initialFormData)) {
                    dispatch(tableSlice.updateItem(form.getFieldValue('id'), values));
                }
            } else {
                await dispatch(tableSlice.createItem(values));
            }
            setIsModalVisible(false);
            handleSaveSuccess();
        } catch (error) {
            handleSaveError();
        }
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
        dispatch(tableSlice.deleteItem(id));
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
                placeholder="Search by table number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={updateFilter}
                enterButton
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={showModal}>
                Add Table
            </Button>
            <Button onClick={clearFilter}>Show All</Button>
            <Table dataSource={filterTables(new URLSearchParams(location.search).get('filter'))} columns={columns} />
            <Modal
                title={isEditing ? 'Edit Table' : 'Add Table'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="tableForm">
                    <Form.Item
                        name="number"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the table number!',
                            },
                            {
                                validator: async (_, value) => {
                                    if (!value) return;
                                    if (isEditing && value === initialFormData.number) return;
                                    if (tables.some((table) => table.number === value)) {
                                        throw new Error('This table number is already taken.');
                                    }
                                },
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

export default TableList;