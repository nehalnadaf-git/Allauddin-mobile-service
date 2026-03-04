export interface CartItem {
    id: string;
    name: string;
    price: number;       // price actually charged (0 for free BOGO items)
    originalPrice: number; // display price
    priceRange?: string;
    startingPrice?: number; // for services — used in WhatsApp message
    itemType: "product" | "service"; // differentiates accessories from repair services
    imageStorageId?: string;
    quantity: number;
    offerType?: "none" | "discount" | "bogo";
    isFreeItem?: boolean; // BOGO free row
    pairedItemId?: string; // links free row to paid row
}

export interface CartState {
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
}

export type CartAction =
    | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity" | "isFreeItem" | "pairedItemId"> }
    | { type: "REMOVE_ITEM"; payload: { id: string } }
    | { type: "INCREMENT"; payload: { id: string } }
    | { type: "DECREMENT"; payload: { id: string } }
    | { type: "CLEAR" };

function calculateTotals(items: CartItem[]): { totalItems: number; totalAmount: number } {
    return {
        // Don't count free items in item count display
        totalItems: items.filter(i => !i.isFreeItem).reduce((sum, item) => sum + item.quantity, 0),
        // Only sum paid items
        totalAmount: items.filter(i => !i.isFreeItem).reduce((sum, item) => sum + item.originalPrice * item.quantity, 0),
    };
}

function syncBogoFreeItems(items: CartItem[]): CartItem[] {
    // For each paid BOGO item, ensure a matching free row exists with the same quantity
    const result: CartItem[] = [];

    for (const item of items) {
        if (item.isFreeItem) continue; // skip free rows — we'll re-add them
        result.push(item);

        // Only products support BOGO — never services
        if (item.offerType === "bogo" && item.itemType === "product") {
            result.push({
                id: `${item.id}_free`,
                name: item.name,
                price: 0,
                originalPrice: 0,
                quantity: item.quantity,
                itemType: "product",
                offerType: "bogo",
                isFreeItem: true,
                pairedItemId: item.id,
            });
        }
    }

    return result;
}

export function cartReducer(state: CartState, action: CartAction): CartState {
    let newItems: CartItem[];

    switch (action.type) {
        case "ADD_ITEM": {
            const existingIndex = state.items.findIndex(
                (i) => i.id === action.payload.id && !i.isFreeItem
            );
            if (existingIndex >= 0) {
                newItems = state.items.map((item, index) =>
                    index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }
            // Strip existing free rows, re-sync
            newItems = syncBogoFreeItems(newItems);
            break;
        }
        case "REMOVE_ITEM": {
            // Remove paid item and its BOGO free partner
            newItems = state.items.filter((i) => i.id !== action.payload.id && i.pairedItemId !== action.payload.id);
            break;
        }
        case "INCREMENT": {
            newItems = state.items.map((item) =>
                item.id === action.payload.id && !item.isFreeItem
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            newItems = syncBogoFreeItems(newItems);
            break;
        }
        case "DECREMENT": {
            newItems = state.items
                .map((item) =>
                    item.id === action.payload.id && !item.isFreeItem
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0 || item.isFreeItem); // temp keep free
            // Filter out orphaned free items after decrement
            newItems = syncBogoFreeItems(newItems.filter(i => !i.isFreeItem));
            break;
        }
        case "CLEAR":
            newItems = [];
            break;
        default:
            return state;
    }

    return { items: newItems, ...calculateTotals(newItems) };
}

export const initialCartState: CartState = {
    items: [],
    totalItems: 0,
    totalAmount: 0,
};
