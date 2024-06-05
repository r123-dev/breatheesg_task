import { Menu, Select } from 'antd'
import React, { useState } from 'react'
import InputModal from './InputModal';
import { useAppDispatch } from '../store/hooks';
import { toggleTab } from '../store/reducers/tab';

const DataManagerMenu: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const openModal = async (e: React.MouseEvent) => {
        setIsModalOpen(true);
    }
    const closeModal = async () => {
        setIsModalOpen(false);
    }

    const handleTabClick = () => {
        dispatch(toggleTab());
    };
    return (
        <div>
            <Menu className='menu'>
                <Menu.Item disabled>
                    <Select className='menu-item'
                        defaultValue="FY 2023-24"
                        options={[
                            { value: '23', label: 'FY 2023-24' },
                            { value: '22', label: 'FY 2022-23' },
                            { value: '21', label: 'FY 2021-22' }
                        ]}
                    />
                </Menu.Item>
                <Menu.Item disabled>
                    <div className='menu-item' onClick={openModal}>Submit for Approval</div>
                </Menu.Item>
                <Menu.Item disabled >
                    <div className='menu-item' onClick={() => handleTabClick()}>Data Entry</div>
                </Menu.Item>
                <Menu.Item disabled >
                    <div className='menu-item' onClick={() => handleTabClick()}>Data Tracker</div>
                </Menu.Item>
            </Menu>
            <InputModal closeModal={closeModal} open={isModalOpen} />
        </div>
    )
}

export default DataManagerMenu
