"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  lang: "en" | "id";
  title: string;
  label: string;
  initialValue: string | null;
  type?: "text" | "email";
  placeholder?: string;
  requirePassword?: boolean;
  onClose: () => void;
  onSave: (value: string, opts?: { password?: string }) => Promise<string | void> | string | void;
};

export default function EditTextModal({
  open,
  lang,
  title,
  label,
  initialValue,
  type = "text",
  placeholder,
  requirePassword = false,
  onClose,
  onSave,
}: Props) {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [askPassword, setAskPassword] = useState(requirePassword);

  const t = useMemo(
    () => ({
      save: lang === "id" ? "Simpan" : "Save",
      cancel: lang === "id" ? "Batal" : "Cancel",
      required: lang === "id" ? "Wajib diisi" : "Required",
      invalidEmail: lang === "id" ? "Email tidak valid" : "Invalid email address",
      emailInUse: lang === "id" ? "Email sudah digunakan" : "Email already in use",
      usernameExists: lang === "id" ? "Username sudah digunakan" : "Username already exists",
      requiresPassword: lang === "id" ? "Masukkan password saat ini" : "Enter your current password",
      recentLogin: lang === "id" ? "Silakan login ulang untuk mengganti email" : "Please re-login to change email",
      unknown: lang === "id" ? "Terjadi kesalahan" : "Something went wrong",
    }),
    [lang]
  );

  useEffect(() => {
    if (open) {
      setValue(initialValue ?? "");
      setPassword("");
      setError(null);
      setAskPassword(requirePassword);
    }
  }, [open, initialValue, requirePassword]);

  if (!open) return null;

  const onBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSave = async () => {
    setError(null);
    if (!value.trim()) {
      setError(t.required);
      return;
    }
    if (type === "email") {
      // simple email format check
      const re = /\S+@\S+\.\S+/;
      if (!re.test(value.trim())) {
        setError(t.invalidEmail);
        return;
      }
    }
    setLoading(true);
    try {
      const res = await onSave(value.trim(), askPassword ? { password } : undefined);
      if (typeof res === "string") {
        if (res === "invalid-email") setError(t.invalidEmail);
        else if (res === "email-already-in-use") setError(t.emailInUse);
        else if (res === "username-exists") setError(t.usernameExists);
        else if (res === "requires-password") {
          setAskPassword(true);
          setError(t.requiresPassword);
        } else if (res === "requires-recent-login") setError(t.recentLogin);
        else setError(t.unknown);
        return;
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onBackdrop}>
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="mt-4 space-y-3">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-charcoal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={type}
            placeholder={placeholder}
            autoFocus
          />
          {askPassword && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{t.requiresPassword}</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-charcoal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
              />
            </div>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
            disabled={loading}
          >
            {t.cancel}
          </button>
          <button
            className="rounded-md bg-charcoal px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (lang === "id" ? "Menyimpan..." : "Saving...") : t.save}
          </button>
        </div>
      </div>
    </div>
  );
}

