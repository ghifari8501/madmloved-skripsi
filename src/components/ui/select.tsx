"use client"

import Select  from 'react-select';
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager';



export const SelectMain: StateManagedSelect = ({className, ...props}) => {


    return <>
        <Select
            className='border-border'
            {...props}
        />
    </>
}