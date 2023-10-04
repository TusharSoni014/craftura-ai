import React, { useState } from "react";
import "./contact-page.scss";
import { SiGmail } from "react-icons/si";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { errorMessageHandler } from "../utils/utilFunctions";
import axiosClient from "../utils/axiosClient";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const emailAddress = import.meta.env.VITE_CONTACT_EMAIL;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await axiosClient.post("/contact", {
        name: values.name,
        email: values.email,
        description: values.description,
      });
      form.resetFields();
      toast.success("Email sent successfully");
    } catch (error) {
      errorMessageHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="contact-page-container">
        <div className="left">
          <h1>Contact Us</h1>
          <p>
            We're here to assist you with any questions, comments, or inquiries
            you may have. Whether you're looking for support, information, or
            just want to say hello, feel free to get in touch with us using the
            contact details provided below.
          </p>
        </div>
        <div className="right">
          <Form
            form={form}
            name="contact-message"
            className="contact-form-container"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea
                className="contact-description-textarea"
                rows={10}
                placeholder="Description"
              />
            </Form.Item>
            <div className="submit-btn-container">
              <Button
                loading={isLoading}
                className="submit-btn"
                type="primary"
                htmlType="submit"
              >
                Send Message
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}
