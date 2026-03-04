"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, Edit2, Trash2, Eye, EyeOff, Wrench } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";

const icons = ["Smartphone", "BatteryFull", "Plug", "Volume2", "RotateCcw", "Droplets", "Camera", "RectangleHorizontal", "CircleDot", "HardDrive", "Signal", "Cpu", "Wrench"];

export default function ServicesAdminPage() {
    const services = useQuery(api.services.listAll);
    const create = useMutation(api.services.create);
    const update = useMutation(api.services.update);
    const remove = useMutation(api.services.remove);
    const toggle = useMutation(api.services.toggleVisibility);
    const log = useMutation(api.activityLog.log);
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [del, setDel] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [icon, setIcon] = useState("Wrench");

    const openNew = () => { setEditId(null); setName(""); setDesc(""); setPrice(""); setIcon("Wrench"); setModal(true); };
    const openEdit = (s: any) => { setEditId(s._id); setName(s.name); setDesc(s.description); setPrice(s.startingPrice + ""); setIcon(s.iconName); setModal(true); };

    const save = async () => {
        if (!name || !desc || !price) return;
        try {
            if (editId) { await update({ id: editId as any, name, description: desc, startingPrice: +price, iconName: icon }); await log({ action: "Service Updated", details: name }); toast("Updated!", "success"); }
            else { await create({ name, description: desc, startingPrice: +price, iconName: icon, displayOrder: services?.length || 0 }); await log({ action: "Service Added", details: name }); toast("Created!", "success"); }
            setModal(false);
        } catch (e: any) { toast(e.message, "error"); }
    };

    const doDelete = async (id: string) => {
        const s = (services as any[])?.find((x: any) => x._id === id); await remove({ id: id as any }); await log({ action: "Service Deleted", details: s?.name || "" }); toast("Deleted!", "success"); setDel(null);
    };

    return (<div>
        <div className="flex items-center justify-between mb-6">
            <h1 className="font-poppins font-bold text-2xl text-deep-text">Services</h1>
            <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-hover-blue text-white text-sm font-poppins font-semibold rounded-xl"><Plus size={16} />Add Service</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(services as any[])?.map((s: any) => (<div key={s._id} className={`bg-white rounded-xl card-shadow p-5 ${!s.isVisible ? "opacity-60" : ""}`}>
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Wrench size={20} className="text-primary" /></div>
                    <div className="flex-1"><p className="font-poppins font-semibold text-sm text-deep-text">{s.name}</p><p className="font-dm text-xs text-muted line-clamp-2 mt-0.5">{s.description}</p><p className="font-poppins font-bold text-primary text-sm mt-2">From ₹{s.startingPrice}</p></div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-grey">
                    <span className="text-[10px] text-muted font-dm bg-light-grey px-2 py-0.5 rounded-full">{s.iconName}</span><div className="flex-1" />
                    <button onClick={() => toggle({ id: s._id })} className="p-1.5 text-muted hover:text-deep-text">{s.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                    <button onClick={() => openEdit(s)} className="p-1.5 text-muted hover:text-primary"><Edit2 size={14} /></button>
                    <button onClick={() => setDel(s._id)} className="p-1.5 text-muted hover:text-error"><Trash2 size={14} /></button>
                </div>
            </div>))}
        </div>
        {(!services || !services.length) && <p className="text-center py-12 text-muted font-dm text-sm">No services</p>}
        <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? "Edit Service" : "Add Service"}>
            <div className="space-y-3">
                <div><label className="block font-dm text-sm font-medium mb-1">Name *</label><input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border-grey bg-light-grey focus:border-primary outline-none text-sm font-dm" /></div>
                <div><label className="block font-dm text-sm font-medium mb-1">Description *</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-border-grey bg-light-grey focus:border-primary outline-none text-sm font-dm resize-none" /></div>
                <div><label className="block font-dm text-sm font-medium mb-1">Starting Price (₹) *</label><input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border-grey bg-light-grey focus:border-primary outline-none text-sm font-dm" /></div>
                <div><label className="block font-dm text-sm font-medium mb-1">Icon</label><select value={icon} onChange={e => setIcon(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-border-grey bg-light-grey focus:border-primary outline-none text-sm font-dm">{icons.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
                <button onClick={save} disabled={!name || !desc || !price} className="w-full py-3 bg-primary hover:bg-hover-blue disabled:bg-border-grey text-white font-poppins font-semibold rounded-xl text-sm">{editId ? "Update" : "Create"}</button>
            </div>
        </Modal>
        <Modal isOpen={!!del} onClose={() => setDel(null)} title="Delete Service">
            <p className="font-dm text-sm mb-4">Permanently delete this service?</p>
            <div className="flex gap-3"><button onClick={() => setDel(null)} className="flex-1 py-2.5 bg-light-grey text-deep-text font-poppins font-semibold rounded-xl text-sm">Cancel</button><button onClick={() => del && doDelete(del)} className="flex-1 py-2.5 bg-error text-white font-poppins font-semibold rounded-xl text-sm">Delete</button></div>
        </Modal>
    </div>);
}
