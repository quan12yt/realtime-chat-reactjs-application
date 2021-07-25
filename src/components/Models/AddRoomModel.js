import {Form, Input, Modal} from 'antd';
import React, { useContext } from 'react';
import { AppContext } from './../../Context/AppProvider';
import { addDocument } from './../../Firebase/services';
import { AuthContext } from './../../Context/AuthProvider';

export default function AddRoomModel() {

    const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
    const {user :{uid},} = useContext(AuthContext);

    const [form] = Form.useForm()

    const handleCancel = () => {
        form.resetFields();  
        setIsAddRoomVisible(false);
    };
    const handleOK = () => {
    
        addDocument('rooms', {
            ...form.getFieldValue(),
            members: [uid],      
           });
       
        form.resetFields();   
        setIsAddRoomVisible(false);
    }

    return (
        <Modal
            title="Add new room"
            visible={isAddRoomVisible}
            onOk={handleOK}
            onCancel={handleCancel}
        >
            <Form form={form} layout='vertical'>
                <Form.Item label="Room Name" name='name'>
                    <Input placeholder="Enter Room Name"></Input>
                </Form.Item>
                <Form.Item label="Room Description" name='description'>
                    <Input placeholder="Enter description"></Input>
                </Form.Item>
            </Form>
        </Modal>
    )
}
