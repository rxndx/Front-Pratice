export const updateFilter = (value, setSearchParams, setSearchValue) => {
    setSearchParams(`filter=${value}`);
    setSearchValue('');
};

export const clearFilter = (setSearchParams, setSearchValue) => {
    setSearchParams('');
    setSearchValue('');
};