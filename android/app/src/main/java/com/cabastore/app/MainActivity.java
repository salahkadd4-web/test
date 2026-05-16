package com.cabastore.app;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.webkit.CookieManager;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.PluginHandle;
import ee.forgr.capacitor.social.login.GoogleProvider;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {

  private static final String SERVER_URL = "https://caba-store.vercel.app";

  @Override
  public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {}

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    registerPlugin(SocialLoginPlugin.class);

    // ── Effacer les cookies uniquement sur nouvelle install / mise à jour ───
    try {
      SharedPreferences prefs = getSharedPreferences("app_prefs", MODE_PRIVATE);
      PackageInfo info = getPackageManager().getPackageInfo(getPackageName(), 0);
      int currentVersionCode = info.versionCode;
      int storedVersionCode  = prefs.getInt("last_version_code", -1);

      if (storedVersionCode != currentVersionCode) {
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.removeAllCookies(null);
        cookieManager.flush();
        prefs.edit().putInt("last_version_code", currentVersionCode).apply();
      }
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }

    super.onCreate(savedInstanceState);

    // ── Toujours démarrer sur /connexion à chaque lancement ────────────────
    // Le splash screen est encore visible ici → zéro flash de l'accueil.
    // Si l'utilisateur est déjà connecté, la page /connexion le redirige
    // automatiquement vers son espace (voir ConnexionContent useEffect).
    getBridge().getWebView().loadUrl(SERVER_URL + "/connexion");
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    if (
      requestCode >= GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MIN &&
      requestCode < GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MAX
    ) {
      PluginHandle pluginHandle = getBridge().getPlugin("SocialLogin");
      if (pluginHandle == null) return;
      SocialLoginPlugin plugin = (SocialLoginPlugin) pluginHandle.getInstance();
      if (plugin == null) return;
      plugin.handleGoogleLoginIntent(requestCode, data);
    }
  }
}