import { CartItem } from "./cartReducer";

export function buildRepairLink(phone: string): string {
    const message = encodeURIComponent(
        "Hi, I would like to book a repair for my phone. Can you help me?"
    );
    return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`;
}

/**
 * Builds a structured, split WhatsApp message that clearly separates
 * Repair Services from Accessories.
 */
function buildSplitMessage(
    items: CartItem[],
    total: number,
    paymentMethod: string,
    upiDetails?: { upiId: string; amount: number }
): string {
    const services = items.filter(i => i.itemType === "service");
    const products = items.filter(i => i.itemType === "product" && !i.isFreeItem);

    const lines: string[] = ["Hi Allauddin! Here is my request:"];

    // ── Repair Services Section ──
    if (services.length > 0) {
        lines.push("\n*REPAIR SERVICES*");
        services.forEach((item, idx) => {
            const priceStr = item.startingPrice
                ? `Starting Rs.${item.startingPrice}`
                : "Price on diagnosis";
            lines.push(`${idx + 1}. ${item.name}  -  ${priceStr}`);
        });
    }

    // ── Accessories Section ──
    if (products.length > 0) {
        lines.push("\n*ACCESSORIES*");
        let lineNum = 1;
        for (const item of products) {
            const linePrice = item.originalPrice * item.quantity;
            lines.push(`${lineNum}. ${item.name} x${item.quantity}  -  Rs.${linePrice}`);
            // BOGO free item — show inline
            if (item.offerType === "bogo") {
                lines.push(`   + ${item.name} x${item.quantity}  -  FREE (Buy One Get One)`);
            }
            lineNum++;
        }
        lines.push(`\n*Accessories Total: Rs.${total}*`);
    }

    // ── Payment Section ──
    if (upiDetails) {
        // UPI payment — embed the payment link in the message
        const { upiId, amount } = upiDetails;
        const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&am=${amount}&cu=INR&tn=Order+Payment`;
        lines.push("\n*PAYMENT*");
        lines.push(`Method: UPI`);
        lines.push(`Amount: Rs.${amount}`);
        lines.push(`Pay here: ${upiLink}`);
    } else if (services.length > 0 && products.length === 0) {
        lines.push("\nThe repair price will be confirmed after diagnosis.");
        lines.push(`Payment: ${paymentMethod}`);
    } else {
        lines.push(`\nPayment: ${paymentMethod}`);
    }

    lines.push("\nPlease confirm my request!");

    return lines.join("\n");
}

export function buildCashOrderLink(
    phone: string,
    items: CartItem[],
    total: number,
): string {
    const message = buildSplitMessage(items, total, "Cash on Pickup");
    return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}

export function buildUpiLink(
    upiId: string,
    amount: number,
    name: string = "Allauddin Mobile Service"
): string {
    return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=Order+Request`;
}

/**
 * Builds a WhatsApp link with the UPI payment link embedded in the message body.
 * Returns only whatsappLink — no separate redirect needed.
 */
export function buildUpiOrderLink(
    phone: string,
    items: CartItem[],
    total: number,
    upiId: string,
): { whatsappLink: string } {
    const message = buildSplitMessage(items, total, "UPI", { upiId, amount: total });
    return {
        whatsappLink: `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`,
    };
}
