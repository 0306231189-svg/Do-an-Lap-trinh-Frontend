import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NotFound from './Pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Notes from './Pages/Notes'
import Settings from './Pages/Settings'
import Edit from './Pages/Edit'
import Home from './Pages/Home'
import Private from './Pages/private'
import Add from './Pages/Add'
import Profile from './Pages/Profile'
import { useEffect } from 'react'
import { useAuth } from './Context/AuthContext'
function App() {
  const { userLocal } = useAuth();
  const [note_CongViec, setNote_CongViec] = useState([]);
  const [note_HocTap, setNote_HocTap] = useState([]);
  const [note_Private, setNote_Private] = useState([]);
  useEffect(() => {

    if (!userLocal?.email) return;


    const fetchAllNotes = async () => {
      try {

        const resHocTap = await fetch(`http://localhost:5000/api/notes/${userLocal.email}/hoc-tap`);
        const dataHocTap = await resHocTap.json();
        if (dataHocTap.success) {
          setNote_HocTap(dataHocTap.notes || []);
        }


        const resCongViec = await fetch(`http://localhost:5000/api/notes/${userLocal.email}/cong-viec`);
        const dataCongViec = await resCongViec.json();
        if (dataCongViec.success) {
          setNote_CongViec(dataCongViec.notes || []);
        }


        const resPrivate = await fetch(`http://localhost:5000/api/private/${userLocal.email}`);
        const dataPrivate = await resPrivate.json();
        if (dataPrivate.success) {
          setNote_Private(dataPrivate.notes || []);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách ghi chú:", err);
      }
    };

    fetchAllNotes();
  }, [userLocal?.email]);
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home
            note_CongViec={note_CongViec}
            note_Private={note_Private}
            note_HocTap={note_HocTap}
          />}
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/notes' element={<ProtectedRoute>
            {<Notes
              note_HocTap={note_HocTap}
              note_CongViec={note_CongViec}
            />}
          </ProtectedRoute>} />
          <Route path='/settings' element={<ProtectedRoute>
            {<Settings />}
          </ProtectedRoute>} />
          <Route path='/private' element={<ProtectedRoute>
            {<Private />}
          </ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute>
            {<Profile />}
          </ProtectedRoute>} />
          <Route path='/notes/add' element={<Add />} />
          <Route path="notes/edit/:id/:topic" element={<Edit />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
