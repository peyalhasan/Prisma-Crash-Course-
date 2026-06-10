"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Trash2, Pencil } from "lucide-react";
import { createPin, deletePin, updatePin } from "./actions";

export default function PinClient({ pins }) {
  const [editingPin, setEditingPin] = useState(null);

  const [createState, createAction] = useFormState(async (prev, formData) => {
    const result = await createPin(formData);
    return result;
  }, null);

  const [updateState, updateAction] = useFormState(async (prev, formData) => {
    const result = await updatePin(editingPin.id, formData);
    if (result?.success) setEditingPin(null);
    return result;
  }, null);

  const handleDelete = async (id) => await deletePin(id);
  const handleEdit = (pin) => setEditingPin({ ...pin });

  const headerGradient = {
    background: "linear-gradient(90deg, #2563eb, #7c3aed, #ffffff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const sectionGradient = {
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <div className="min-h-screen p-8" style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%)" }}>
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-5xl font-black tracking-tight" style={headerGradient}>✦ PinBoard</h1>
          <p className="text-sm mt-2 font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>Your pinned collection</p>
        </div>

        {/* POST Form */}
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 8px 32px rgba(37,99,235,0.15)" }}>
          <h2 className="text-lg font-bold mb-4" style={sectionGradient}>Create a Pin</h2>
          <form action={createAction} className="space-y-3">
            {["title", "description", "type", "content"].map((field) => (
              <input
                key={field}
                name={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full rounded-xl px-4 py-2 text-sm text-white focus:outline-none placeholder-indigo-300"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(139,92,246,0.35)" }}
              />
            ))}
            <button
              type="submit"
              className="w-full font-bold py-2.5 rounded-xl text-white text-sm tracking-wide transition"
              style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed)" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
              onMouseOut={e => e.currentTarget.style.opacity = "1"}
            >
              + Add Pin
            </button>
            {createState?.error && <p className="text-sm text-center font-medium" style={{ color: "#f87171" }}>{createState.error}</p>}
            {createState?.success && <p className="text-sm text-center font-medium" style={{ color: "#34d399" }}>Pin created!</p>}
          </form>
        </div>

        {/* GET Output */}
        <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(59,130,246,0.3)", boxShadow: "0 8px 32px rgba(124,58,237,0.15)" }}>
          <h2 className="text-lg font-bold mb-4" style={sectionGradient}>All Pins</h2>
          {pins.length === 0 ? (
            <p className="text-sm text-center" style={{ color: "rgba(255,255,255,0.35)" }}>No pins yet.</p>
          ) : (
            <div className="space-y-3">
              {pins.map((pin) => (
                <div key={pin.id} className="relative rounded-xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)" }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-white">{pin.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed)", color: "#fff" }}>{pin.type}</span>
                      <button onClick={() => handleEdit(pin)}>
                        <Pencil size={16} className="text-indigo-400 hover:text-indigo-300 transition" />
                      </button>
                      <button onClick={() => handleDelete(pin.id)}>
                        <Trash2 size={16} className="text-red-400 hover:text-red-500 transition" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{pin.description}</p>
                  {pin.content && <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{pin.content}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Edit Modal */}
      {editingPin && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}>
          <div className="rounded-2xl p-6 w-full max-w-md" style={{ background: "#1e1b4b", border: "1px solid rgba(139,92,246,0.4)" }}>
            <h2 className="text-lg font-bold mb-4" style={sectionGradient}>Edit Pin</h2>
            <form action={updateAction} className="space-y-3">
              {["title", "description", "type", "content"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type="text"
                  defaultValue={editingPin[field]}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full rounded-xl px-4 py-2 text-sm text-white focus:outline-none placeholder-indigo-300"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(139,92,246,0.35)" }}
                />
              ))}
              <div className="flex gap-2">
                <button type="submit" className="flex-1 font-bold py-2 rounded-xl text-white text-sm" style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed)" }}>Update</button>
                <button type="button" onClick={() => setEditingPin(null)} className="flex-1 font-bold py-2 rounded-xl text-white text-sm" style={{ background: "rgba(255,255,255,0.1)" }}>Cancel</button>
              </div>
              {updateState?.error && <p className="text-sm text-center" style={{ color: "#f87171" }}>{updateState.error}</p>}
              {updateState?.success && <p className="text-sm text-center" style={{ color: "#34d399" }}>Pin updated!</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
