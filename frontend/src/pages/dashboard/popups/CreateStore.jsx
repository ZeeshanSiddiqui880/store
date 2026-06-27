import React, { useState } from "react";
import { X } from "lucide-react";
import { useCreateStore } from "../../../hooks/owner/useOwner";

function CreateStore({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const { mutate: createStore, isPending } = useCreateStore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Store name is required";
    } else if (
      formData.name.trim().length < 10 ||
      formData.name.trim().length > 60
    ) {
      newErrors.name = "Store name must be between 10 and 60 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length > 400) {
      newErrors.address = "Address cannot exceed 400 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const ownerId = localStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    createStore({
      name: formData.name,
      email: formData.email,
      address: formData.address,
      ownerId,
    });

    setFormData({
      name: "",
      email: "",
      address: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Add Store</h2>

          <button onClick={onClose} className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Store Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Store Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="address"
              placeholder="Store Address"
              rows={4}
              maxLength={400}
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.address.length}/400
            </div>

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-md cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              {isPending ? "Adding..." : "Add Store"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStore;
