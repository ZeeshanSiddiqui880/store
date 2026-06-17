import React from "react";
import { X } from "lucide-react";
import { useGetUserById } from "../../../hooks/admin/useUsers";

function ViewDetailsPopup({ isOpen, onClose, store }) {
  if (!isOpen) return null;
  const { data: user } = useGetUserById(store.ownerId);

  console.log(store, "store");
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">User Details</h2>

          <button onClick={onClose} className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium">{store?.name || "-"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{store?.email || "-"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Address</label>
            <p className="font-medium whitespace-pre-wrap">
              {store?.address || "-"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Average rating</label>
            <p className="font-medium whitespace-pre-wrap">
              {store?.averageRating || "-"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Owner name</label>
            <p className="font-medium whitespace-pre-wrap">
              {user?.name || "-"}
            </p>
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
