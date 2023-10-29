import {calculateTotalPrice} from "../utils/calculateTotalPrice";
import {Button} from "antd";

export function OrderColumn(tables, dishes, waiters, orders, handleBillDetails, handleDeleteOrder) {
    return [
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
    ]
}