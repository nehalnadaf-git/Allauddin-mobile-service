"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, Edit2, Trash2, Eye, EyeOff, Package, Upload } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";

export default function ProductsPage() {
    const products = useQuery(api.products.list);
    const categories = useQuery(api.categories.list);
    const createProduct = useMutation(api.products.create);
    const updateProduct = useMutation(api.products.update);
    const removeProduct = useMutation(api.products.remove);
    const toggleVisibility = useMutation(api.products.toggleVisibility);
    const toggleStock = useMutation(api.products.toggleStock);
    const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
    const logAction = useMutation(api.activityLog.log);

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Form state
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [price, setPrice] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [description, setDescription] = useState("");
    const [isInStock, setIsInStock] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    // Offer state
    const [offerType, setOfferType] = useState<"none" | "discount" | "bogo">("none");
    const [discountPct, setDiscountPct] = useState("");

    const calcDiscountedPrice = () => {
        const p = parseFloat(price);
        const d = parseFloat(discountPct);
        if (!p || !d || d <= 0 || d >= 100) return undefined;
        return Math.round(p * (1 - d / 100));
    };

    const resetForm = () => {
        setName(""); setCategoryId(""); setPrice(""); setPriceRange("");
        setDescription(""); setIsInStock(true); setImageFile(null);
        setOfferType("none"); setDiscountPct("");
    };

    const openCreate = () => { setEditingId(null); resetForm(); setModalOpen(true); };

    const openEdit = (p: any) => {
        setEditingId(p._id); setName(p.name); setCategoryId(p.categoryId);
        setPrice(p.price.toString()); setPriceRange(p.priceRange || "");
        setDescription(p.description || ""); setIsInStock(p.isInStock);
        setOfferType(p.offerType || "none");
        setDiscountPct(p.discountPercentage ? p.discountPercentage.toString() : "");
        setImageFile(null); setModalOpen(true);
    };

    const handleSave = async () => {
        if (!name.trim() || !categoryId || !price) return;
        setIsUploading(true);
        try {
            let imageStorageId;
            if (imageFile) {
                if (imageFile.size > 2 * 1024 * 1024) { toast("Image must be under 2MB", "error"); setIsUploading(false); return; }
                const url = await generateUploadUrl();
                const res = await fetch(url, { method: "POST", headers: { "Content-Type": imageFile.type }, body: imageFile });
                const { storageId } = await res.json();
                imageStorageId = storageId;
            }

            if (editingId) {
                const updates: any = { id: editingId, name, categoryId, price: parseFloat(price), priceRange: priceRange || undefined, description: description || undefined, isInStock, offerType };
                if (imageStorageId) updates.imageStorageId = imageStorageId;
                if (offerType === "discount") {
                    updates.discountPercentage = parseFloat(discountPct) || undefined;
                    updates.discountedPrice = calcDiscountedPrice();
                } else {
                    updates.discountPercentage = undefined;
                    updates.discountedPrice = undefined;
                }
                await updateProduct(updates);
                await logAction({ action: "Product Updated", details: name });
                toast("Product updated!", "success");
            } else {
                const discountedPrice = offerType === "discount" ? calcDiscountedPrice() : undefined;
                const discountPercentage = offerType === "discount" && discountPct ? parseFloat(discountPct) : undefined;
                await createProduct({ name, categoryId: categoryId as any, price: parseFloat(price), priceRange: priceRange || undefined, description: description || undefined, isInStock, displayOrder: products?.length || 0, imageStorageId, offerType: offerType !== "none" ? offerType : undefined, discountPercentage, discountedPrice });
                await logAction({ action: "Product Added", details: name });
                toast("Product created!", "success");
            }
            setModalOpen(false);
        } catch (err: any) {
            toast(err.message || "Failed to save", "error");
        }
        setIsUploading(false);
    };

    const handleDelete = async (id: string) => {
        try {
            const p = (products as any[])?.find((x: any) => x._id === id);
            await removeProduct({ id: id as any });
            await logAction({ action: "Product Deleted", details: p?.name || "" });
            toast("Product deleted!", "success");
            setDeleteConfirm(null);
        } catch (err: any) { toast(err.message || "Failed", "error"); setDeleteConfirm(null); }
    };

    const filtered = (products as any[])?.filter((p: any) => {
        const matchCat = !filterCategory || p.categoryId === filterCategory;
        const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    }) || [];

    const getCategoryName = (catId: string) => (categories as any[])?.find((c: any) => c._id === catId)?.name || "Unknown";

    const count = products?.length ?? 0;
    const atLimit = count >= 15;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-poppins font-bold text-2xl text-white">Products</h1>
                    <p className="font-dm text-xs mt-0.5" style={{ color: atLimit ? "#EF4444" : "#9CA3AF" }}>
                        {count}/15 accessories used{atLimit ? " — Limit reached" : ""}
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    disabled={atLimit}
                    title={atLimit ? "Maximum 15 accessories allowed" : "Add a new product"}
                    className="flex items-center gap-2 px-4 py-2 text-white text-sm font-poppins font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: atLimit ? "#9CA3AF" : "#7C3AED" }}
                >
                    <Plus size={16} />{atLimit ? "Limit Reached (15/15)" : "Add Product"}
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-sm font-dm focus:border-[#A78BFA] outline-none">
                    <option value="">All Categories</option>
                    {(categories as any[])?.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(filtered as any[]).map((p: any) => (
                    <div key={p._id} className={`bg-[rgba(255,255,255,0.03)] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl p-4 ${!p.isVisible ? "opacity-60" : ""}`}>
                        <div className="flex items-start gap-3">
                            <div className="w-14 h-14 rounded-xl bg-[rgba(255,255,255,0.06)] flex items-center justify-center flex-shrink-0">
                                <Package size={20} className="text-white/60" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="font-dm font-medium text-sm text-white truncate">{p.name}</p>
                                    {p.offerType === "bogo" && (
                                        <span className="text-[10px] font-poppins font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}>BUY 1 GET 1</span>
                                    )}
                                    {p.offerType === "discount" && p.discountPercentage && (
                                        <span className="text-[10px] font-poppins font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>{p.discountPercentage}% OFF</span>
                                    )}
                                </div>
                                <p className="text-xs text-white/60 font-dm">{getCategoryName(p.categoryId)}</p>
                                <p className="font-poppins font-bold text-sm text-primary mt-1">{p.priceRange || `₹${p.price}`}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                            <button onClick={() => toggleStock({ id: p._id })} className={`text-xs font-dm px-2 py-1 rounded-full ${p.isInStock ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                                {p.isInStock ? "In Stock" : "Out of Stock"}
                            </button>
                            <div className="flex-1" />
                            <button onClick={() => toggleVisibility({ id: p._id })} className="p-1.5 text-white/60 hover:text-white transition-colors">
                                {p.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <button onClick={() => openEdit(p)} className="p-1.5 text-white/60 hover:text-primary transition-colors"><Edit2 size={14} /></button>
                            <button onClick={() => setDeleteConfirm(p._id)} className="p-1.5 text-white/60 hover:text-error transition-colors"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && <p className="text-center py-12 text-white/60 font-dm text-sm">No products found</p>}

            {/* Create/Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Edit Product" : "Add Product"}>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label className="block font-dm text-sm font-medium text-white mb-1">Name *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" />
                    </div>
                    <div>
                        <label className="block font-dm text-sm font-medium text-white mb-1">Category *</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] outline-none text-sm font-dm">
                            <option value="">Select category</option>
                            {(categories as any[])?.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block font-dm text-sm font-medium text-white mb-1">Price (₹) *</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" />
                        </div>
                        <div>
                            <label className="block font-dm text-sm font-medium text-white mb-1">Price Range</label>
                            <input type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="₹99 – ₹299" className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm" />
                        </div>
                    </div>
                    <div>
                        <label className="block font-dm text-sm font-medium text-white mb-1">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm resize-none" />
                    </div>
                    <div>
                        <label className="block font-dm text-sm font-medium text-white mb-1">Image (max 2MB)</label>
                        <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-xl cursor-pointer hover:border-primary transition-colors">
                            <Upload size={16} className="text-white/60" />
                            <span className="text-sm text-white/60 font-dm">{imageFile ? imageFile.name : "Choose file"}</span>
                            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="hidden" />
                        </label>
                    </div>
                    {/* ── Offer Section ── */}
                    <div className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 space-y-3" style={{ background: "#FAFAFA" }}>
                        <p className="font-poppins font-semibold text-sm text-white">Offer / Promotion</p>
                        <div className="grid grid-cols-3 gap-2">
                            {(["none", "discount", "bogo"] as const).map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => { setOfferType(type); if (type !== "discount") setDiscountPct(""); }}
                                    className="py-2 rounded-xl text-xs font-poppins font-semibold border transition-all"
                                    style={{
                                        background: offerType === type
                                            ? type === "bogo" ? "linear-gradient(135deg,#F59E0B,#D97706)"
                                                : type === "discount" ? "linear-gradient(135deg,#7C3AED,#6D28D9)"
                                                    : "white"
                                            : "white",
                                        color: offerType === type ? "white" : "#6B7280",
                                        borderColor: offerType === type ? "transparent" : "#E5E7EB",
                                    }}
                                >
                                    {type === "none" ? "No Offer" : type === "bogo" ? "Buy 1 Get 1" : "Discount %"}
                                </button>
                            ))}
                        </div>
                        {offerType === "discount" && (
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <label className="block font-dm text-xs font-medium text-white mb-1">Discount %</label>
                                    <input
                                        type="number" min="1" max="99"
                                        value={discountPct}
                                        onChange={e => setDiscountPct(e.target.value)}
                                        placeholder="e.g. 20"
                                        className="w-full px-3 py-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] focus:border-[#A78BFA] outline-none text-sm font-dm"
                                    />
                                </div>
                                {discountPct && price && (
                                    <div className="text-center">
                                        <p className="font-dm text-xs text-white/60">New Price</p>
                                        <p className="font-poppins font-bold text-primary text-sm">₹{calcDiscountedPrice()}</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {offerType === "bogo" && (
                            <p className="font-dm text-xs" style={{ color: "#9CA3AF" }}>Customers buy 1, get 1 free. The free item is automatically added to their cart.</p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="inStock" checked={isInStock} onChange={(e) => setIsInStock(e.target.checked)} className="rounded" />
                        <label htmlFor="inStock" className="text-sm font-dm text-white">In Stock</label>
                    </div>
                    <button onClick={handleSave} disabled={!name.trim() || !categoryId || !price || isUploading}
                        className="w-full py-3 bg-primary hover:hover:scale-[1.02] active:scale-[0.98] disabled:bg-border-grey text-white font-poppins font-semibold rounded-xl transition-all text-sm">
                        {isUploading ? "Uploading..." : editingId ? "Update" : "Create"}
                    </button>
                </div>
            </Modal>

            {/* Delete Confirm */}
            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Product">
                <p className="font-dm text-sm text-white mb-4">Are you sure? This will permanently delete this product and its image.</p>
                <div className="flex gap-3">
                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-[rgba(255,255,255,0.06)] text-white font-poppins font-semibold rounded-xl text-sm">Cancel</button>
                    <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-error hover:bg-error/90 text-white font-poppins font-semibold rounded-xl text-sm">Delete</button>
                </div>
            </Modal>
        </div>
    );
}
