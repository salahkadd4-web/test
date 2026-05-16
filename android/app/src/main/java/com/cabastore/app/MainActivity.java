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

    // ── Effacer les cookies sur nouvelle install / mise à jour ─────────────
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

    // ── Point d'entrée unique à chaque lancement ───────────────────────────
    // /app-entry est un Server Component qui vérifie la session côté serveur
    // et redirige avant d'envoyer du HTML :
    //   → pas de session : /connexion
    //   → connecté       : / ou /admin ou /vendeur selon le rôle
    getBridge().getWebView().loadUrl(SERVER_URL + "/app-entry");
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