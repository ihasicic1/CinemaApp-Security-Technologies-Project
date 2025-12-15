import { useEffect, useMemo, useState } from "react";
import { Modal, Table, Form, Input } from "antd";
import axios from "axios";
import { Button } from "../../components/Button";
import { CompactPagination } from "../../components/CompactPagination";
import { ConfirmModal } from "../../components/ConfirmModal";

interface Venue {
  id: number;
  name: string;
  street: string;
  image_url: string;
  location_id: number;
}

const PAGE_SIZE = 8;

export default function VenuesAdmin() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(0);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<Venue | null>(null);
  const [venueToEdit, setVenueToEdit] = useState<Venue | null>(null);

  // ✅ SAFE FETCH VENUES
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!baseUrl) {
      console.error("❌ VITE_API_BASE_URL is undefined!");
      setVenues([]);
      return;
    }

    axios
      .get(`${baseUrl}/venues`)
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setVenues(data);
      })
      .catch((err) => {
        console.error("❌ VENUES FETCH ERROR:", err);
        setVenues([]);
      });
  }, []);

  // ✅ CREATE VENUE
  const handleCreateVenue = async () => {
    try {
      const values = await form.validateFields();

      const newVenue: Venue = {
        id: Date.now(),
        name: values.name,
        street: values.street,
        image_url: values.image_url || "",
        location_id: Number(values.location_id),
      };

      setVenues((prev) => [...prev, newVenue]);
      setOpenAdd(false);
      form.resetFields();
    } catch (err) {
      console.error("CREATE ERROR:", err);
    }
  };

  // ✅ OPEN EDIT
  const handleEdit = (venue: Venue) => {
    setVenueToEdit(venue);

    editForm.setFieldsValue({
      name: venue.name || "",
      street: venue.street || "",
      image_url: venue.image_url || "",
      location_id: venue.location_id || 0,
    });

    setOpenEdit(true);
  };

  // ✅ SAVE EDIT
  const handleSaveEdit = async () => {
    try {
      if (!venueToEdit) return;

      const values = await editForm.validateFields();

      const updatedVenue: Venue = {
        ...venueToEdit,
        ...values,
        image_url: values.image_url || "",
        location_id: Number(values.location_id),
      };

      setVenues((prev) =>
        prev.map((v) => (v.id === updatedVenue.id ? updatedVenue : v))
      );

      setOpenEdit(false);
      setVenueToEdit(null);
    } catch (err) {
      console.error("EDIT ERROR:", err);
    }
  };

  // ✅ OPEN DELETE MODAL
  const handleDeleteOpen = (venue: Venue) => {
    setVenueToDelete(venue);
    setDeleteOpen(true);
  };

  // ✅ CONFIRM DELETE
  const confirmDelete = () => {
    if (!venueToDelete) return;

    setVenues((prev) => prev.filter((v) => v.id !== venueToDelete.id));
    setDeleteOpen(false);
    setVenueToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
    setVenueToDelete(null);
  };

  // ✅ TABLE COLUMNS
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Street", dataIndex: "street" },
    { title: "Image URL", dataIndex: "image_url" },
    { title: "Location ID", dataIndex: "location_id" },
    {
      title: "Actions",
      render: (_: any, record: Venue) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            variant="primary"
            label="Edit"
            onClick={() => handleEdit(record)}
          />
          <Button
            variant="secondary"
            label="Delete"
            onClick={() => handleDeleteOpen(record)}
          />
        </div>
      ),
    },
  ];

  // ✅ SAFE PAGINATION
  const pagedVenues = useMemo(() => {
    if (!Array.isArray(venues)) return [];

    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return venues.slice(start, end);
  }, [venues, currentPage]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        padding: 32,
        boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
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
        <h1 style={{ margin: 0, fontSize: 30}}>Venues</h1>

        <Button
          variant="primary"
          label="+ Add Venue"
          onClick={() => {
            form.resetFields();
            setOpenAdd(true);
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={pagedVenues}
        rowKey="id"
        pagination={false}
      />

      <div style={{ marginTop: 20 }}>
        <CompactPagination
          currentPage={currentPage}
          totalElements={venues.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        title="Add Venue"
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Street" name="street" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Image URL" name="image_url">
            <Input />
          </Form.Item>

          <Form.Item
            label="Location ID"
            name="location_id"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => setOpenAdd(false)}
            />
            <Button
              variant="primary"
              label="Create"
              onClick={handleCreateVenue}
            />
          </div>
        </Form>
      </Modal>

      <Modal
        title="Edit Venue"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={editForm}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Street" name="street" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Image URL" name="image_url">
            <Input />
          </Form.Item>

          <Form.Item
            label="Location ID"
            name="location_id"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => setOpenEdit(false)}
            />
            <Button
              variant="primary"
              label="Save Changes"
              onClick={handleSaveEdit}
            />
          </div>
        </Form>
      </Modal>

      <ConfirmModal
        open={deleteOpen}
        title="Delete Venue"
        description={`Are you sure you want to delete venue "${venueToDelete?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
