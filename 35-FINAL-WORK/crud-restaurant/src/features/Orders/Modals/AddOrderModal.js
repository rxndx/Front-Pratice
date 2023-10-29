import {Button, Form, InputNumber, Modal, Select} from "antd";

export default function AddOrderModal({ isVisible, onClose, tables, waiters,
                                          dishes, form, onAddOrder }) {
    return (
        <Modal
            title="Add New Order"
            visible={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} onFinish={onAddOrder}>
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
    );
}