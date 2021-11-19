import React from 'react'
import { Select } from 'semantic-ui-react'


function SelectDisplayRows (props){
    const {handleRowSelect} = props
    const rowOptions = [
        { key: '3', value: '3', text: '3 rows per page' },
        { key: '5', value: '5', text: '5 rows per page' },
        { key: '10', value: '10', text: '10 rows per page' },
    ]


    return (
        <Select placeholder='Rows per page' options={rowOptions} onChange={(e, data) => handleRowSelect(data.value)}/>
    )
};
export default SelectDisplayRows