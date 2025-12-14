import { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { Button } from "../../components/Button";

import "./userProfile.scss";

export default function UserProfile() {
  const email = localStorage.getItem("email") || "user@example.com";

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [form] = Form.useForm();

  // ⭐ Resetujemo form svaki put kada se modal OTVORI
  useEffect(() => {
    if (openPasswordModal) {
      form.resetFields();
    }
  }, [openPasswordModal]);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>View your account information and manage your security</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <span>{email.charAt(0).toUpperCase()}</span>
          </div>

          <div className="profile-info">
            <div className="profile-info-item">
              <label>Email</label>
              <p>{email}</p>
            </div>
          </div>

          <div className="profile-actions">
            <Button
              label="Change Password"
              variant="primary"
              onClick={() => setOpenPasswordModal(true)}
            />
          </div>
        </div>
      </div>

      {/* ⭐ PASSWORD MODAL */}
      <Modal
        title="Change Password"
        open={openPasswordModal}
        onCancel={() => setOpenPasswordModal(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Current Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter a new password" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value === getFieldValue("newPassword")) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="modal-actions">
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => setOpenPasswordModal(false)}
            />

            <Button
              variant="primary"
              label="Save Changes"
              onClick={() => {
                form.validateFields().then(() => {
                  setOpenPasswordModal(false);
                });
              }}
            />
          </div>
        </Form>
      </Modal>
    </div>
  );
}
