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

  // URL de production — doit correspondre à server.url dans capacitor.config.ts
  private static final String SERVER_URL = "https://caba-store.vercel.app";

  @Override
  public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {
    // Méthode requise par l'interface — ne rien mettre ici
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    registerPlugin(SocialLoginPlugin.class);

    // ── Détection nouvelle installation ou mise à jour ──────────────────────
    // On compare le versionCode stocké avec le versionCode actuel.
    // SharedPreferences persistent à travers les réinstallations, donc un
    // simple boolean "first_launch" ne suffisait pas — le versionCode résout ça.
    boolean isNewInstallOrUpdate = false;

    try {
      SharedPreferences prefs = getSharedPreferences("app_prefs", MODE_PRIVATE);
      PackageInfo info = getPackageManager().getPackageInfo(getPackageName(), 0);
      int currentVersionCode = info.versionCode;
      int storedVersionCode  = prefs.getInt("last_version_code", -1);

      if (storedVersionCode != currentVersionCode) {
        isNewInstallOrUpdate = true;

        // Effacer tous les cookies du WebView (évite la session fantôme admin)
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.removeAllCookies(null);
        cookieManager.flush();

        // Mémoriser la version pour ne pas re-effacer au prochain lancement
        prefs.edit().putInt("last_version_code", currentVersionCode).apply();
      }
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }

    // ── Initialisation du bridge Capacitor ──────────────────────────────────
    super.onCreate(savedInstanceState);

    // ── Redirection vers /connexion au premier lancement ────────────────────
    // loadUrl() est appelé juste après super.onCreate() : le splash screen est
    // encore visible à ce moment, donc l'utilisateur ne voit JAMAIS la page
    // d'accueil — l'app s'ouvre directement sur le formulaire de connexion.
    if (isNewInstallOrUpdate) {
      getBridge().getWebView().loadUrl(SERVER_URL + "/connexion");
    }
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