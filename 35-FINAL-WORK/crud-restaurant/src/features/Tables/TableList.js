import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, Input, Button, Modal, Form, Space, message} from 'antd';
import {useSearchParams} from "react-router-dom";

import Navigation from "../../components/Navigation";

import { TableColumn } from "./DataForm/TableColumn";
import { clearFilter, updateFilter } from "../../utils/Filters";
import {
    handleCancel,
    handleDelete,
    handleEdit,
    handleSaveError,
    handleSaveSuccess,
    showModal
} from "../../utils/BasicHandlers";
import {tableSlice} from "../../store/store";

const { Search } = Input;

function TableList() {
    const dispatch = useDispatch();
    const tables = useSelector((state) => state.tables.list);
    let [searchParams, setSearchParams] = useSearchParams()
    const filter = searchParams.get('filter');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialFormData, setInitialFormData] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [saveError, setSaveError] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(tableSlice.fetchItems());
    }, [dispatch]);

    const filterTables = (filter) => {
        if (!filter) {
            return tables;
        }

        return tables.filter((table) => {
            return table.number.toString() === filter;
        });
    };

    const updateFilterTable = () => {
        updateFilter(searchValue, setSearchParams, setSearchValue);
    }

    const clearFilterTable = () => {
        clearFilter(setSearchParams, setSearchValue);
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (isEditing) {
                if (JSON.stringify(values) !== JSON.stringify(initialFormData)) {
                    await dispatch(tableSlice.updateItem(form.getFieldValue('id'), values));
                }
            } else {
                await dispatch(tableSlice.createItem(values));
            }
            setIsModalVisible(false);
            handleSaveSuccess(setSaveError);
            message.success('Successfully.');
        } catch (error) {
            handleSaveError(setSaveError);
            message.error(error);
        }
    };

    const handleEditTable = (data) => {
        handleEdit(data, setIsModalVisible, form, setIsEditing, setInitialFormData);
    }

    const handleDeleteTable = (id) => {
        handleDelete(id, dispatch, tableSlice).then(r => message.success('Deleted.'));
    }

    const handleCancelTable = () => {
        handleCancel(setIsModalVisible);
    }

    const showModalTable = () => {
        showModal(setIsModalVisible, form, setIsEditing, setInitialFormData);
    }

    const columns = TableColumn(handleEditTable, handleDeleteTable);

    return (
        <div>
            <Navigation />
            <Search
                placeholder="Search by table number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={updateFilterTable}
                enterButton
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={showModalTable}>
                Add Table
            </Button>
            <Button onClick={clearFilterTable}>Show All</Button>
            <Table dataSource={filterTables(filter)} columns={columns} />
            <Modal
                title={isEditing ? 'Edit Table' : 'Add Table'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancelTable}
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