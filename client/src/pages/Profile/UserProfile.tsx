import { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { Button } from "../../components/Button";
import { useCurrentUser, useLogin } from "../../hooks";
import { useResetPasswordLoggedIn } from "../../hooks/useResetPasswordLoggedIn";



import "./userProfile.scss";
import { Navigate } from "react-router-dom";

export default function UserProfile() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const isAuthenticated = !isLoading && !!currentUser;

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [form] = Form.useForm();
  const loginMutation = useLogin();
  const resetPasswordLoggedInMutation = useResetPasswordLoggedIn();

  // ⭐ Resetujemo form svaki put kada se modal OTVORI
  useEffect(() => {
    if (openPasswordModal) {
      form.resetFields();
    }
  }, [openPasswordModal]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChangePassword = async (values: any) => {
  try {
        await loginMutation.mutateAsync({
          email: currentUser.email,
          password: values.oldPassword,
        });
        await resetPasswordLoggedInMutation.mutateAsync({
          email: currentUser.email,
          newPassword: values.newPassword,
      });
      setOpenPasswordModal(false)
      setOpenSuccess(true)
      }catch (error: unknown) {
        form.setFields([
          {
            name: "oldPassword",
            errors: ["Incorrect password"],
          },
        ]);
      }
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>View your account information and manage your security</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <span>{currentUser.email.charAt(0).toUpperCase()}</span>
          </div>

          <div className="profile-info">
            <div className="profile-info-item">
              <label>Email</label>
              {isLoading ? (
                <div className="loading-user">Loading...</div>
              ) : isAuthenticated ? (
                <p>{currentUser.email}</p>
              ) : (<div></div>)
            }
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
        <Form layout="vertical" form={form} onFinish={handleChangePassword}>
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

            <Button type="submit" className="btn btn-primary" variant="primary" label="Save Changes">
              Save Changes
            </Button >
          </div>
        </Form>
      </Modal>
      <Modal
        title={<div style={{ textAlign: "center", width: "100%" }}>Successfully changed</div>}
        open={openSuccess}
        onCancel={() => setOpenSuccess(false)}
        footer={null}
        destroyOnClose
        centered
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="primary"
              label="Cancel"
              onClick={() => setOpenSuccess(false)}
            />
          </div>
      </Modal>
    </div>
  );
}
