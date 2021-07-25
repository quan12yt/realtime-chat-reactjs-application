import { Button, Avatar, Tooltip, Input, Form, Alert } from "antd";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { UsergroupAddOutlined, SendOutlined } from "@ant-design/icons";
import Message from "./Message";
import { AppContext } from "./../../Context/AppProvider";
import { addDocument } from "./../../Firebase/services";
import { AuthContext } from "./../../Context/AuthProvider";
import { useForm } from "antd/lib/form/Form";
import useFireStore from "./../../Hooks/HookFireStore";

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
  display: flex;
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
  const { selectedRoom, members, setIsInviteVisible } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");

  const {
    user: { uid, displayName, photoURL },
  } = useContext(AuthContext);

  const [form] = useForm();

  const messageCondition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFireStore("messages", messageCondition);

  const handleonSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    form.resetFields(["message"]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header-info">
              <p className="header-name">{selectedRoom.name}</p>
              <span className="header-description">
                {selectedRoom.description}
              </span>
            </div>
            <div>
              <ButtonGroupStyled>
                <Button
                  type="text"
                  ghost
                  icon={<UsergroupAddOutlined />}
                  onClick={() => {
                    setIsInviteVisible(true);
                  }}
                >
                  Invite
                </Button>
                <Avatar.Group size="small" maxCount={2}>
                  {members.map((member) => (
                    <Tooltip title={member.displayName} key={member.uid}>
                      <Avatar src={member.photoURL}>
                        {member.photoURL
                          ? ""
                          : member.displayName?.charAt(0)?.toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </ButtonGroupStyled>
            </div>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((mess) => (
                <Message
                  key={mess.id}
                  text={mess.text}
                  displayName={mess.displayName}
                  createAt={mess.createAt}
                  photoURL={mess.photoURL}
                ></Message>
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleonSubmit}
                  bordered={false}
                  autoComplete="off"
                  placeholder="Type your message here"
                />
              </Form.Item>
              <Button onClick={handleonSubmit} icon={<SendOutlined />}>
                Send
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Select one room"
          type="info"
          showIcon
          style={{ margin: "5px" }}
        />
      )}
    </WrapperStyled>
  );
}
