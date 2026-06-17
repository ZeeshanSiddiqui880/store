import React, { useState } from "react";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import Layout from "../../components/Layout";
import { useChangePassword } from "../../hooks/useAuth";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const getStrength = (pw) => {
    if (!pw) return null;
    return pw.length >= 8 &&
      pw.length <= 16 &&
      /[A-Z]/.test(pw) &&
      /[^a-zA-Z0-9]/.test(pw)
      ? "strong"
      : "weak";
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (
      formData.newPassword.length < 8 ||
      formData.newPassword.length > 16 ||
      !/[A-Z]/.test(formData.newPassword) ||
      !/[^a-zA-Z0-9]/.test(formData.newPassword)
    ) {
      newErrors.newPassword =
        "8–16 characters, at least 1 uppercase and 1 special character";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate: changePassword, isPending } = useChangePassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };

  const strength = getStrength(formData.newPassword);
  const fields = [
    {
      key: "current",
      name: "currentPassword",
      label: "Current Password",
      placeholder: "Enter current password",
    },
    {
      key: "new",
      name: "newPassword",
      label: "New Password",
      placeholder: "8–16 chars, 1 uppercase, 1 special",
    },
    {
      key: "confirm",
      name: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Re-enter new password",
    },
  ];

  return (
    <Layout>
      <div className="bg-white border border-gray-200 rounded-2xl p-18 w-[70%] h-150 shadow-sm">
        <h1 className="text-center text-3xl pb-3">Change your password</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ key, name, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={16} />
                </span>
                <input
                  type={show[key] ? "text" : "password"}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={`w-full pl-9 pr-10 py-3 text-sm border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-100 focus:border-blue-500 ${
                    errors[name] ? "border-red-400" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => toggleShow(key)}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show[key] ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {name === "newPassword" && !errors.newPassword && (
                <p
                  className={`text-xs mt-1.5 ${
                    strength === "strong"
                      ? "text-green-600"
                      : strength === "weak"
                        ? "text-amber-500"
                        : "text-gray-400"
                  }`}
                >
                  8–16 characters, at least 1 uppercase and 1 special character
                </p>
              )}
              {errors[name] && (
                <p className="text-red-500 text-xs mt-1.5">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isPending}
            className="w-[15%] bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg text-sm transition mt-2 cursor-pointer"
          >
            {isPending ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ChangePassword;
