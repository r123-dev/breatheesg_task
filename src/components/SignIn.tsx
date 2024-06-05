import { Button, Form, Input, Typography } from "antd";
import GoogleButton from "react-google-button";
import { googleSignIn, signIn } from "../services/auth";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/reducers/user";
import { useNavigate } from "react-router";
import { RegisterProp } from "../@d.types";
import { getAssessments } from "../services/database";
import { setAssessments } from "../store/reducers/assessment";

const SignInBox: React.FC<RegisterProp> = ({ setRegister }: RegisterProp) => {
  const { Link, Title, Paragraph } = Typography;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  type FieldType = {
    email: string;
    password: string;
  };

  const onFinish = async (values: FieldType) => {
    await signIn(values.email, values.password)
      .then(async (user) => {
        await user
          ?.getIdToken()
          .then((token) => {
            dispatch(
              setUser({
                uid: user.uid,
                email: user.email as string,
                token: token,
                name: user.displayName as string,
              })
            );
          })
          .catch((error) => {
            alert(error.message);
          });
        await getAssessments(user.uid)
          .then((firebaseAssessments) => {
            dispatch(setAssessments({ assessments: firebaseAssessments }));
          })
          .catch((error) => alert(error.message));
        navigate("/user/dm");
      })
      .catch((error) => alert(error.message));
  };

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    await googleSignIn()
      .then(async (user) => {
        await user
          ?.getIdToken()
          .then(async (token) => {
            dispatch(
              setUser({
                uid: user.uid,
                email: user.email as string,
                token: token,
                name: user.displayName as string,
              })
            );
          })
          .catch((error) => {
            alert(error.message);
          });
        await getAssessments(user.uid)
          .then((firebaseAssessments) => {
            dispatch(setAssessments({ assessments: firebaseAssessments }));
          })
          .catch((error) => alert(error.message));
        navigate("/user/dm");
      })
      .catch((error) => alert(error.message));
  };

  const handleRegister = (e: React.MouseEvent) => {
    setRegister(0);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      name="signin"
      autoComplete="off"
      className="registerForm"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Title className="normal-white" level={3}>
        Login
      </Title>
      <Paragraph className="normal-white">
        Enter your Registered Email Id to continue
      </Paragraph>
      <Form.Item<FieldType>
        label={<label className="normal-white">Email</label>}
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input valid email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label={<label className="normal-white">Password</label>}
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item className="flex-center">
        <GoogleButton onClick={handleGoogleSignIn} />
      </Form.Item>

      <Form.Item>
        <p className="normal-white flex-center">
          New user?{" "}
          <Link className="link" onClick={handleRegister}>
            {" "}
            Sign Up
          </Link>{" "}
          or sign in with Google
        </p>
        <Button
          className="form-button"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInBox;
