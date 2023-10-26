import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Input, Select, InputNumber, message } from 'antd';
import generateSlice from '../../store/reducer';
import { dishesUrl, ordersUrl, tablesUrl, waitersUrl } from "../../api/url";
import Navigation from "../../components/Navigation";
import { calculateTotalPrice } from "./calculateTotalPrice";

const tableSlice = generateSlice('tables', tablesUrl);
const waiterSlice = generateSlice('waiters', waitersUrl);
const dishSlice = generateSlice('dishes', dishesUrl);
const billSlice = generateSlice('orders', ordersUrl);

function BillList() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.list);
    const tables = useSelector((state) => state.tables.list);
    const dishes = useSelector((state) => state.dishes.list);
    const waiters = useSelector((state) => state.waiters.list);

    const [selectedBill, setSelectedBill] = useState(null);
    const [isBillModalVisible, setIsBillModalVisible] = useState(false);
    const [editDishes, setEditDishes] = useState(false);
    const [isAddingNewOrder, setIsAddingNewOrder] = useState(false);

    const [formBillDetails] = Form.useForm();
    const [formAddNewOrder] = Form.useForm();
    const [editingBillId, setEditingBillId] = useState(null);
    const [editingDishes, setEditingDishes] = useState([]);

    useEffect(() => {
        dispatch(tableSlice.fetchItems());
        dispatch(waiterSlice.fetchItems());
        dispatch(dishSlice.fetchItems());
        dispatch(billSlice.fetchItems());
    }, [dispatch]);

    const columns = [
        {
            title: 'Table Number',
            dataIndex: 'tableId',
            key: 'tableId',
            render: (tableId) => {
                const table = tables.find((t) => t.id === tableId);
                return table ? table.number : 'Unknown';
            },
        },
        {
            title: 'Waiter',
            dataIndex: 'waiterId',
            key: 'waiterId',
            render: (waiterId) => {
                const waiter = waiters.find((w) => w.id === waiterId);
                return waiter ? waiter.firstName : 'Unknown';
            },
        },
        {
            title: 'Total Price',
            dataIndex: 'id',
            key: 'totalPrice',
            render: (orderId) => {
                const order = orders.find(order => order.id === orderId);
                return calculateTotalPrice(order, dishes);
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleBillDetails(record)}>Details</Button>
                    <Button type="danger" onClick={() => handleDeleteOrder(record.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    const handleBillDetails = (bill) => {
        setSelectedBill(bill);
        setEditingBillId(bill.id);
        setEditingDishes(bill.dishes);
        setIsBillModalVisible(true);
        formBillDetails.setFieldsValue({ dishes: bill.dishes });
    };

    const closeBillModal = () => {
        setIsBillModalVisible(false);
    };

    const onFinish = (values) => {
        setEditingDishes(values.dishes);
        handleSaveDishes(values);
    };

    const handleSaveDishes = async (values) => {
        if (Array.isArray(values.dishes)) {
            const updatedOrder = {
                ...selectedBill,
                dishes: values.dishes.map(dish => ({dishId: dish.dishId, count: dish.count}))
            };
            try {
                await dispatch(billSlice.updateItem(updatedOrder.id, updatedOrder));
                message.success('Bill updated successfully.');
                setEditDishes(false);
            } catch (error) {
                message.error('Failed to update the bill. Please try again.');
            }
        }
    };

    const handleAddNewOrder = () => {
        setIsAddingNewOrder(true);
    };

    const closeAddOrderForm = () => {
        setIsAddingNewOrder(false);
    };

    const onAddNewOrder = async (values) => {
        try {
            const newOrder = {
                tableId: values.tableId,
                waiterId: values.waiterId,
                dishes: values.dishes.map(dish => ({ dishId: dish.dishId, count: dish.count })),
            };
            await dispatch(billSlice.createItem(newOrder));
            message.success('New order created successfully.');
            setIsAddingNewOrder(false);
        } catch (error) {
            message.error('Failed to create a new order. Please try again.');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await dispatch(billSlice.deleteItem(orderId));
            message.success('Order deleted successfully.');
        } catch (error) {
            message.error('Failed to delete the order. Please try again.');
        }
    };

    const handleAddDish = () => {
        formBillDetails.setFieldsValue({
            dishes: [...formBillDetails.getFieldValue('dishes'), { dishId: null, count: 1 }],
        });
    };

    return (
        <div>
            <Navigation />
            <Button type="primary" onClick={handleAddNewOrder}>Add New Order</Button>
            <Table dataSource={orders} columns={columns} />
            <Modal
                title="Bill Details"
                visible={isBillModalVisible}
                onCancel={closeBillModal}
                footer={null}
            >
                {selectedBill && editingBillId === selectedBill.id ? (
                    <div>
                        <p>Waiter: {waiters.find((w) => w.id === selectedBill.waiterId)?.firstName || 'Unknown'}</p>
                        <p>Table Number: {selectedBill.tableId}</p>
                        <p>Total Price: {calculateTotalPrice(selectedBill, dishes)}</p>
                        <p>Dishes:</p>
                        <ul>
                            {editingDishes.map((orderDish, index) => (
                                <li key={index}>
                                    {dishes.find((d) => d.id === orderDish.dishId)?.name}: {orderDish.count}
                                </li>
                            ))}
                        </ul>
                        {editDishes ? (
                            <Form form={formBillDetails} onFinish={onFinish} initialValues={{ dishes: editingDishes }}>
                                <Form.List name="dishes">
                                    {(fields, { remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                                <div key={key}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'dishId']}
                                                        fieldKey={[fieldKey, 'dishId']}
                                                        rules={[{ required: true, message: 'Please select a dish!' }]}
                                                    >
                                                        <Select style={{ width: 200 }}>
                                                            {dishes.map(dish => (
                                                                <Select.Option key={dish.id} value={dish.id}>
                                                                    {dish.name}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'count']}
                                                        fieldKey={[fieldKey, 'count']}
                                                        rules={[{ required: true, message: 'Please enter a count!' }]}
                                                    >
                                                        <InputNumber min={1} />
                                                    </Form.Item>
                                                    <Button type="dashed" onClick={() => remove(name)}>Remove</Button>
                                                </div>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => handleAddDish()}>
                                                    Add Dish
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Button type="primary" htmlType="submit" onClick={handleSaveDishes}>
                                    Save
                                </Button>
                                <Button onClick={() => setEditDishes(false)}>Cancel</Button>
                            </Form>
                        ) : (
                            <Button onClick={() => setEditDishes(true)}>Edit Dishes</Button>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal>

            <Modal
                title="Add New Order"
                visible={isAddingNewOrder}
                onCancel={closeAddOrderForm}
                footer={null}
            >
                <Form form={formAddNewOrder} onFinish={onAddNewOrder}>
                    <Form.Item name="tableId" label="Select Table" rules={[{ required: true, message: 'Please select a table!' }]}>
                        <Select style={{ width: 200 }}>
                            {tables.map(table => (
                                <Select.Option key={table.id} value={table.id}>
                                    {table.number}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="waiterId" label="Select Waiter" rules={[{ required: true, message: 'Please select a waiter!' }]}>
                        <Select style={{ width: 200 }}>
                            {waiters.map(waiter => (
                                <Select.Option key={waiter.id} value={waiter.id}>
                                    {waiter.firstName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.List name="dishes">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'dishId']}
                                            fieldKey={[fieldKey, 'dishId']}
                                            rules={[{ required: true, message: 'Please select a dish!' }]}
                                        >
                                            <Select style={{ width: 200 }}>
                                                {dishes.map(dish => (
                                                    <Select.Option key={dish.id} value={dish.id}>
                                                        {dish.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'count']}
                                            fieldKey={[fieldKey, 'count']}
                                            rules={[{ required: true, message: 'Please enter a count!' }]}
                                        >
                                            <InputNumber min={1} />
                                        </Form.Item>
                                        <Button type="dashed" onClick={() => remove(name)}>Remove</Button>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()}>
                                        Add Dish
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Button type="primary" htmlType="submit">Create Order</Button>
                </Form>
            </Modal>
        </div>
    );
}

export default BillList;