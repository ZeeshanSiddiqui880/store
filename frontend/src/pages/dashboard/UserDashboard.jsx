import React from "react";
import { useGetStores } from "../../hooks/users/useStores";
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
import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {
  const { data: stores, isLoading } = useGetStores();
  console.log(stores, "data");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 space-y-4">
          <div>
            <p className="text-md hidden sm:block">
              {stores?.length} total stores
            </p>
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
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-gray-500"
                    >
                      Loading stores...
                    </td>
                  </tr>
                ) : stores?.length > 0 ? (
                  stores.map((store) => (
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
                          onClick={() =>
                            navigate(`/user/store/${store.id}/rating`)
                          }
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                        >
                          <MdVisibility className="text-base" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-gray-500"
                    >
                      No stores found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-3">
            {isLoading ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center text-gray-500">
                Loading stores...
              </div>
            ) : stores?.length > 0 ? (
              stores.map((store) => (
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
                    onClick={() => navigate(`/user/store/${store.id}/rating`)}
                    className="flex items-center gap-1 text-blue-600 text-sm font-medium cursor-pointer"
                  >
                    <MdVisibility className="text-base" />
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                  No stores found
                </td>
              </tr>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
