import { useEffect, useMemo, useState } from "react";
import { Modal, Table, Form, Input } from "antd";
import axios from "axios";
import { Button } from "../../components/Button";
import { CompactPagination } from "../../components/CompactPagination";
import { ConfirmModal } from "../../components/ConfirmModal";

interface User {
  id: number;
  email: string;
}

const PAGE_SIZE = 8;

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(0);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/users`)
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleCreateUser = async () => {
    try {
      const values = await form.validateFields();

      const newUser: User = {
        id: Date.now(),
        email: values.email,
      };

      setUsers((prev) => [...prev, newUser]);
      setOpen(false);
      form.resetFields();
    } catch {}
  };

  const handleDelete = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    setUserToDelete(user);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;

    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setDeleteOpen(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
    setUserToDelete(null);
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Actions",
      render: (_: any, record: User) => (
        <Button
          variant="secondary"
          label="Delete"
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  const pagedUsers = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return users.slice(start, end);
  }, [users, currentPage]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        padding: 32,
        boxShadow: "0 8px 25px rgba(0,0,0,0.06)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 30 }}>Users</h1>

        <Button
          variant="primary"
          label="+ Add User"
          onClick={() => {
            form.resetFields();
            setOpen(true);
          }}
        />
      </div>

      <Table columns={columns} dataSource={pagedUsers} rowKey="id" pagination={false} />

      <div style={{ marginTop: 20 }}>
        <CompactPagination
          currentPage={currentPage}
          totalElements={users.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        title="Add User"
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter Email" }]}>
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter Password" }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20, gap: 12 }}>
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => {
                setOpen(false);
                form.resetFields();
              }}
            />

            <Button variant="primary" label="Create" onClick={handleCreateUser} />
          </div>
        </Form>
      </Modal>

      <ConfirmModal
        open={deleteOpen}
        title="Delete User"
        description={`Are you sure you want to delete user ${userToDelete?.email}?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
