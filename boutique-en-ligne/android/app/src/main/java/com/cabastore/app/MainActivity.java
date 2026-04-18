package com.cabastore.app;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.webkit.CookieManager;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;
import ee.forgr.capacitor.social.login.GoogleProvider;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    registerPlugin(SocialLoginPlugin.class);

    SharedPreferences prefs = getSharedPreferences("app_prefs", MODE_PRIVATE);
    boolean isFirstLaunch = prefs.getBoolean("first_launch", true);
    if (isFirstLaunch) {
      CookieManager cookieManager = CookieManager.getInstance();
      cookieManager.removeAllCookies(null);
      cookieManager.flush();
      prefs.edit().putBoolean("first_launch", false).apply();
    }

    super.onCreate(savedInstanceState);
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
      plugin.handleGoogleLoginIntent(requestCode, resultCode, data);
    }
  }
}