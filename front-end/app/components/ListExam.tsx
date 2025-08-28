import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import api from '../lib/api';

export function DataTable() {
  const [exams, setExams] = useState([]);
  const paginationModel = { page: 0, pageSize: 10 };

  const handleEdit = (id: number) => {
    console.log("Edit exam with id:", id);
    // 👉 mở modal hoặc điều hướng sang trang edit
  };

  const handleDelete = async (id: number) => {
    console.log("Delete exam with id:", id);
    // 👉 gọi API xóa
    // await api.delete(`/exam/${id}`);
    // getExams(); // load lại list
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Tiêu đề', width: 200 },
    { field: 'description', headerName: 'Mô tả', width: 300 },
    { field: 'duration', headerName: 'Thời lượng (phút)', width: 150 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 180,
      valueFormatter: (params) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'updatedAt',
      headerName: 'Cập nhật lần cuối',
      width: 180,
      valueFormatter: (params) => new Date(params).toLocaleDateString(),
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const getExams = async () => {
    const res =  await api.get('/exam');
    if(res.data.success){
      setExams(res.data.data);
    }
  }

  useEffect(()=>{
    getExams();
  },[])
  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={exams}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
