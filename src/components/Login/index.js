import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../Firebase/config';
import styled from 'styled-components';
import { GoogleCircleFilled, FacebookOutlined } from '@ant-design/icons';
import logo from '../../img/back.png';
import { addDocument } from './../../Firebase/services';

const { Title } = Typography

const fbProvider = new firebase.auth.FacebookAuthProvider();

const WrapperStyled = styled.div`
    display: flex;
    align-items: left;
    justify-content: center;
    flex-flow: column wrap;
    background-image: url(${logo});
    background-size: 100% 100%;
    color: white;
    height: 100vh;
`;

const ButtonStyled = styled(Button)`
    width: 30%;
    height: 10%;
    display: block;
    background: #68dbe3;
    margin: 0 10px 10px 10px;
    border-radius: 5px;
    color: white;
    font-size: 30px;
`;

const TitleStyled = styled(Title)`
    color: white;
    width: 30%;
    font-size: 50;
    padding-bottom: 3px;
    padding-left: 10px;
`;

export default function Login() {
    const handleFBLogin = async () => {
        const { additionalUserInfo, user} = await auth.signInWithPopup(fbProvider);
       if(additionalUserInfo.isNewUser){
           addDocument('users', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId
           });
       }
    }

    return (
        <div>
            <Row justify = 'center' style = {{height: 800}}>
                <Col span={24}>
                    <WrapperStyled>
                        <TitleStyled level = {1} >
                            Login
                        </TitleStyled>
                        <ButtonStyled icon={<GoogleCircleFilled />} ghost type="text">
                            Google
                        </ButtonStyled>
                        <ButtonStyled icon={<FacebookOutlined />} ghost type="text"onClick = {handleFBLogin}>
                            Facebook
                        </ButtonStyled>
                    </WrapperStyled>
                </Col>
            </Row>
        </div>
    )
}
