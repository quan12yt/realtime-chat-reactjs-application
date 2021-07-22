import { Button, Avatar, Tooltip, Input, Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Message from './Message';

const WrapperStyled = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__name {
            margin: 0;
            font-weight: bold;
        }

        &__description {
            font-size: 12px;
        }
    }
`;
const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display:flex;
    flex-direction: column;
    padding: 12px;
    justify-content: flex-end;
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rbg(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;


export default function ChatWindow() {
    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className="header-info">
                    <p className="header-name">Room 1</p>
                    <span className="header-description">This is Room 1</span>
                </div>
                <div>
                    <ButtonGroupStyled>
                        <Button type="text" ghost icon={<UsergroupAddOutlined />}>Invite</Button>
                        <Avatar.Group size='small' maxCount={2}>
                            <Tooltip title='A'>
                                <Avatar>A</Avatar>
                            </Tooltip>
                            <Tooltip title='B'>
                                <Avatar>B</Avatar>
                            </Tooltip>
                            <Tooltip title='C'>
                                <Avatar>C</Avatar>
                            </Tooltip>
                        </Avatar.Group>
                    </ButtonGroupStyled>
                </div>
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled>
                    <Message text="Hello" 
                            displayName="Quan Pham"
                            createAt="12312312"
                            photoURL={null}
                    ></Message>
                     <Message text="Hello" 
                            displayName="Quan Pham"
                            createAt="12312312"
                            photoURL={null}
                    ></Message>
                </MessageListStyled>
                <FormStyled>
                    <Form.Item>
                        <Input bordered={false} autoComplete='off' placeholder= "Type your message here" />
                    </Form.Item>
                    <Button>Send</Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
    )
}
