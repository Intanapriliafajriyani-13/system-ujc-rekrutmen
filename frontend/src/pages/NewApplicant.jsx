import { useState } from "react"
import axios from "axios"
import {
  User,
  School,
  Briefcase,
  Plus,
  Trash2,
  FileText,
} from "lucide-react"

function NewApplicant() {
  const [educations, setEducations] = useState([])

  const [works, setWorks] = useState([])

  const [form, setForm] = useState({
    fullName: "",
    japaneseName: "",
    gender: "",
    maritalStatus: "",
    fieldInterest: "",
    programCategory: "",
    nik: "",
    school: "",
    lpk: "",
    birthPlace: "",
    birthDate: "",
    religion: "",
    phone: "",
    address: "",
    height: "",
    weight: "",
    bloodType: "",
    colorBlind: "",
    minusEye: "",
    minusValue: "",
    smoking: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        level: "",
        school: "",
        major: "",
        start: "",
        end: "",
      },
    ])
  }

  const addWork = () => {
    setWorks([
      ...works,
      {
        company: "",
        position: "",
        start: "",
        end: "",
      },
    ])
  }

  const handleEducationChange = (
    index,
    field,
    value
  ) => {
    const updated = [...educations]

    updated[index][field] = value

    setEducations(updated)
  }

  const handleWorkChange = (
    index,
    field,
    value
  ) => {
    const updated = [...works]

    updated[index][field] = value

    setWorks(updated)
  }

  const deleteEducation = (index) => {
    setEducations(
      educations.filter((_, i) => i !== index)
    )
  }

  const deleteWork = (index) => {
    setWorks(
      works.filter((_, i) => i !== index)
    )
  }

  const handleSubmit = async () => {
    const requiredFields = [
      {
        key: "fullName",
        label: "Nama Lengkap",
      },
      {
        key: "gender",
        label: "Jenis Kelamin",
      },
      {
        key: "programCategory",
        label: "Kategori Program",
      },
      {
        key: "nik",
        label: "NIK",
      },
      {
        key: "phone",
        label: "No HP",
      },
      {
        key: "address",
        label: "Alamat",
      },
    ]

    const emptyFields = requiredFields.filter(
      (field) => !form[field.key]
    )

    if (emptyFields.length > 0) {
      alert(
        `Kolom berikut wajib diisi:\n\n${emptyFields
          .map((item) => `• ${item.label}`)
          .join("\n")}`
      )

      return
    }

    try {
      await axios.post(
        "http://localhost:5000/api/applicants",
        {
          ...form,
          educations,
          works,
        }
      )

      alert("Pendaftaran berhasil")

      window.location.href = "/list"
    } catch (error) {
      console.log(error)

      alert("Gagal menyimpan data")
    }
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-500 rounded-[35px] p-8 text-white shadow-2xl">
        <p className="text-blue-200 mb-2">
          日本研修生登録システム
        </p>

        <h1 className="text-4xl font-bold">
          Pendaftaran Peserta Jepang
        </h1>

        <p className="mt-3 text-blue-100">
          Sistem pendataan modern calon peserta
          program Jepang UJC
        </p>
      </div>

      {/* DATA DIRI */}

      <div className="bg-white rounded-[35px] shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-3 rounded-2xl">
            <User className="text-blue-700" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Data Diri
            </h2>

            <p className="text-slate-500">
              個人情報
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Nama Lengkap"
            name="fullName"
            onChange={handleChange}
          />

          <Input
            label="Nama Jepang"
            name="japaneseName"
            onChange={handleChange}
          />

          <Select
            label="Jenis Kelamin"
            name="gender"
            onChange={handleChange}
            options={["Pria", "Wanita"]}
          />

          <Select
            label="Status Pernikahan"
            name="maritalStatus"
            onChange={handleChange}
            options={[
              "Belum Menikah",
              "Menikah",
            ]}
          />

          <Select
            label="Minat Bidang"
            name="fieldInterest"
            onChange={handleChange}
            options={[
              "KONSTRUKSI / BANGUNAN",
              "OTOMOTIF / TEKNIK KENDARAAN RINGAN",
              "PACKING INDUSTRI",
              "PENGECATAN",
              "PENGOLAHAN MAKANAN",
              "PERAWAT LANSIA (KAIGO)",
              "PERKEBUNAN",
              "PERTANIAN",
              "PETERNAKAN",
              "PLESTER",
              "PRESS LOGAM",
              "TEKNIK PENGELASAN",
            ]}
          />

          <Select
            label="Kategori Program"
            name="programCategory"
            onChange={handleChange}
            options={[
              "Pemagangan (Jisshusei)",
              "Tokutei Ginou (TG)",
              "Engineering (Gijinkoku)",
              "Visa Pelajar (Ryuugaku)",
            ]}
          />

          <Input
            label="NIK KTP"
            name="nik"
            onChange={handleChange}
          />

          <Input
            label="Asal Sekolah"
            name="school"
            onChange={handleChange}
          />

          <Input
            label="LPK Asal"
            name="lpk"
            onChange={handleChange}
          />

          <Input
            label="Tempat Lahir"
            name="birthPlace"
            onChange={handleChange}
          />

          <DateInput
            label="Tanggal Lahir"
            name="birthDate"
            onChange={handleChange}
          />

          <Select
            label="Agama"
            name="religion"
            onChange={handleChange}
            options={[
              "Islam",
              "Kristen",
              "Katolik",
              "Hindu",
              "Buddha",
            ]}
          />

          <Input
            label="No HP"
            name="phone"
            onChange={handleChange}
          />

          <Input
            label="Tinggi Badan"
            name="height"
            onChange={handleChange}
          />

          <Input
            label="Berat Badan"
            name="weight"
            onChange={handleChange}
          />

          <Select
            label="Golongan Darah"
            name="bloodType"
            onChange={handleChange}
            options={["A", "B", "AB", "O"]}
          />

          <Select
            label="Buta Warna"
            name="colorBlind"
            onChange={handleChange}
            options={[
              "Tidak",
              "Ya",
            ]}
          />

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Mata Minus
            </label>

            <div className="flex gap-3">
              <select
                name="minusEye"
                onChange={handleChange}
                className="input-modern"
              >
                <option value="">
                  Pilih
                </option>

                <option value="Tidak">
                  Tidak
                </option>

                <option value="Ya">
                  Ya
                </option>
              </select>

              <input
                type="text"
                placeholder="Besaran Minus (Opsional)"
                name="minusValue"
                onChange={handleChange}
                className="input-modern"
              />
            </div>
          </div>

          <Select
            label="Merokok"
            name="smoking"
            onChange={handleChange}
            options={[
              "Tidak",
              "Ya",
            ]}
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Alamat Lengkap
          </label>

          <textarea
            name="address"
            rows="4"
            onChange={handleChange}
            className="input-modern"
          />
        </div>
      </div>

      {/* RIWAYAT PENDIDIKAN */}

      <div className="bg-white rounded-[35px] shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <School className="text-blue-700" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Riwayat Pendidikan
              </h2>

              <p className="text-slate-500">
                学歴
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addEducation}
            className="bg-gradient-to-r from-blue-800 to-blue-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
          >
            <Plus size={18} />
            Tambah
          </button>
        </div>

        {educations.map((edu, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <select
                className="input-modern"
                onChange={(e) =>
                  handleEducationChange(
                    index,
                    "level",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Pilih Jenjang
                </option>

                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA/SMK">
                  SMA/SMK
                </option>
                <option value="D1">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
              </select>

              <input
                placeholder="Nama Sekolah"
                className="input-modern"
                onChange={(e) =>
                  handleEducationChange(
                    index,
                    "school",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Jurusan"
                className="input-modern"
                onChange={(e) =>
                  handleEducationChange(
                    index,
                    "major",
                    e.target.value
                  )
                }
              />

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Masuk
                </label>

                <input
                  type="month"
                  className="input-modern"
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "start",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Lulus
                </label>

                <input
                  type="month"
                  className="input-modern"
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "end",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                deleteEducation(index)
              }
              className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl flex items-center gap-2"
            >
              <Trash2 size={16} />
              Hapus
            </button>
          </div>
        ))}
      </div>

      {/* PENGALAMAN KERJA */}

      <div className="bg-white rounded-[35px] shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <Briefcase className="text-blue-700" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Pengalaman Kerja
              </h2>

              <p className="text-slate-500">
                職歴
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addWork}
            className="bg-gradient-to-r from-blue-800 to-blue-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
          >
            <Plus size={18} />
            Tambah
          </button>
        </div>

        {works.map((work, index) => (
          <div
            key={index}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                placeholder="Nama Perusahaan"
                className="input-modern"
                onChange={(e) =>
                  handleWorkChange(
                    index,
                    "company",
                    e.target.value
                  )
                }
              />

              <input
                placeholder="Posisi"
                className="input-modern"
                onChange={(e) =>
                  handleWorkChange(
                    index,
                    "position",
                    e.target.value
                  )
                }
              />

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Masuk
                </label>

                <input
                  type="month"
                  className="input-modern"
                  onChange={(e) =>
                    handleWorkChange(
                      index,
                      "start",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Selesai
                </label>

                <input
                  type="month"
                  className="input-modern"
                  onChange={(e) =>
                    handleWorkChange(
                      index,
                      "end",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => deleteWork(index)}
              className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl flex items-center gap-2"
            >
              <Trash2 size={16} />
              Hapus
            </button>
          </div>
        ))}
      </div>

      {/* BUTTON */}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
          className="bg-slate-300 hover:bg-slate-400 text-slate-700 px-6 py-3 rounded-2xl font-semibold"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-900 to-blue-500 hover:opacity-90 text-white px-8 py-3 rounded-2xl font-semibold shadow-xl flex items-center gap-2"
        >
          <FileText size={18} />
          Daftarkan Siswa & CV
        </button>
      </div>
    </div>
  )
}

function Input({
  label,
  name,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-2">
        {label}
      </label>

      <input
        type="text"
        name={name}
        onChange={onChange}
        className="input-modern"
      />
    </div>
  )
}

function DateInput({
  label,
  name,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-2">
        {label}
      </label>

      <input
        type="date"
        name={name}
        onChange={onChange}
        className="input-modern"
      />
    </div>
  )
}

function Select({
  label,
  name,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-2">
        {label}
      </label>

      <select
        name={name}
        onChange={onChange}
        className="input-modern"
      >
        <option value="">
          Pilih
        </option>

        {options.map((option, index) => (
          <option
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default NewApplicant