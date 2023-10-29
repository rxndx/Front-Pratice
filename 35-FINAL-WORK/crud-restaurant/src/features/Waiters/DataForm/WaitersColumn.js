import { GenericTableColumn } from "../../../utils/GenericColumn";

export function WaitersColumn(handleEdit, handleDelete) {
    return GenericTableColumn(
        [
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
            },
        ],
        handleEdit,
        handleDelete
    );
}