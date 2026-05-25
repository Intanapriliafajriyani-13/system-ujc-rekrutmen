import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import html2pdf from "html2pdf.js"

function CVPage() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const cvRef = useRef()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/applicants/${id}`)
      setData(res.data)
    } catch (error) {
      console.error("Gagal mengambil data pelamar:", error)
    }
  }

  const downloadPDF = () => {
    const element = cvRef.current
    const opt = {
      margin: 0,
      filename: `CV_${data?.fullName || "Pelamar"}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }
    html2pdf().set(opt).from(element).save()
  }

  if (!data) return <div className="p-10 text-center font-semibold">Loading data pelamar...</div>

  return (
    <div className="p-6 bg-slate-100 min-h-screen dynamic-cv-container">
      {/* Tombol Aksi Kontrol */}
      <div className="flex gap-4 mb-6 no-print max-w-[8.5in] mx-auto">
        <button
          onClick={() => window.print()}
          className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm"
        >
          Print / Cetak
        </button>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm"
        >
          Download PDF
        </button>
      </div>

      {/* Kertas CV (Mengikuti Rasio Cetak A4/Letter) */}
      <div ref={cvRef} className="print-area mx-auto bg-white text-black text-xs font-sans leading-relaxed p-[0.4in] max-w-[8.5in]">
        
        {/* ==================== HALAMAN 1 ==================== */}
        <div className="page-section mb-10">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="text-sm font-medium tracking-wide text-slate-600">履歴書</div>
            <h1 className="text-xl font-bold tracking-widest text-black mt-0.5">BIODATA - CV</h1>
          </div>

          {/* Tabel Utama Biodata */}
          <div className="border border-blue-400 grid grid-cols-12 text-[11px]">
            {/* Baris 1: Nama */}
            <div className="col-span-3 border-r border-b border-blue-400 p-1.5 bg-white">
              <div className="font-semibold text-slate-800">Nama:</div>
              <div className="text-[10px] text-gray-500">氏名</div>
            </div>
            <div className="col-span-7 border-r border-b border-blue-400 p-1.5 font-medium flex items-center capitalize text-sm">
              {data.fullName || "---"}
            </div>
            <div className="col-span-2 border-b border-blue-400 p-1.5 bg-slate-50 text-center flex flex-col justify-center items-center text-gray-400 text-[10px]">
              Pas Foto
              <span>(4x6)</span>
            </div>

            {/* Baris 2: Tanggal Lahir & Umur */}
            <div className="col-span-3 border-r border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">Tanggal Lahir:</div>
              <div className="text-[10px] text-gray-500">生年月日</div>
            </div>
            <div className="col-span-4 border-r border-b border-blue-400 p-1.5 flex items-center">
              {data.birthDate || "2000 年 03 年 13 日"}
            </div>
            <div className="col-span-1 border-r border-b border-blue-400 p-1.5 bg-white">
              <div className="font-semibold text-slate-800">Umur:</div>
              <div className="text-[10px] text-gray-500">年齢</div>
            </div>
            <div className="col-span-2 border-r border-b border-blue-400 p-1.5 flex items-center">
              {data.age ? `${data.age} Tahun` : "---"} <span className="text-[9px] text-gray-400 ml-1">({data.age || "---"} 歳)</span>
            </div>
            <div className="col-span-2 border-b border-blue-400 bg-slate-50"></div>

            {/* Baris 3: Jenis Kelamin & Status */}
            <div className="col-span-3 border-r border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">Jenis Kelamin:</div>
              <div className="text-[10px] text-gray-500">性別</div>
            </div>
            <div className="col-span-4 border-r border-b border-blue-400 p-1.5 flex items-center">
              {data.gender === "Laki-laki" ? "男性" : data.gender === "Perempuan" ? "女性" : (data.gender || "---")}
            </div>
            <div className="col-span-1 border-r border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">Status:</div>
              <div className="text-[10px] text-gray-500">配偶者</div>
            </div>
            <div className="col-span-2 border-r border-b border-blue-400 p-1.5 flex items-center">
              {data.maritalStatus || "---"}
            </div>
            <div className="col-span-2 border-b border-blue-400 bg-slate-50"></div>

            {/* Baris 4: Alamat Rumah */}
            <div className="col-span-3 border-r border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">Alamat Rumah:</div>
              <div className="text-[10px] text-gray-500">本国の住所地</div>
            </div>
            <div className="col-span-7 border-r border-b border-blue-400 p-1.5 flex items-center">
              {data.address || "---"}
            </div>
            <div className="col-span-2 border-b border-blue-400 bg-slate-50"></div>

            {/* Baris 5: Tempat Lahir & No Telp */}
            <div className="col-span-3 border-r border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">Tempat Lahir:</div>
              <div className="text-[10px] text-gray-500">出生地</div>
            </div>
            <div className="col-span-3 border-r border-b border-blue-400 p-1.5 flex items-center uppercase">
              {data.birthPlace || "---"}
            </div>
            <div className="col-span-2 border-r border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">No Telp:</div>
              <div className="text-[10px] text-gray-500">電話番号</div>
            </div>
            <div className="col-span-4 border-b border-blue-400 p-1.5 flex items-center">
              {data.phone || "---"}
            </div>

            {/* Baris 6: Agama */}
            <div className="col-span-3 border-r border-b border-blue-400 p-1.5">
              <span className="font-semibold text-slate-800">Agama</span>
              <span className="text-[10px] text-gray-500 ml-1">宗教:</span>
            </div>
            <div className="col-span-9 border-b border-blue-400 p-1.5 flex items-center">
              {data.religion || "---"}
            </div>

            {/* Baris 7: Fisik (Tinggi, Berat, Gol Darah) */}
            <div className="col-span-4 border-r border-b border-blue-400 p-1.5 grid grid-cols-2">
              <div>
                <div className="font-semibold text-slate-800">Tinggi Badan:</div>
                <div className="text-[10px] text-gray-500">身長</div>
              </div>
              <div className="flex items-center justify-end font-medium pr-2">{data.height || "---"} Cm</div>
            </div>
            <div className="col-span-4 border-r border-b border-blue-400 p-1.5 grid grid-cols-2">
              <div>
                <div className="font-semibold text-slate-800">Berat Badan:</div>
                <div className="text-[10px] text-gray-500">体重</div>
              </div>
              <div className="flex items-center justify-end font-medium pr-2">{data.weight || "---"} Kg</div>
            </div>
            <div className="col-span-4 border-b border-blue-400 p-1.5 grid grid-cols-2">
              <div>
                <div className="font-semibold text-slate-800">Golongan Darah:</div>
                <div className="text-[10px] text-gray-500">血液型</div>
              </div>
              <div className="flex items-center justify-end font-medium pr-2">{data.bloodType || "---"}</div>
            </div>

            {/* Baris 8: Ukuran Pakaian dll */}
            <div className="col-span-4 border-r border-b border-blue-400 p-1.5 grid grid-cols-2">
              <div>
                <div className="font-semibold text-slate-800">Ukuran Sepatu:</div>
                <div className="text-[10px] text-gray-500">靴サイズ</div>
              </div>
              <div className="flex items-center justify-end font-medium pr-2">{data.shoeSize || "---"} Cm</div>
            </div>
            <div className="col-span-4 border-r border-b border-blue-400 p-1.5 grid grid-cols-2">
              <div>
                <div className="font-semibold text-slate-800">Ukuran Pinggang:</div>
                <div className="text-[10px] text-gray-500">ウエスト</div>
              </div>
              <div className="flex items-center justify-end font-medium pr-2">{data.waistSize || "---"} Cm</div>
            </div>
            <div className="col-span-4 border-b border-blue-400 p-1.5 grid grid-cols-2">
              <div>
                <div className="font-semibold text-slate-800">Ukuran Kepala:</div>
                <div className="text-[10px] text-gray-500">頭のサイズ</div>
              </div>
              <div className="flex items-center justify-end font-medium pr-2">{data.headSize || "---"} Cm</div>
            </div>

            {/* Baris 9: Kebiasaan Merokok & Sake */}
            <div className="col-span-6 border-r border-b border-blue-400 p-1.5 grid grid-cols-12 gap-1">
              <div className="col-span-3">
                <div className="font-semibold text-slate-800">Merokok:</div>
                <div className="text-[10px] text-gray-500">タバコ</div>
              </div>
              <div className="col-span-9 text-[10px] space-y-0.5">
                <div>Saat Ini <span className="text-gray-400">現在</span> : <span className="font-medium">{data.isSmoking ? "吸います" : "吸いません。"}</span></div>
                <div>Di Jepang <span className="text-gray-400">今後</span> : <span className="font-medium">{data.willSmokeInJapan ? "吸います" : "吸いません。"}</span></div>
              </div>
            </div>
            <div className="col-span-6 border-b border-blue-400 p-1.5 grid grid-cols-12 gap-1">
              <div className="col-span-3">
                <div className="font-semibold text-slate-800">Minum Sake:</div>
                <div className="text-[10px] text-gray-500">飲酒</div>
              </div>
              <div className="col-span-9 flex items-center font-medium">
                {data.isDrinking ? "お酒を飲みます" : "全然酒を飲みません"}
              </div>
            </div>

            {/* Baris 10: Penglihatan & Tangan Dominan */}
            <div className="col-span-6 border-r border-b border-blue-400 p-1.5 grid grid-cols-12">
              <div className="col-span-3">
                <div className="font-semibold text-slate-800">Vision:</div>
                <div className="text-[10px] text-gray-500">視力</div>
              </div>
              <div className="col-span-9 grid grid-cols-2 text-[10px]">
                <div>右 Kanan: <span className="font-medium">{data.visionRight || "1.0"}</span></div>
                <div>左 Kiri: <span className="font-medium">{data.visionLeft || "1.0"}</span></div>
              </div>
            </div>
            <div className="col-span-6 border-b border-blue-400 p-1.5 grid grid-cols-12">
              <div className="col-span-4">
                <div className="font-semibold text-slate-800">Penggunaan Tangan:</div>
                <div className="text-[10px] text-gray-500">利き手:</div>
              </div>
              <div className="col-span-8 flex items-center font-medium">
                {data.dominantHand === "Kiri" ? "左利き" : "右利き"}
              </div>
            </div>

            {/* Baris 11: Hobi, Bakat, Buta Warna */}
            <div className="col-span-4 border-r border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">Hobi: <span className="text-[10px] text-gray-500 font-normal">趣味</span></div>
              <div className="mt-1 font-medium text-gray-700">{data.hobby || "---"}</div>
            </div>
            <div className="col-span-4 border-r border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">Bakat Khusus: <span className="text-[10px] text-gray-500 font-normal">特技</span></div>
              <div className="mt-1 font-medium text-gray-700">{data.specialSkill || "---"}</div>
            </div>
            <div className="col-span-4 border-b border-blue-400 p-1.5">
              <div className="font-semibold text-slate-800">Buta Warna: <span className="text-[10px] text-gray-500 font-normal">色覚障害</span></div>
              <div className="mt-2 flex items-center gap-4 text-[10px]">
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={data.isColorBlind === true} disabled className="accent-blue-600 scale-90" /> 有 (Ya)
                </label>
                <label className="flex items-center gap-1">
                  <input type="checkbox" checked={data.isColorBlind !== true} disabled className="accent-blue-600 scale-90" /> 無 (Tidak)
                </label>
              </div>
            </div>

            {/* Baris 12: Kelebihan & Kekurangan */}
            <div className="col-span-12 border-b border-blue-400 p-2 text-[10px]">
              <div className="font-semibold text-slate-800 text-[11px]">Kelebihan & Kekurangan <span className="text-gray-500 font-normal">自己の長所と短所:</span></div>
              <div className="mt-1">
                <span className="font-bold text-gray-900">長所 Kelebihan:</span>
                <p className="text-gray-700 mt-0.5 whitespace-pre-line">{data.strengths || "---"}</p>
              </div>
              <div className="mt-2">
                <span className="font-bold text-gray-900">短所 Kekurangan:</span>
                <p className="text-gray-700 mt-0.5 whitespace-pre-line">{data.weaknesses || "---"}</p>
              </div>
            </div>

            {/* Baris 13: Tujuan ke Jepang */}
            <div className="col-span-12 border-b border-blue-400 p-2 text-[10px]">
              <div className="font-semibold text-slate-800 text-[11px]">Tujuan ke Jepang: <span className="text-gray-500 font-normal">日本へ行く目的</span></div>
              <p className="text-gray-700 mt-1 whitespace-pre-line">{data.purposeToJapan || "---"}</p>
            </div>

            {/* Baris 14: Target Menabung */}
            <div className="col-span-12 p-2 text-[10px] grid grid-cols-12">
              <div className="col-span-3 font-semibold text-slate-800 text-[11px]">
                Target Menabung: <div className="text-gray-500 font-normal text-[10px]">日本で3年間貯金目標</div>
              </div>
              <div className="col-span-9 flex items-center font-bold text-slate-900 text-sm">
                {data.savingTargetRp ? `Rp ${Number(data.savingTargetRp).toLocaleString('id-ID')}` : "Rp 250.000.000"} 
                <span className="text-xs text-gray-500 font-normal ml-2">({data.savingTargetYen || "約 2,500,000円"})</span>
              </div>
            </div>
          </div>

          {/* Sub-Tabel 1: Pendidikan */}
          <div className="mt-6">
            <h2 className="text-sm font-bold text-black mb-2 flex items-center uppercase">
              PENDIDIKAN <span className="text-xs text-gray-500 font-normal ml-1.5">学歴</span>
            </h2>
            <table className="w-full border-collapse border border-blue-400 text-center text-[10px]">
              <thead>
                <tr className="bg-white text-blue-900 font-bold">
                  <th colSpan="2" className="border border-blue-400 p-1 text-[11px]">MASUK SEKOLAH <span className="text-[9px] block text-gray-500 font-normal">入学</span></th>
                  <th colSpan="2" className="border border-blue-400 p-1 text-[11px]">LULUS SEKOLAH <span className="text-[9px] block text-gray-500 font-normal">卒業</span></th>
                  <th className="border border-blue-400 p-1 text-[11px] align-middle" rowSpan="2">NAMA SEKOLAH <span className="text-[9px] block text-gray-500 font-normal">学校名</span></th>
                  <th className="border border-blue-400 p-1 text-[11px] align-middle" rowSpan="2">JURUSAN <span className="text-[9px] block text-gray-500 font-normal">学校学科専門</span></th>
                </tr>
                <tr className="bg-white text-blue-900 font-bold border-b border-blue-400">
                  <th className="border border-blue-400 p-0.5 w-[12%] text-[10px]">THN <span className="font-normal text-gray-500 text-[9px]">年</span></th>
                  <th className="border border-blue-400 p-0.5 w-[10%] text-[10px]">BLN <span className="font-normal text-gray-500 text-[9px]">月</span></th>
                  <th className="border border-blue-400 p-0.5 w-[12%] text-[10px]">THN <span className="font-normal text-gray-500 text-[9px]">年</span></th>
                  <th className="border border-blue-400 p-0.5 w-[10%] text-[10px]">BLN <span className="font-normal text-gray-500 text-[9px]">月</span></th>
                </tr>
              </thead>
              <tbody>
                {data.educations && data.educations.length > 0 ? (
                  data.educations.map((edu, index) => (
                    <tr key={index} className="text-gray-800">
                      <td className="border border-blue-400 p-1.5">{edu.startYear}</td>
                      <td className="border border-blue-400 p-1.5">{edu.startMonth}</td>
                      <td className="border border-blue-400 p-1.5">{edu.endYear}</td>
                      <td className="border border-blue-400 p-1.5">{edu.endMonth}</td>
                      <td className="border border-blue-400 p-1.5 text-left font-medium px-2">{edu.schoolName}</td>
                      <td className="border border-blue-400 p-1.5 text-left px-2">{edu.major || "---"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border border-blue-400 p-4 text-center text-gray-400 italic">--- Belum ada data ---</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pemisah Halaman untuk Cetak Otomatis */}
        <div className="html2pdf__page-break page-break"></div>

        {/* ==================== HALAMAN 2 ==================== */}
        <div className="page-section mb-10 pt-4">
          {/* Sub-Tabel 2: Riwayat Kerja */}
          <div>
            <h2 className="text-sm font-bold text-black mb-2 flex items-center uppercase">
              RIWAYAT/PENGALAMAN KERJA <span className="text-xs text-gray-500 font-normal ml-1.5">職業歴</span>
            </h2>
            <table className="w-full border-collapse border border-blue-400 text-center text-[10px]">
              <thead>
                <tr className="bg-white text-blue-900 font-bold">
                  <th colSpan="2" className="border border-blue-400 p-1 text-[11px]">DARI <span className="text-[9px] font-normal text-gray-500 ml-1">から</span></th>
                  <th colSpan="2" className="border border-blue-400 p-1 text-[11px]">SAMPAI <span className="text-[9px] font-normal text-gray-500 ml-1">まで</span></th>
                  <th className="border border-blue-400 p-1 text-[11px] align-middle" rowSpan="2">NAMA PERUSAHAAN <span className="text-[9px] block text-gray-500 font-normal">会社名</span></th>
                  <th className="border border-blue-400 p-1 text-[11px] align-middle" rowSpan="2">JENIS PEKERJAAN <span className="text-[9px] block text-gray-500 font-normal">職業内容</span></th>
                </tr>
                <tr className="bg-white text-blue-900 font-bold border-b border-blue-400">
                  <th className="border border-blue-400 p-0.5 w-[12%] text-[10px]">THN <span className="font-normal text-gray-500 text-[9px]">年</span></th>
                  <th className="border border-blue-400 p-0.5 w-[10%] text-[10px]">BLN <span className="font-normal text-gray-500 text-[9px]">月</span></th>
                  <th className="border border-blue-400 p-0.5 w-[12%] text-[10px]">THN <span className="font-normal text-gray-500 text-[9px]">年</span></th>
                  <th className="border border-blue-400 p-0.5 w-[10%] text-[10px]">BLN <span className="font-normal text-gray-500 text-[9px]">月</span></th>
                </tr>
              </thead>
              <tbody>
                {data.workExperiences && data.workExperiences.length > 0 ? (
                  data.workExperiences.map((work, index) => (
                    <tr key={index} className="text-gray-800">
                      <td className="border border-blue-400 p-1.5">{work.startYear}</td>
                      <td className="border border-blue-400 p-1.5">{work.startMonth}</td>
                      <td className="border border-blue-400 p-1.5">{work.endYear}</td>
                      <td className="border border-blue-400 p-1.5">{work.endMonth}</td>
                      <td className="border border-blue-400 p-1.5 text-left font-medium px-2">{work.companyName}</td>
                      <td className="border border-blue-400 p-1.5 text-left px-2">{work.jobDescription}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border border-blue-400 p-4 text-center text-gray-400 italic">--- Belum ada data ---</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pemisah Halaman Kedua */}
        <div className="html2pdf__page-break page-break"></div>

        {/* ==================== HALAMAN 3 ==================== */}
        <div className="page-section pt-4">
          {/* Keluarga Yang Bisa Dihubungi */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black mb-2 flex items-center uppercase">
              KELUARGA YANG BISA DIHUBUNGI <span className="text-xs text-gray-500 font-normal ml-1.5">連絡する家族</span>
            </h2>
            <div className="border border-blue-400 p-2.5 text-center text-gray-500 text-[10px]">
              {data.emergencyContact ? (
                <div className="grid grid-cols-4 text-left text-black font-medium text-xs">
                  <div>Nama: {data.emergencyContact.name}</div>
                  <div>Hubungan: {data.emergencyContact.relation}</div>
                  <div className="col-span-2">No HP: {data.emergencyContact.phone}</div>
                </div>
              ) : "Belum ada kontak darurat terdaftar"}
            </div>
          </div>

          {/* Keluarga di Indonesia */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black mb-2 flex items-center uppercase">
              KELUARGA DI INDONESIA <span className="text-xs text-gray-500 font-normal ml-1.5">インドネシアでの家族</span>
            </h2>
            <table className="w-full border-collapse border border-blue-400 text-center text-[10px]">
              <thead>
                <tr className="bg-white text-blue-900 font-bold border-b border-blue-400">
                  <th className="border border-blue-400 p-1 w-[25%] text-[11px]">NAMA <span className="text-[9px] font-normal text-gray-500 block">氏名</span></th>
                  <th className="border border-blue-400 p-1 w-[20%] text-[11px]">UMUR / NO HP <span className="text-[9px] font-normal text-gray-500 block">年齢</span></th>
                  <th className="border border-blue-400 p-1 w-[20%] text-[11px]">HUBUNGAN <span className="text-[9px] font-normal text-gray-500 block">続柄</span></th>
                  <th className="border border-blue-400 p-1 w-[35%] text-[11px]">PEKERJAAN / PENGHASILAN <span className="text-[9px] font-normal text-gray-500 block">職業</span></th>
                </tr>
              </thead>
              <tbody>
                {data.familyInIndonesia && data.familyInIndonesia.length > 0 ? (
                  data.familyInIndonesia.map((fam, index) => (
                    <tr key={index} className="text-gray-800 text-left">
                      <td className="border border-blue-400 p-1.5 font-medium px-2">{fam.name}</td>
                      <td className="border border-blue-400 p-1.5 text-center">{fam.ageOrPhone}</td>
                      <td className="border border-blue-400 p-1.5 text-center">{fam.relationship}</td>
                      <td className="border border-blue-400 p-1.5 px-2">{fam.jobOrIncome}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border border-blue-400 p-3 text-center text-gray-400 italic">--- Belum ada data ---</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Keluarga/Saudara/Teman di Jepang */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black mb-2 flex items-center uppercase">
              KELUARGA/SAUDARA/TEMAN DI JEPANG JIKA ADA <span className="text-xs text-gray-500 font-normal ml-1.5">在日家族・友達</span>
            </h2>
            <table className="w-full border-collapse border border-blue-400 text-center text-[10px]">
              <thead>
                <tr className="bg-white text-blue-900 font-bold border-b border-blue-400">
                  <th className="border border-blue-400 p-1 w-[25%] text-[11px]">NAMA <span className="text-[9px] font-normal text-gray-500 block">氏名</span></th>
                  <th className="border border-blue-400 p-1 w-[20%] text-[11px]">UMUR / NO HP <span className="text-[9px] font-normal text-gray-500 block">年齢</span></th>
                  <th className="border border-blue-400 p-1 w-[20%] text-[11px]">HUBUNGAN <span className="text-[9px] font-normal text-gray-500 block">続柄</span></th>
                  <th className="border border-blue-400 p-1 w-[35%] text-[11px]">PEKERJAAN / ALAMAT <span className="text-[9px] font-normal text-gray-500 block">職業</span></th>
                </tr>
              </thead>
              <tbody>
                {data.familyInJapan && data.familyInJapan.length > 0 ? (
                  data.familyInJapan.map((fam, index) => (
                    <tr key={index} className="text-gray-800 text-left">
                      <td className="border border-blue-400 p-1.5 font-medium px-2">{fam.name}</td>
                      <td className="border border-blue-400 p-1.5 text-center">{fam.ageOrPhone}</td>
                      <td className="border border-blue-400 p-1.5 text-center">{fam.relationship}</td>
                      <td className="border border-blue-400 p-1.5 px-2">{fam.jobOrAddress}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border border-blue-400 p-3 text-center text-gray-400 italic">--- Belum ada data ---</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Attachment */}
          <div>
            <h2 className="text-sm font-bold text-black mb-2 flex items-center uppercase">
              ATTACHMENT <span className="text-xs text-gray-500 font-normal ml-1.5">添付ファイル</span>
            </h2>
            <table className="w-full border-collapse border border-blue-400 text-center text-[10px]">
              <thead>
                <tr className="bg-white text-blue-900 font-bold border-b border-blue-400">
                  <th className="border border-blue-400 p-1.5 w-[45%] text-[11px]">NAMA <span className="text-[9px] font-normal text-gray-500 ml-1">ファイルネーム</span></th>
                  <th className="border border-blue-400 p-1.5 w-[25%] text-[11px]">FILE <span className="text-[9px] font-normal text-gray-500 ml-1">ファイル</span></th>
                  <th className="border border-blue-400 p-1.5 w-[30%] text-[11px]">CATATAN</th>
                </tr>
              </thead>
              <tbody>
                {data.attachments && data.attachments.length > 0 ? (
                  data.attachments.map((file, index) => (
                    <tr key={index} className="text-gray-800 text-left">
                      <td className="border border-blue-400 p-1.5 px-2">{file.name}</td>
                      <td className="border border-blue-400 p-1.5 text-center">
                        <a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">Lihat File</a>
                      </td>
                      <td className="border border-blue-400 p-1.5 px-2">{file.note || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border border-blue-400 p-3 text-center text-gray-400 italic">--- Belum ada lampiran ---</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="bg-slate-200 h-6 border border-t-0 border-blue-400"></div>
          </div>
        </div>

      </div>

      {/* Style Tambahan khusus Cetak Browser (Ctrl + P) */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background-color: #fff !important; padding: 0 !important; }
          .dynamic-cv-container { padding: 0 !important; background: transparent !important; }
          .print-area { box-shadow: none !important; padding: 0 !important; max-width: 100% !important; }
          .page-break { page-break-after: always !important; break-after: page !important; }
        }
      `}</style>
    </div>
  )
}

export default CVPage