import { useEffect, useMemo, useState } from "react";
import { Modal, Table, Form, Input } from "antd";
import axios from "axios";
import { Button } from "../../components/Button";
import { CompactPagination } from "../../components/CompactPagination";
import { ConfirmModal } from "../../components/ConfirmModal";

interface Movie {
  id: number;
  title: string;
  duration: number;
  pg_rating: string;
  language: string;
  director: string;
}

const PAGE_SIZE = 8;

export default function MoviesAdmin() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(0);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);

  // FETCH MOVIES
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/movies`)
      .then((res) => setMovies(res.data))
      .catch(() => setMovies([]));
  }, []);

  // CREATE MOVIE
  const handleCreateMovie = async () => {
    try {
      const values = await form.validateFields();

      const newMovie: Movie = {
        id: Date.now(),
        title: values.title,
        duration: values.duration,
        pg_rating: values.pg_rating,
        language: values.language,
        director: values.director,
      };

      setMovies((prev) => [...prev, newMovie]);
      setOpenAdd(false);
      form.resetFields();
    } catch {}
  };

  // OPEN EDIT
  const handleEdit = (movie: Movie) => {
    setMovieToEdit(movie);

    // Pre-fill form
    editForm.setFieldsValue({
      title: movie.title,
      duration: movie.duration,
      pg_rating: movie.pg_rating,
      language: movie.language,
      director: movie.director,
    });

    setOpenEdit(true);
  };

  // SAVE EDIT
  const handleSaveEdit = async () => {
    try {
      const values = await editForm.validateFields();

      const updatedMovie: Movie = {
        ...movieToEdit!,
        ...values,
      };

      setMovies((prev) =>
        prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
      );

      setOpenEdit(false);
      setMovieToEdit(null);
    } catch {}
  };

  // OPEN DELETE MODAL
  const handleDeleteOpen = (movie: Movie) => {
    setMovieToDelete(movie);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!movieToDelete) return;

    setMovies((prev) => prev.filter((m) => m.id !== movieToDelete.id));
    setDeleteOpen(false);
    setMovieToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
    setMovieToDelete(null);
  };

  // TABLE COLUMNS
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Title", dataIndex: "title" },
    { title: "Duration (min)", dataIndex: "duration" },
    { title: "PG Rating", dataIndex: "pg_rating" },
    { title: "Language", dataIndex: "language" },
    { title: "Director", dataIndex: "director" },
    {
      title: "Actions",
      render: (_: any, record: Movie) => (
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

  const pagedMovies = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return movies.slice(start, end);
  }, [movies, currentPage]);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        padding: 32,
        boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 30 }}>Movies</h1>

        <Button
          variant="primary"
          label="+ Add Movie"
          onClick={() => {
            form.resetFields();
            setOpenAdd(true);
          }}
        />
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={pagedMovies}
        rowKey="id"
        pagination={false}
      />

      {/* PAGINATION */}
      <div style={{ marginTop: 20 }}>
        <CompactPagination
          currentPage={currentPage}
          totalElements={movies.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ADD MOVIE MODAL */}
      <Modal
        title="Add Movie"
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Duration (min)"
            name="duration"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="PG Rating"
            name="pg_rating"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Language"
            name="language"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Director"
            name="director"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => setOpenAdd(false)}
            />
            <Button variant="primary" label="Create" onClick={handleCreateMovie} />
          </div>
        </Form>
      </Modal>

      {/* EDIT MOVIE MODAL */}
      <Modal
        title="Edit Movie"
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={editForm}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Duration (min)"
            name="duration"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="PG Rating"
            name="pg_rating"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Language"
            name="language"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Director"
            name="director"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => setOpenEdit(false)}
            />

            <Button variant="primary" label="Save Changes" onClick={handleSaveEdit} />
          </div>
        </Form>
      </Modal>

      {/* DELETE CONFIRM MODAL */}
      <ConfirmModal
        open={deleteOpen}
        title="Delete Movie"
        description={`Are you sure you want to delete the movie "${movieToDelete?.title}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
