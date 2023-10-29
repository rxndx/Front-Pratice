import {GenericTableColumn} from "../../../utils/GenericColumn";

export function TableColumn(handleEdit, handleDelete) {
    return GenericTableColumn(
        [
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
            },
        ],
        handleEdit,
        handleDelete
    );
}