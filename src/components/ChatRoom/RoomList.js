import { Button, Collapse, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons'
import useFireStore from './../../Hooks/HookFireStore';
import { AuthContext } from './../../Context/AuthProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header,
        p {
            color: white;
        }

        .ant-collapse-content-box {
            padding: 0 40px;
        }
        
        .add-room {
             color: white;
             padding: 0;
        }
`;

const LinkStyled = styled(Typography.Link)`
    display:block;
    margin-bottom: 5px;
    color: white;
`;


export default function RoomList() {

    const {user: { uid }} = React.useContext(AuthContext)

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        };
    }, [uid]);

    const rooms = useFireStore('room', roomsCondition);

    return (
       <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyled header="Room List" key ='1'>
                {
                    rooms.map(room => <LinkStyled key= {room.id}>{room.name}</LinkStyled>)
                }

                <Button type="text" icon={<PlusSquareOutlined />} className= "add-room">Add room</Button>
            </PanelStyled>
       </Collapse>
    )
}
