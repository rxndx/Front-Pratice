import {GenericTableColumn} from "../../../utils/GenericColumn";

export function DishTableColumn(handleEdit, handleDelete) {
    return GenericTableColumn(
        [
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
        ],
        handleEdit,
        handleDelete
    );
}