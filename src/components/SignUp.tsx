import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { signUp } from '../services/auth';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router';
import { setUser } from '../store/reducers/user';
import { RegisterProp } from '../@d.types';

const SignUpBox: React.FC<RegisterProp> = ({ setRegister }: RegisterProp) => {
    const [form] = Form.useForm();
    const { Title, Link } = Typography;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    type FieldType = {
        email: string;
        password: string;
        password2?: string;
    };
    const onFinish = async (values: FieldType) => {
        console.log("Success:", values);
        await signUp(values.email, values.password, values.email.split('@')[0])
        .then(async (user) => {
            await user?.getIdToken()
            .then((token) => {
                dispatch(setUser({
                    email: user.email as string,
                    token: token,
                    name: values.email.split('@')[0],
                    uid: user.uid
                }))
            })
            .catch((error) => {alert(error.message)});
        navigate('/user/dm');
        })
        .catch((error) => alert(error.message));
       
    };

    const handleRegister = (e: React.MouseEvent) => {
        setRegister(1);
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Form
            form={form}
            name="signup"
            autoComplete="off"
            className='registerForm'
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Title className='normal-white' level={3}>Sign Up</Title>
            <Form.Item<FieldType>
                label={<label className='normal-white'>Email</label>}
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input valid email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label={<label className='normal-white'>Password</label>}
                name="password"
                rules={[{ required: true }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label={<label className='normal-white'>Confirm Password</label>}
                name="password2"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button className='form-button' size="large" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Form.Item className="normal-white flex-center">
                Alreaady registered user? <Link className="link" onClick={handleRegister}>Sign In</Link>
            </Form.Item>
        </Form>
    );
};

export default SignUpBox;