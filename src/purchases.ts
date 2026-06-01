// Freemium entitlement + purchase flow.
//
// The ONLY piece that needs real store setup is the body of purchasePremium()
// / restorePurchases(). Everything else (gating, paywall, persistence) works
// today. To go live you need:
//   1. An Apple Developer account → a non-consumable IAP product in App Store
//      Connect (e.g. id "com.sukooshot.app.premium").
//   2. A Google Play Console account → a matching in-app product.
//   3. An IAP provider. Recommended: RevenueCat (@revenuecat/purchases-capacitor)
//      — one SDK for both stores, handles receipts + restore. Then replace the
//      TODO bodies below with Purchases.purchasePackage(...) etc.
//
// Until those exist, purchasePremium() unlocks locally so the whole flow is
// demoable on web + simulator.

const KEY = "sos_premium_v1";

/** Display price for the paywall. Keep in sync with the store product. */
export const PREMIUM_PRICE = "₱149";
/** Store product identifier to configure in App Store Connect / Play Console. */
export const PREMIUM_PRODUCT_ID = "com.sukooshot.app.premium";

export function isPremium(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function persist(unlocked: boolean) {
  try {
    if (unlocked) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — entitlement stays in memory for this session */
  }
}

/**
 * Buy the premium unlock.
 * TODO(IAP): replace with a real provider call, e.g. RevenueCat:
 *   const offerings = await Purchases.getOfferings();
 *   const pkg = offerings.current?.availablePackages[0];
 *   const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
 *   const ok = customerInfo.entitlements.active["premium"] != null;
 *   if (ok) persist(true);
 *   return ok;
 */
export async function purchasePremium(): Promise<boolean> {
  // No store product wired yet → unlock locally so the UX is complete.
  persist(true);
  return true;
}

/**
 * Restore a previous purchase (required by App Store review).
 * TODO(IAP): const info = await Purchases.restorePurchases();
 *            const ok = info.customerInfo.entitlements.active["premium"] != null;
 */
export async function restorePurchases(): Promise<boolean> {
  return isPremium();
}

/** Dev helper to re-lock (e.g. for testing the paywall). */
export function resetPremium() {
  persist(false);
}
