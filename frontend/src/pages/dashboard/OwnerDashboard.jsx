import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdStorefront,
  MdLogout,
  MdMenu,
  MdClose,
  MdSearch,
  MdAdd,
  MdVisibility,
  MdFilterList,
} from "react-icons/md";
import { getStores } from "../../hooks/owner/useOwner";
import ViewDetailsPopup from "./popups/ViewDetailsPopup";
import CreateStore from "./popups/createStore";

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
function OwnerDashboard() {
  const [viewOpen, setViewOpen] = useState(false);
  const [store, setStore] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading, isSuccess, error } = getStores();
  const stores = data?.stores;
  console.log(stores);

  if (isLoading) {
    return <p className="text-center text-2xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load dashboard</p>;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 space-y-4">
          <div>
            <p className="text-md hidden sm:block">
              {stores?.length} total users
            </p>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                <MdAdd className="text-lg" />
                <span className="hidden sm:inline">Add Store</span>
              </button>
            </div>
          </div>

          <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Address",
                    "Average Rating",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stores?.map((store) => (
                  <tr
                    key={store.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-gray-800">
                      {store.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {store.email}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 max-w-45 truncate">
                      {store.address}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold`}
                      >
                        {store.averageRating || "0"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          setViewOpen(true);
                          setStore(store);
                        }}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                      >
                        <MdVisibility className="text-base" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-3">
            {stores?.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {store.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {store.email}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0`}
                  >
                    {store.averageRating || "0"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{store.address}</p>
                <button
                  onClick={() => {
                    setViewOpen(true);
                    setStore(store);
                  }}
                  className="flex items-center gap-1 text-blue-600 text-sm font-medium cursor-pointer"
                >
                  <MdVisibility className="text-base" />
                  View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
      <CreateStore isOpen={open} onClose={() => setOpen(false)} />

      <ViewDetailsPopup
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        store={store}
      />
    </div>
  );
}

export default OwnerDashboard;
