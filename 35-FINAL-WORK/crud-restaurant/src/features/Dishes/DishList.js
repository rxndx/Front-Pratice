import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, Input, Button, Modal, Form, Space, InputNumber, message} from 'antd';
import {useSearchParams} from 'react-router-dom';

import Navigation from '../../components/Navigation';
import {DishTableColumn} from "./DataForm/DishColumn";
import {clearFilter, updateFilter} from "../../utils/Filters";
import {
    handleCancel,
    handleDelete,
    handleEdit,
    handleSaveError,
    handleSaveSuccess,
    showModal
} from "../../utils/BasicHandlers";
import {dishesSlice} from "../../store/store";

const { Search } = Input;

function DishList() {
    const dispatch = useDispatch();
    const dishes = useSelector((state) => state.dishes.list);
    let [searchParams, setSearchParams] = useSearchParams()
    const filter = searchParams.get('filter');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialFormData, setInitialFormData] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [saveError, setSaveError] = useState('');

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(dishesSlice.fetchItems());
    }, [dispatch]);

    const filterDishes = (filter) => {
        if (!filter) {
            return dishes;
        }

        return dishes.filter((dish) => {
            return dish.name.toLowerCase().includes(filter.toLowerCase());
        });
    };

    const updateFilterDishes = () => {
        updateFilter(searchValue, setSearchParams, setSearchValue);
    }

    const clearFilterDishes = () => {
        clearFilter(setSearchParams, setSearchValue);
    }

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
                        await dispatch(dishesSlice.updateItem(form.getFieldValue('id'), values));
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
                    await dispatch(dishesSlice.createItem(values));
                    setIsModalVisible(false);
                    handleSaveSuccess(setSaveError);
                    message.success('Successfully.');
                }
            }
        } catch (error) {
            handleSaveError(setSaveError);
            message.error(error);
        }
    };

    const handleEditDish = (data) => {
        handleEdit(data, setIsModalVisible, form, setIsEditing, setInitialFormData);
    }

    const handleDeleteDish = (id) => {
        handleDelete(id, dispatch, dishesSlice).then(r => message.success('Deleted.'));
    }

    const handleCancelDish = () => {
        handleCancel(setIsModalVisible);
    }

    const showModalDish = () => {
        showModal(setIsModalVisible, form, setIsEditing, setInitialFormData);
    }

    const columns = DishTableColumn(handleEditDish, handleDeleteDish);

    return (
        <div>
            <Navigation />
            <Search
                placeholder="Search by dish name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={updateFilterDishes}
                enterButton
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={showModalDish}>
                Add Dish
            </Button>
            <Button onClick={clearFilterDishes}>Show All</Button>
            <Table
                dataSource={filterDishes(filter)}
                columns={columns}
            />
            <Modal
                title={isEditing ? 'Edit Dish' : 'Add Dish'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancelDish}
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