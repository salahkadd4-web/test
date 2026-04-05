package com.cabastore.app;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.webkit.CookieManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
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
}