// Thin wrappers around Capacitor plugins that degrade gracefully on the web.
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

export const isNative = Capacitor.isNativePlatform();

/** Heavy buzz when someone takes a shot. No-ops if haptics are unavailable. */
export async function buzzShot() {
  try {
    await Haptics.notification({ type: NotificationType.Warning });
    await Haptics.impact({ style: ImpactStyle.Heavy });
  } catch {
    /* unsupported (e.g. desktop browser) — ignore */
  }
}

/** Light tick for a safe "Ginawa". */
export async function tick() {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    /* ignore */
  }
}
