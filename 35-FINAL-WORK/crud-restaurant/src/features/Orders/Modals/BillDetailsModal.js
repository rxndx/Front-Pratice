import React from 'react';
import {Modal, Form, Select, InputNumber, Button} from 'antd';
import { calculateTotalPrice } from "../utils/calculateTotalPrice";

export default function BillDetailsModal({ isVisible, onClose, waiters, dishes,
                                             form, editingBillId, onEditDish, onEditFinish,
                                             selectedBill, editingDishes, editDishes, SaveDishes, setEditDishes }) {
    return (
        <Modal
            title="Bill Details"
            visible={isVisible}
            onCancel={onClose}
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
                        <Form form={form} onFinish={onEditFinish} initialValues={{ dishes: editingDishes }}>
                            <Form.List name="dishes">
                                {(fields, { remove }) => (
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
                                            <Button type="dashed" onClick={() => onEditDish()}>
                                                Add Dish
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Button type="primary" htmlType="submit" onClick={SaveDishes}>
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
    );
}
