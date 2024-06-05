import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { AssessmentDataType, InputModalProps } from '../@d.types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { insertAssessments } from '../services/database';
import { setAssessments } from '../store/reducers/assessment';

const InputModal: React.FC<InputModalProps> = ({ open, closeModal }: InputModalProps) => {
    const dispatch = useAppDispatch();
    const assessments = useAppSelector((state) => state.assessment.assessments);
    const uid = useAppSelector((state) => state.user.uid);
    const [form] = Form.useForm();

    const onFinish = async (values: AssessmentDataType) => {
        console.log(values);
        values.result = false;
        values.score = 0;
        values.status = "Pending";
        const updatedAssessments: AssessmentDataType[]= assessments ? [...assessments, values] : [values];
        await insertAssessments(updatedAssessments, uid)
            .then(() => {
                dispatch(setAssessments({assessments: updatedAssessments}));
                closeModal();
            })
            .catch((error) => alert(error.message));

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        alert("Error inserting data");
    };

    return (
        <>
            <Modal
                title="Submit Assessment Data"
                open={open}
                footer={null}
                closeIcon={null}
            >

                <Form
                    form={form}
                    name="insert"
                    autoComplete="off"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item<AssessmentDataType>
                        label="Assessment Title"
                        name="assessment"
                        rules={[{ required: true, message: 'Assessment Title is Required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<AssessmentDataType>
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: "Select from below"}]}
                    >
                        <Select
                            options={[
                                { value: 'Custom', label: 'Custom' },
                                { value: 'BRSR', label: 'BRSR' }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item<AssessmentDataType>
                        label="Number of Suppliers"
                        name="nos"
                        rules={[{ required: true, pattern: new RegExp(/^[0-9]+$/), message: 'Must be number and required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<AssessmentDataType>
                        label="Risk Classification"
                        name="rc"
                        rules={[{ required: true, message: "Select from below"}]}
                    >
                        <Select
                            options={[
                                { value: 'Medium', label: 'Medium' },
                                { value: 'Low', label: 'Low' },
                                { value: 'High', label: 'High' }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button className='modalButton' size="large" htmlType="submit">
                            Submit
                        </Button>
                        <Button className='modalButton' size="large" onClick={closeModal}>
                            Close
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default InputModal;