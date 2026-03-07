"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Save, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "@/components/ui/Toast";
import { useAdminAuth } from "@/lib/adminAuth";

export default function SettingsPage() {
    const settings = useQuery(api.settings.get);
    const updateSettings = useMutation(api.settings.update);
    const updateSocial = useMutation(api.settings.updateSocialLinks);

    const changePassword = useMutation(api.auth.changePassword);
    const log = useMutation(api.activityLog.log);
    const { token } = useAdminAuth();

    const [shopName, setShopName] = useState("");
    const [tagline, setTagline] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [upi, setUpi] = useState("");
    const [hoursStart, setHoursStart] = useState("");
    const [hoursEnd, setHoursEnd] = useState("");
    const [address, setAddress] = useState("");
    const [mapsUrl, setMapsUrl] = useState("");
    const [noticeText, setNoticeText] = useState("");
    const [noticeVisible, setNoticeVisible] = useState(true);

    const [social, setSocial] = useState<any[]>([]);
    const [curPwd, setCurPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!settings) return;
        setShopName(settings.shopName); setTagline(settings.tagline);
        setWhatsapp(settings.whatsappNumber); setUpi(settings.upiId);
        setHoursStart(settings.workingHoursStart); setHoursEnd(settings.workingHoursEnd);
        setAddress(settings.address); setMapsUrl(settings.googleMapsEmbedUrl);
        setNoticeText(settings.inStoreNoticeText); setNoticeVisible(settings.inStoreNoticeVisible);

        setSocial(settings.socialLinks || []);
    }, [settings]);

    const saveShop = async () => {
        setSaving(true);
        try {
            await updateSettings({ shopName, tagline, whatsappNumber: whatsapp, upiId: upi, workingHoursStart: hoursStart, workingHoursEnd: hoursEnd, address, googleMapsEmbedUrl: mapsUrl, inStoreNoticeText: noticeText, inStoreNoticeVisible: noticeVisible });
            await log({ action: "Settings Updated", details: "Shop settings saved" });
            toast("Settings saved!", "success");
        } catch (e: any) { toast(e.message, "error"); }
        setSaving(false);
    };

    const saveSocial = async () => {
        try {
            await updateSocial({ socialLinks: social });
            await log({ action: "Social Links Updated", details: `${social.length} links` });
            toast("Social links saved!", "success");
        } catch (e: any) { toast(e.message, "error"); }
    };



    const doChangePassword = async () => {
        if (!curPwd || !newPwd || !token) return;
        try {
            await changePassword({ token, currentPassword: curPwd, newPassword: newPwd });
            toast("Password changed!", "success");
            setCurPwd(""); setNewPwd("");
        } catch (e: any) { toast(e.message, "error"); }
    };

    const addSocial = () => setSocial([...social, { platform: "WhatsApp", url: "", isVisible: true, displayOrder: social.length }]);
    const removeSocial = (i: number) => setSocial(social.filter((_, idx) => idx !== i));

    const inputCls = "w-full px-4 py-2.5 rounded-xl border border-border-grey bg-light-grey focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-dm";

    return (
        <div className="max-w-3xl">
            <h1 className="font-poppins font-bold text-2xl text-deep-text mb-6">Settings</h1>

            {/* Shop Info */}
            <div className="bg-white rounded-xl card-shadow p-6 mb-6">
                <h2 className="font-poppins font-semibold text-base text-deep-text mb-4">Shop Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-dm font-medium mb-1">Shop Name</label><input value={shopName} onChange={e => setShopName(e.target.value)} className={inputCls} /></div>
                    <div><label className="block text-sm font-dm font-medium mb-1">Tagline</label><input value={tagline} onChange={e => setTagline(e.target.value)} className={inputCls} /></div>
                    <div><label className="block text-sm font-dm font-medium mb-1">WhatsApp Number</label><input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className={inputCls} /></div>
                    <div><label className="block text-sm font-dm font-medium mb-1">UPI ID</label><input value={upi} onChange={e => setUpi(e.target.value)} className={inputCls} /></div>
                    <div><label className="block text-sm font-dm font-medium mb-1">Working Hours Start</label><input value={hoursStart} onChange={e => setHoursStart(e.target.value)} className={inputCls} placeholder="10:00" /></div>
                    <div><label className="block text-sm font-dm font-medium mb-1">Working Hours End</label><input value={hoursEnd} onChange={e => setHoursEnd(e.target.value)} className={inputCls} placeholder="20:00" /></div>
                    <div className="sm:col-span-2"><label className="block text-sm font-dm font-medium mb-1">Address</label><input value={address} onChange={e => setAddress(e.target.value)} className={inputCls} /></div>
                    <div className="sm:col-span-2"><label className="block text-sm font-dm font-medium mb-1">Google Maps Embed URL</label><input value={mapsUrl} onChange={e => setMapsUrl(e.target.value)} className={inputCls} /></div>
                    <div className="sm:col-span-2"><label className="block text-sm font-dm font-medium mb-1">In-Store Notice</label><input value={noticeText} onChange={e => setNoticeText(e.target.value)} className={inputCls} /></div>
                    <div className="flex items-center gap-2"><input type="checkbox" checked={noticeVisible} onChange={e => setNoticeVisible(e.target.checked)} /><label className="text-sm font-dm">Show notice on accessories page</label></div>
                </div>
                <button onClick={saveShop} disabled={saving} className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-hover-blue text-white text-sm font-poppins font-semibold rounded-xl transition-all">
                    <Save size={16} />{saving ? "Saving..." : "Save Settings"}
                </button>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl card-shadow p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-poppins font-semibold text-base text-deep-text">Social Media Links</h2>
                    <button onClick={addSocial} className="text-xs text-primary font-dm flex items-center gap-1"><Plus size={14} />Add</button>
                </div>
                <div className="space-y-3">
                    {social.map((link, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <select value={link.platform} onChange={e => { const n = [...social]; n[i] = { ...n[i], platform: e.target.value }; setSocial(n); }} className="px-3 py-2 rounded-xl border border-border-grey bg-light-grey text-sm font-dm w-36">
                                {["WhatsApp", "Instagram", "Facebook", "YouTube", "Twitter/X", "Custom"].map(p => <option key={p}>{p}</option>)}
                            </select>
                            <input value={link.url} onChange={e => { const n = [...social]; n[i] = { ...n[i], url: e.target.value }; setSocial(n); }} placeholder="URL" className="flex-1 px-3 py-2 rounded-xl border border-border-grey bg-light-grey text-sm font-dm" />
                            <button onClick={() => { const n = [...social]; n[i] = { ...n[i], isVisible: !n[i].isVisible }; setSocial(n); }} className="p-1.5 text-muted">{link.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                            <button onClick={() => removeSocial(i)} className="p-1.5 text-muted hover:text-error"><Trash2 size={14} /></button>
                        </div>
                    ))}
                </div>
                <button onClick={saveSocial} className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-hover-blue text-white text-sm font-poppins font-semibold rounded-xl"><Save size={16} />Save Links</button>
            </div>



            {/* Password Change */}
            <div className="bg-white rounded-xl card-shadow p-6">
                <h2 className="font-poppins font-semibold text-base text-deep-text mb-4">Change Password</h2>
                <div className="space-y-3 max-w-sm">
                    <div><label className="block text-sm font-dm font-medium mb-1">Current Password</label><input type="password" value={curPwd} onChange={e => setCurPwd(e.target.value)} className={inputCls} /></div>
                    <div><label className="block text-sm font-dm font-medium mb-1">New Password</label><input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} className={inputCls} /></div>
                </div>
                <button onClick={doChangePassword} disabled={!curPwd || !newPwd} className="mt-4 px-6 py-2.5 bg-primary hover:bg-hover-blue disabled:bg-border-grey text-white text-sm font-poppins font-semibold rounded-xl">Change Password</button>
            </div>
        </div>
    );
}
