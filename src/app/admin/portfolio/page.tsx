"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, Edit2, Trash2, Eye, EyeOff, Upload } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";

export default function PortfolioPage() {
    const items = useQuery(api.portfolio.listAll);
    const createItem = useMutation(api.portfolio.create);
    const updateItem = useMutation(api.portfolio.update);
    const removeItem = useMutation(api.portfolio.remove);
    const toggleVisibility = useMutation(api.portfolio.toggleVisibility);
    const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
    const logAction = useMutation(api.activityLog.log);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [beforeFile, setBeforeFile] = useState<File | null>(null);
    const [afterFile, setAfterFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const openCreate = () => { setEditingId(null); setTitle(""); setDescription(""); setBeforeFile(null); setAfterFile(null); setModalOpen(true); };
    const openEdit = (item: any) => { setEditingId(item._id); setTitle(item.title); setDescription(item.description); setBeforeFile(null); setAfterFile(null); setModalOpen(true); };

    const uploadFile = async (file: File) => {
        if (file.size > 2 * 1024 * 1024) throw new Error("Image must be under 2MB");
        const url = await generateUploadUrl();
        const res = await fetch(url, { method: "POST", headers: { "Content-Type": file.type }, body: file });
        const { storageId } = await res.json();
        return storageId;
    };

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) return;
        setIsUploading(true);
        try {
            const beforeId = beforeFile ? await uploadFile(beforeFile) : undefined;
            const afterId = afterFile ? await uploadFile(afterFile) : undefined;

            if (editingId) {
                const updates: any = { id: editingId, title, description };
                if (beforeId) updates.beforeImageStorageId = beforeId;
                if (afterId) updates.afterImageStorageId = afterId;
                await updateItem(updates);
                await logAction({ action: "Portfolio Updated", details: title });
                toast("Portfolio item updated!", "success");
            } else {
                await createItem({ title, description, displayOrder: items?.length || 0, beforeImageStorageId: beforeId, afterImageStorageId: afterId });
                await logAction({ action: "Portfolio Added", details: title });
                toast("Portfolio item created!", "success");
            }
            setModalOpen(false);
        } catch (err: any) { toast(err.message || "Failed to save", "error"); }
        setIsUploading(false);
    };

    const handleDelete = async (id: string) => {
        try {
            const item = (items as any[])?.find((x: any) => x._id === id);
            await removeItem({ id: id as any });
            await logAction({ action: "Portfolio Deleted", details: item?.title || "" });
            toast("Portfolio item deleted!", "success");
            setDeleteConfirm(null);
        } catch (err: any) { toast(err.message, "error"); setDeleteConfirm(null); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-poppins font-bold text-2xl text-white">Portfolio</h1>
                <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary hover:hover:scale-[1.02] active:scale-[0.98] text-white text-sm font-poppins font-semibold rounded-xl transition-all">
                    <Plus size={16} /> Add Work
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(items as any[])?.map((item: any) => (
                    <div key={item._id} className={`bg-[rgba(255,255,255,0.03)] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl overflow-hidden ${!item.isVisible ? "opacity-60" : ""}`}>
                        <div className="grid grid-cols-2 gap-0">
                            <div className="bg-[rgba(255,255,255,0.06)] aspect-[4/3] flex items-center justify-center text-xs text-white/60 font-dm relative">
                                <span>Before Photo</span>
                                <span className="absolute top-1 left-1 bg-error text-white text-[9px] font-poppins font-semibold px-1.5 py-0.5 rounded-full">Before</span>
                            </div>
                            <div className="bg-[rgba(255,255,255,0.06)] aspect-[4/3] flex items-center justify-center text-xs text-white/60 font-dm relative">
                                <span>After Photo</span>
                                <span className="absolute top-1 left-1 bg-success text-white text-[9px] font-poppins font-semibold px-1.5 py-0.5 rounded-full">After</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="font-poppins font-semibold text-sm text-white mb-1">{item.title}</p>
                            <p className="font-dm text-xs text-white/60 line-clamp-2">{item.description}</p>
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                                <button onClick={() => toggleVisibility({ id: item._id })} className="p-1.5 text-white/60 hover:text-white transition-colors">
                                    {item.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                                </button>
                                <div className="flex-1" />
                                <button onClick={() => openEdit(item)} className="p-1.5 text-white/60 hover:text-primary transition-colors"><Edit2 size={14} /></button>
                                <button onClick={() => setDeleteConfirm(item._id)} className="p-1.5 text-white/60 hover:text-error transition-colors"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {(!items || items.length === 0) && <p className="text-center py-12 text-white/60 font-dm text-sm">No portfolio items</p>}

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Portfolio" : "Add Portfolio Work"}>
                <div className="space-y-3">
                    <div>
                        <label className="block font-dm text-sm font-medium text-white mb-1">Title *</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" />
                    </div>
                    <div>
                        <label className="block font-dm text-sm font-medium text-white mb-1">Description *</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block font-dm text-sm font-medium text-white mb-1">Before Image</label>
                            <label className="flex items-center justify-center gap-1 w-full py-2.5 border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-xl cursor-pointer hover:border-primary text-xs text-white/60 font-dm">
                                <Upload size={14} /> {beforeFile ? beforeFile.name.slice(0, 12) : "Choose"}
                                <input type="file" accept="image/*" onChange={(e) => setBeforeFile(e.target.files?.[0] || null)} className="hidden" />
                            </label>
                        </div>
                        <div>
                            <label className="block font-dm text-sm font-medium text-white mb-1">After Image</label>
                            <label className="flex items-center justify-center gap-1 w-full py-2.5 border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-xl cursor-pointer hover:border-primary text-xs text-white/60 font-dm">
                                <Upload size={14} /> {afterFile ? afterFile.name.slice(0, 12) : "Choose"}
                                <input type="file" accept="image/*" onChange={(e) => setAfterFile(e.target.files?.[0] || null)} className="hidden" />
                            </label>
                        </div>
                    </div>
                    <button onClick={handleSave} disabled={!title.trim() || !description.trim() || isUploading}
                        className="w-full py-3 bg-primary hover:hover:scale-[1.02] active:scale-[0.98] disabled:bg-border-grey text-white font-poppins font-semibold rounded-xl transition-all text-sm">
                        {isUploading ? "Uploading..." : editingId ? "Update" : "Create"}
                    </button>
                </div>
            </Modal>

            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Portfolio Item">
                <p className="font-dm text-sm text-white mb-4">Permanently delete this portfolio item and its images?</p>
                <div className="flex gap-3">
                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-[rgba(255,255,255,0.06)] text-white font-poppins font-semibold rounded-xl text-sm">Cancel</button>
                    <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-error hover:bg-error/90 text-white font-poppins font-semibold rounded-xl text-sm">Delete</button>
                </div>
            </Modal>
        </div>
    );
}
