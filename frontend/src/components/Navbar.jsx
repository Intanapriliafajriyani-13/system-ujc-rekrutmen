import {
  UserPlus,
  Users,
  Building2,
} from "lucide-react"

import {
  Link,
  useLocation,
} from "react-router-dom"

function Navbar() {
  const location = useLocation()

  const menus = [
    {
      name: "新規登録",
      label: "Pendaftaran Baru",
      icon: <UserPlus size={20} />,
      path: "/",
    },

    {
      name: "応募者一覧",
      label: "List Pendaftar",
      icon: <Users size={20} />,
      path: "/list",
    },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white shadow-2xl rounded-r-[40px] p-6 z-50">
      <div className="mb-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-400 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold">
              U
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                UJC
              </h1>

              <p className="text-blue-200 text-sm">
                Recruitment System
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {menus.map((menu, index) => (
          <Link
            key={index}
            to={menu.path}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
              location.pathname === menu.path
                ? "bg-white text-blue-900 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            {menu.icon}

            <div>
              <p className="font-semibold">
                {menu.label}
              </p>

              <p
                className={`text-xs ${
                  location.pathname === menu.path
                    ? "text-blue-700"
                    : "text-blue-200"
                }`}
              >
                {menu.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/10 rounded-3xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <Building2 size={20} />

            <div>
              <p className="font-semibold">
                日本研修プログラム
              </p>

              <p className="text-blue-200 text-xs">
                Japan Recruitment Division
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar