### Install

```
git clone ssh://git@git.bekitzur.com:2222/showcases/react-native-bootstrap.git

cd react-native-bootstrap

npm install
```

### Runing on iOS

Open ``ios/ReactNativeBootstrap.xcworkspace`` with Xcode, then run ``Build`` command.

### Running on Android

Open terminal under project directory, check connected phusical/virtual devices via ``adb devices``, then run the following command ``react-native run-android``

### Generate signed .apk

You can generate a private signing key using keytool. On Windows keytool must be run from ``C:\Program Files\Java\jdkx.x.x_x\bin``.

Run following command in terminal:

```
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

This command prompts you for passwords for the keystore and key, and to provide the Distinguished Name fields for your key. It then generates the keystore as a file called my-release-key.keystore.

* Place the my-release-key.keystore file under the android/app directory in your project folder.
* Edit the file ``~/.gradle/gradle.properties`` and add the following (replace ***** with the correct keystore password, alias and key password),

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

* Edit the file ``android/app/build.gradle`` in your project folder and add the signing config,

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

* To generate signed .apk run the followed command under ``/android`` directory

```
./gradlew assembleRelease
```









### Troubleshooting

1) Error while running Gradle sync ``The SDK Build Tools revision (23.0.1) is too low for project ':react-native-vector-icons'. Minimum required is 25.0.0`` just click <a href="#">Update Build Tools version and sync project</a><br>
2) Error while building iOS app ``Cannot find config.h file`` - navigate to ``<project_dir>/node_modules/react-native/`` and remove ``third-party`` folder, then try again.

