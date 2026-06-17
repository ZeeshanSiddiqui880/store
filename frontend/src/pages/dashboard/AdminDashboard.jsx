import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdStorefront,
  MdLogout,
  MdMenu,
  MdClose,
  MdTrendingUp,
  MdStar,
} from "react-icons/md";
import { useGetAdminDashboard } from "../../hooks/admin/useAdminDashboard";

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shrink-0 ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800">
        {value ?? "—"}
      </p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data, isLoading, isSuccess, error } = useGetAdminDashboard();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess, data]);
  console.log(data);

  if (isLoading) {
    return <p className="text-center text-2xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load dashboard</p>;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <StatCard
              icon={<MdPeople />}
              label="Total Users"
              value={data?.totalUsers || 0}
              color="bg-blue-500"
            />

            <StatCard
              icon={<MdStorefront />}
              label="Total Stores"
              value={data?.totalStores || 0}
              color="bg-emerald-500"
            />

            <StatCard
              icon={<MdStar />}
              label="Total Ratings"
              value={data?.totalRatings || 0}
              color="bg-yellow-500"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-700 mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/admin/users"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all group"
              >
                <div className="w-11 h-11 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                  <MdPeople className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Manage Users
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    View, filter and add users
                  </p>
                </div>
                <MdTrendingUp className="ml-auto text-gray-300 group-hover:text-blue-400 transition-colors text-xl" />
              </Link>

              <Link
                to="/admin/stores"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-emerald-100 transition-all group"
              >
                <div className="w-11 h-11 bg-emerald-50 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors">
                  <MdStorefront className="text-emerald-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Manage Stores
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    View, filter and add stores
                  </p>
                </div>
                <MdTrendingUp className="ml-auto text-gray-300 group-hover:text-emerald-400 transition-colors text-xl" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
