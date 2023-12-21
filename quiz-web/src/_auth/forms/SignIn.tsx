import { Button, Form, Input } from 'antd';
import { getUser } from '../../service/userService';
import { useNavigate } from 'react-router-dom';

// type IUser = {
//     "id": string;
//     "fullname": string;
//     "email": string;
//     "password": string;
//     "token": string;
// }


type FieldType = {
    email?: string;
    password?: string;
};

const SignIn = () => {
    console.log("123")
    const navigate = useNavigate()
    const onFinish = async (values: any) => {

        const getAuthUser = await getUser(values.email, values.password)
        if (getAuthUser.length === 0) {
            console.log("EMAIL HOAC MAT KHAU SAI")
        }
        else {
            console.log("DANG NHAP THANH CONG")
            localStorage.setItem("token", getAuthUser[0].token)
            navigate('/')
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default SignIn