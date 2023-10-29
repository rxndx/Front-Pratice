import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { Table, Button, Form, message } from 'antd';
import { OrderColumn } from "./DataForm/OrderColumn";
import {dishesSlice, ordersSlice, tableSlice, waiterSlice} from "../../store/store";

import Navigation from "../../components/Navigation";
import BillDetailsModal from "./Modals/BillDetailsModal";
import AddOrderModal from "./Modals/AddOrderModal";

function BillList() {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders.list);
    const dishes = useSelector((state) => state.dishes.list);
    const tables = useSelector((state) => state.tables.list);
    const waiters = useSelector((state) => state.waiters.list);

    const [selectedBill, setSelectedBill] = useState(null);
    const [isBillModalVisible, setIsBillModalVisible] = useState(false);
    const [editDishes, setEditDishes] = useState(false);
    const [isAddingNewOrder, setIsAddingNewOrder] = useState(false);

    const [formBillDetails] = Form.useForm();
    const [formAddNewOrder] = Form.useForm();
    const [editingBillId, setEditingBillId] = useState(null);
    const [editingDishes, setEditingDishes] = useState([]);

    useEffect(async () => {
        await Promise.all([
            dispatch(tableSlice.fetchItems()),
            dispatch(waiterSlice.fetchItems()),
            dispatch(dishesSlice.fetchItems()),
            dispatch(ordersSlice.fetchItems()),
        ])
    }, [dispatch]);

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
        handleSaveDishes(values).then(r => message.success('Successful.'));
    };

    const handleSaveDishes = async (values) => {
        if (Array.isArray(values.dishes)) {
            const updatedOrder = {
                ...selectedBill,
                dishes: values.dishes.map(dish => ({dishId: dish.dishId, count: dish.count}))
            };
            try {
                await dispatch(ordersSlice.updateItem(updatedOrder.id, updatedOrder));
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
            await dispatch(ordersSlice.createItem(newOrder));
            message.success('New order created successfully.');
            setIsAddingNewOrder(false);
        } catch (error) {
            message.error('Failed to create a new order. Please try again.');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await dispatch(ordersSlice.deleteItem(orderId));
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

    const columns = OrderColumn(tables, dishes, waiters, orders, handleBillDetails, handleDeleteOrder);

    return (
        <div>
            <Navigation />
            <Button type="primary" onClick={handleAddNewOrder}>Add New Order</Button>
            <Table dataSource={orders} columns={columns} />
            <BillDetailsModal
                isVisible={isBillModalVisible}
                onClose={closeBillModal}
                waiters={waiters}
                dishes={dishes}
                form={formBillDetails}
                onEditFinish={onFinish}
                onEditDish={handleAddDish}
                selectedBill={selectedBill}
                editingBillId={editingBillId}
                editingDishes={editingDishes}
                editDishes={editDishes}
                setEditDishes={setEditDishes}
                SaveDishes={handleSaveDishes}
            />
            <AddOrderModal
                isVisible={isAddingNewOrder}
                onClose={closeAddOrderForm}
                tables={tables}
                waiters={waiters}
                dishes={dishes}
                onAddOrder={onAddNewOrder}
                form={formAddNewOrder}
            />
        </div>
    );
}

export default BillList;