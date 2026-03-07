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
                <h1 className="font-poppins font-bold text-2xl text-deep-text">Categories</h1>
                <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-hover-blue text-white text-sm font-poppins font-semibold rounded-xl transition-all">
                    <Plus size={16} /> Add Category
                </button>
            </div>

            <div className="bg-white rounded-xl card-shadow overflow-hidden">
                {categories && categories.length > 0 ? (
                    <div className="divide-y divide-border-grey">
                        {(categories as any[])?.map((cat: any) => (
                            <div key={cat._id} className="flex items-center gap-4 px-5 py-4 hover:bg-light-grey/50 transition-colors">
                                <GripVertical size={16} className="text-muted/40 cursor-grab flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-dm font-medium text-sm text-deep-text">{cat.name}</p>
                                    {cat.description && <p className="font-dm text-xs text-muted truncate">{cat.description}</p>}
                                </div>
                                <span className="text-xs text-muted font-dm bg-light-grey px-2 py-0.5 rounded-full flex-shrink-0">
                                    {getProductCount(cat._id)} products
                                </span>
                                <button onClick={() => handleToggle(cat._id)} className="p-1.5 text-muted hover:text-deep-text transition-colors" title={cat.isVisible ? "Hide" : "Show"}>
                                    {cat.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button onClick={() => openEdit(cat)} className="p-1.5 text-muted hover:text-primary transition-colors"><Edit2 size={16} /></button>
                                <button onClick={() => setDeleteConfirm(cat._id)} className="p-1.5 text-muted hover:text-error transition-colors"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-12 text-muted font-dm text-sm">No categories yet</p>
                )}
            </div>

            {/* Create/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Category" : "Add Category"}>
                <div className="space-y-4">
                    <div>
                        <label className="block font-dm text-sm font-medium text-deep-text mb-1.5">Name *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border-grey bg-light-grey focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" placeholder="Category name" />
                    </div>
                    <div>
                        <label className="block font-dm text-sm font-medium text-deep-text mb-1.5">Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border-grey bg-light-grey focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" placeholder="Optional description" />
                    </div>
                    <button onClick={handleSave} disabled={!name.trim()} className="w-full py-3 bg-primary hover:bg-hover-blue disabled:bg-border-grey text-white font-poppins font-semibold rounded-xl transition-all text-sm">
                        {editingId ? "Update" : "Create"}
                    </button>
                </div>
            </Modal>

            {/* Delete Confirmation */}
            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Category">
                <p className="font-dm text-sm text-deep-text mb-4">Are you sure you want to delete this category? This cannot be undone. Categories with active products cannot be deleted.</p>
                <div className="flex gap-3">
                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-light-grey text-deep-text font-poppins font-semibold rounded-xl text-sm">Cancel</button>
                    <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-error hover:bg-error/90 text-white font-poppins font-semibold rounded-xl text-sm">Delete</button>
                </div>
            </Modal>
        </div>
    );
}
