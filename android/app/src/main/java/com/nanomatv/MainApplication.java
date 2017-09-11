package com.nanomatv;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  // protected List<ReactPackage> getPackages() {
  //   // Add additional packages you require here
  //   // No need to add RnnPackage and MainReactPackage
  //   return Arrays.<ReactPackage>asList(
  //       // eg. new VectorIconsPackage()
  //         new MainReactPackage()
  //       );
  // }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
        // eg. new VectorIconsPackage()
          new MainReactPackage()
        );
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
