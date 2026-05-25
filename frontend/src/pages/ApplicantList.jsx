import { useEffect, useState } from "react"
import axios from "axios"
import {
  Pencil,
  Trash2,
  FileText,
  Search,
  Users,
  Save,
  X,
} from "lucide-react"

function ApplicantList() {
  const [applicants, setApplicants] = useState([])

  const [search, setSearch] = useState("")

  const [editingId, setEditingId] =
    useState(null)

  const [editForm, setEditForm] =
    useState({})

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/applicants"
      )

      setApplicants(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApplicants()
  }, [])

  const deleteApplicant = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data?"
    )

    if (!confirmDelete) return

    try {
      await axios.delete(
        `http://localhost:5000/api/applicants/${id}`
      )

      fetchApplicants()
    } catch (error) {
      console.log(error)
    }
  }

  const startEdit = (applicant) => {
    setEditingId(applicant.id)

    setEditForm(applicant)
  }

  const cancelEdit = () => {
    setEditingId(null)

    setEditForm({})
  }

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    })
  }

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/applicants/${editingId}`,
        editForm
      )

      alert("Data berhasil diupdate")

      setEditingId(null)

      fetchApplicants()
    } catch (error) {
      console.log(error)

      alert("Gagal update data")
    }
  }

  const filteredApplicants =
    applicants.filter((item) =>
      item.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-500 rounded-[35px] p-8 text-white shadow-2xl">
        <p className="text-blue-200 mb-2">
          応募者データ管理
        </p>

        <h1 className="text-4xl font-bold">
          List Pendaftar
        </h1>

        <p className="mt-3 text-blue-100">
          Dashboard data peserta program Jepang
        </p>
      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-[30px] p-6 shadow-xl">
        <div className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-3">
          <Search className="text-slate-400" />

          <input
            type="text"
            placeholder="Cari nama pendaftar..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-[35px] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-2xl">
            <Users className="text-blue-700" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Data Pendaftar
            </h2>

            <p className="text-slate-500">
              応募者一覧
            </p>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="text-left p-5">
                  Nama
                </th>

                <th className="text-left p-5">
                  NIK
                </th>

                <th className="text-left p-5">
                  Program
                </th>

                <th className="text-left p-5">
                  No HP
                </th>

                <th className="text-center p-5">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplicants.map(
                (item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="p-5">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          name="fullName"
                          value={
                            editForm.fullName
                          }
                          onChange={
                            handleEditChange
                          }
                          className="input-modern"
                        />
                      ) : (
                        item.fullName
                      )}
                    </td>

                    <td className="p-5">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          name="nik"
                          value={editForm.nik}
                          onChange={
                            handleEditChange
                          }
                          className="input-modern"
                        />
                      ) : (
                        item.nik
                      )}
                    </td>

                    <td className="p-5">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          name="programCategory"
                          value={
                            editForm.programCategory
                          }
                          onChange={
                            handleEditChange
                          }
                          className="input-modern"
                        />
                      ) : (
                        item.programCategory
                      )}
                    </td>

                    <td className="p-5">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          name="phone"
                          value={
                            editForm.phone
                          }
                          onChange={
                            handleEditChange
                          }
                          className="input-modern"
                        />
                      ) : (
                        item.phone
                      )}
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center gap-3 flex-wrap">
                        {editingId ===
                        item.id ? (
                          <>
                            <button
                              onClick={
                                saveEdit
                              }
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl flex items-center gap-2"
                            >
                              <Save size={16} />
                              Save
                            </button>

                            <button
                              onClick={
                                cancelEdit
                              }
                              className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded-2xl flex items-center gap-2"
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                startEdit(
                                  item
                                )
                              }
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl flex items-center gap-2"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                deleteApplicant(
                                  item.id
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl flex items-center gap-2"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>

                            <a
                              href={`/cv/${item.id}`}
                              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-2xl flex items-center gap-2"
                            >
                              <FileText size={16} />
                              Generate CV
                            </a>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              )}

              {filteredApplicants.length ===
                0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-slate-400"
                  >
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ApplicantList