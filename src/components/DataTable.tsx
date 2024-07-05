import "./dataTable.css";
import  { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DataTable = () => {

  const [posts, setPosts] = useState<Post[]>([]);
 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'custom-header' },
    { field: 'userId', headerName: 'User ID', width: 130, headerClassName: 'custom-header' },
    { field: 'title', headerName: 'Title', width: 300, headerClassName: 'custom-header' },
    { field: 'body', headerName: 'Body', width: 500, headerClassName: 'custom-header' },
  ];

  return <>
   <h1>Posts Table</h1>
   <DataGrid rows={posts} columns={columns} checkboxSelection className="dataTable" /> 
   </>;
};

export default DataTable;
