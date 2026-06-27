import React from "react";
import { X } from "lucide-react";
import { useGetUserById } from "../../../hooks/admin/useUsers";

function ViewDetailsPopup({ isOpen, onClose, userId }) {
  if (!isOpen) return null;

  const { data: user } = useGetUserById(userId);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";
      case "store_owner":
        return "bg-blue-100 text-blue-700";
      case "user":
        return "bg-green-100 text-green-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">User Details</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Address</label>
            <p className="font-medium whitespace-pre-wrap">{user?.address}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Role</label>
            <div className="mt-1">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                  user?.role,
                )}`}
              >
                {user?.role === "admin"
                  ? "ADMIN"
                  : user?.role === "store_owner"
                    ? "STORE OWNER"
                    : "USER"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsPopup;
