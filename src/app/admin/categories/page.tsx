"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";

export default function CategoriesPage() {
    const categories = useQuery(api.categories.list);
    const products = useQuery(api.products.list);
    const createCategory = useMutation(api.categories.create);
    const updateCategory = useMutation(api.categories.update);
    const removeCategory = useMutation(api.categories.remove);
    const toggleVisibility = useMutation(api.categories.toggleVisibility);
    const logAction = useMutation(api.activityLog.log);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const openCreate = () => {
        setEditingId(null);
        setName("");
        setDescription("");
        setModalOpen(true);
    };

    const openEdit = (cat: any) => {
        setEditingId(cat._id);
        setName(cat.name);
        setDescription(cat.description || "");
        setModalOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                await updateCategory({ id: editingId as any, name, description });
                await logAction({ action: "Category Updated", details: name });
                toast("Category updated!", "success");
            } else {
                await createCategory({ name, description, displayOrder: (categories?.length || 0) });
                await logAction({ action: "Category Added", details: name });
                toast("Category created!", "success");
            }
            setModalOpen(false);
        } catch (err: any) {
            toast(err.message || "Failed to save", "error");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const cat = (categories as any[])?.find((c: any) => c._id === id);
            await removeCategory({ id: id as any });
            await logAction({ action: "Category Deleted", details: cat?.name || "" });
            toast("Category deleted!", "success");
            setDeleteConfirm(null);
        } catch (err: any) {
            toast(err.message || "Failed to delete", "error");
            setDeleteConfirm(null);
        }
    };

    const handleToggle = async (id: string) => {
        await toggleVisibility({ id: id as any });
    };

    const getProductCount = (catId: string) => (products as any[])?.filter((p: any) => p.categoryId === catId).length || 0;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-poppins font-bold text-2xl text-white">Categories</h1>
                <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary hover:hover:scale-[1.02] active:scale-[0.98] text-white text-sm font-poppins font-semibold rounded-xl transition-all">
                    <Plus size={16} /> Add Category
                </button>
            </div>

            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl overflow-hidden">
                {categories && categories.length > 0 ? (
                    <div className="divide-y divide-border-grey">
                        {(categories as any[])?.map((cat: any) => (
                            <div key={cat._id} className="flex items-center gap-4 px-5 py-4 hover:bg-[rgba(255,255,255,0.06)]/50 transition-colors">
                                <GripVertical size={16} className="text-white/60/40 cursor-grab flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-dm font-medium text-sm text-white">{cat.name}</p>
                                    {cat.description && <p className="font-dm text-xs text-white/60 truncate">{cat.description}</p>}
                                </div>
                                <span className="text-xs text-white/60 font-dm bg-[rgba(255,255,255,0.06)] px-2 py-0.5 rounded-full flex-shrink-0">
                                    {getProductCount(cat._id)} products
                                </span>
                                <button onClick={() => handleToggle(cat._id)} className="p-1.5 text-white/60 hover:text-white transition-colors" title={cat.isVisible ? "Hide" : "Show"}>
                                    {cat.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button onClick={() => openEdit(cat)} className="p-1.5 text-white/60 hover:text-primary transition-colors"><Edit2 size={16} /></button>
                                <button onClick={() => setDeleteConfirm(cat._id)} className="p-1.5 text-white/60 hover:text-error transition-colors"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-12 text-white/60 font-dm text-sm">No categories yet</p>
                )}
            </div>

            {/* Create/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Category" : "Add Category"}>
                <div className="space-y-4">
                    <div>
                        <label className="block font-dm text-sm font-medium text-white mb-1.5">Name *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" placeholder="Category name" />
                    </div>
                    <div>
                        <label className="block font-dm text-sm font-medium text-white mb-1.5">Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" placeholder="Optional description" />
                    </div>
                    <button onClick={handleSave} disabled={!name.trim()} className="w-full py-3 bg-primary hover:hover:scale-[1.02] active:scale-[0.98] disabled:bg-border-grey text-white font-poppins font-semibold rounded-xl transition-all text-sm">
                        {editingId ? "Update" : "Create"}
                    </button>
                </div>
            </Modal>

            {/* Delete Confirmation */}
            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Category">
                <p className="font-dm text-sm text-white mb-4">Are you sure you want to delete this category? This cannot be undone. Categories with active products cannot be deleted.</p>
                <div className="flex gap-3">
                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-[rgba(255,255,255,0.06)] text-white font-poppins font-semibold rounded-xl text-sm">Cancel</button>
                    <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-error hover:bg-error/90 text-white font-poppins font-semibold rounded-xl text-sm">Delete</button>
                </div>
            </Modal>
        </div>
    );
}
