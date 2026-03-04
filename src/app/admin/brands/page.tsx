"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function AdminBrandsPage() {
    const brands = useQuery(api.brands.listAll);
    const createBrand = useMutation(api.brands.create);
    const removeBrand = useMutation(api.brands.remove);
    const toggleBrand = useMutation(api.brands.toggleVisibility);

    const [newName, setNewName] = useState("");

    const handleAdd = async () => {
        if (!newName.trim()) return;
        await createBrand({ name: newName.trim() });
        setNewName("");
    };

    return (
        <div className="p-6 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-poppins font-bold text-2xl text-deep-text mb-2">Brands We Repair</h1>
                <p className="font-dm text-muted text-sm mb-8">Manage the brands displayed in the scrolling brands strip</p>

                {/* Add New */}
                <div className="bg-white rounded-2xl p-5 card-shadow mb-6">
                    <h3 className="font-poppins font-semibold text-base text-deep-text mb-4">Add New Brand</h3>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleAdd()}
                            placeholder="e.g. Poco"
                            className="flex-1 px-3 py-2.5 rounded-xl border border-border-grey font-dm text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-hover-blue text-white font-poppins font-semibold text-sm rounded-xl transition-all"
                        >
                            <Plus size={16} />
                            Add
                        </button>
                    </div>
                </div>

                {/* Brand List */}
                <div className="bg-white rounded-2xl card-shadow divide-y divide-border-grey">
                    {brands?.map((brand: any) => (
                        <div key={brand._id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-poppins font-bold">
                                    {brand.name.charAt(0)}
                                </div>
                                <span className="font-dm font-medium text-deep-text">{brand.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleBrand({ id: brand._id, isVisible: !brand.isVisible })}
                                    className={`p-2 rounded-xl transition-colors ${brand.isVisible ? "text-success hover:bg-success/10" : "text-muted hover:bg-light-grey"}`}
                                    title={brand.isVisible ? "Hide" : "Show"}
                                >
                                    {brand.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button
                                    onClick={() => removeBrand({ id: brand._id })}
                                    className="p-2 rounded-xl text-error hover:bg-error/10 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {(!brands || brands.length === 0) && (
                        <p className="text-center text-muted font-dm text-sm p-8">No brands yet</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
