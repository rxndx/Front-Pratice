import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Modal, Form, Space, InputNumber } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import Navigation from '../../components/Navigation';
import generateSlice from '../../store/reducer';
import { dishesUrl } from '../../api/url';

const { Search } = Input;

const dishSlice = generateSlice('dishes', dishesUrl);

function DishList() {
    const dispatch = useDispatch();
    const dishes = useSelector((state) => state.dishes.list);
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialFormData, setInitialFormData] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [saveError, setSaveError] = useState('');

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(dishSlice.fetchItems());
    }, [dispatch]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
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

    const filterDishes = (filter) => {
        if (!filter) {
            return dishes;
        }

        return dishes.filter((dish) => {
            return dish.name.toLowerCase().includes(filter.toLowerCase());
        });
    };

    const updateFilter = (value) => {
        navigate(`/dishes?filter=${value}`);
        setSearchValue(value);
    };

    const clearFilter = () => {
        navigate('/dishes');
        setSearchValue('');
    };

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
        setIsEditing(false);
        setInitialFormData({});
        setSaveError('');
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setSaveError('');

            if (isEditing) {
                if (JSON.stringify(values) !== JSON.stringify(initialFormData)) {
                    const isDuplicate = dishes.some(
                        (dish) =>
                            dish.name.toLowerCase() === values.name.toLowerCase() &&
                            dish.id !== form.getFieldValue('id')
                    );

                    if (isDuplicate) {
                        setSaveError('Dish with the same name already exists.');
                    } else {
                        dispatch(dishSlice.updateItem(form.getFieldValue('id'), values));
                        setIsModalVisible(false);
                    }
                }
            } else {
                const isDuplicate = dishes.some(
                    (dish) =>
                        dish.name.toLowerCase() === values.name.toLowerCase()
                );

                if (isDuplicate) {
                    setSaveError('Dish with the same name already exists.');
                } else {
                    await dispatch(dishSlice.createItem(values));
                    setIsModalVisible(false);
                    handleSaveSuccess();
                }
            }
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
        dispatch(dishSlice.deleteItem(id));
    };

    const handleSaveError = () => {
        setSaveError('Please enter valid data.');
    };

    const handleSaveSuccess = () => {
        setSaveError('');
    };

    return (
        <div>
            <Navigation />
            <Search
                placeholder="Search by dish name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={updateFilter}
                enterButton
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={showModal}>
                Add Dish
            </Button>
            <Button onClick={clearFilter}>Show All</Button>
            <Table
                dataSource={filterDishes(
                    new URLSearchParams(location.search).get('filter')
                )}
                columns={columns}
            />
            <Modal
                title={isEditing ? 'Edit Dish' : 'Add Dish'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="dishForm">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the dish name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the dish description!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the price!',
                            },
                            {
                                type: 'number',
                                min: 0,
                                message: 'Please enter a valid price!',
                            },
                        ]}
                    >
                        <InputNumber step={0.01} />
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
                {saveError && (
                    <div style={{ color: 'red', marginTop: '10px' }}>{saveError}</div>
                )}
            </Modal>
        </div>
    );
}

export default DishList;