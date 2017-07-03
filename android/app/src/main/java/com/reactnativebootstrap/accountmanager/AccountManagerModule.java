package com.reactnativebootstrap.accountmanager;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.ReadableMap;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import android.R.string;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.accounts.AccountManagerFuture;
import android.accounts.AuthenticatorException;
import android.accounts.OperationCanceledException;
import android.os.Bundle;

public class AccountManagerModule extends ReactContextBaseJavaModule
{
    private ReactApplicationContext _reactContext = null;

    public AccountManagerModule(ReactApplicationContext reactContext)
    {
        super(reactContext);
        _reactContext = reactContext;
    }

    @Override
    public String getName()
    {
        return "AccountManager";
    }

    AccountManager manager = null;

    Integer accumulator = 0;
    HashMap<Integer, Account> accounts = new HashMap<Integer, Account>();

    private Integer indexForAccount(Account account)
    {
        for(Entry<Integer, Account> e: accounts.entrySet())
        {
            if(e.getValue().equals(account))
            {
                return e.getKey();
            }
        }

        accounts.put(accumulator, account);
        return accumulator++;
    }

    @ReactMethod
    public void addAccount(String accountType, String userName, String password, Promise promise)
    {
        manager = AccountManager.get(_reactContext);
        Account account = new Account(userName, accountType);
        Integer index = indexForAccount(account);
        Bundle userdata = new Bundle();

        if(!manager.addAccountExplicitly(account, password, userdata))
        {
            promise.reject("Account with username already exists!");
            return;
        }

        WritableNativeMap result = new WritableNativeMap();
        result.putString("name", account.name);
        result.putString("type", account.type);
        result.putString("password", password);
        result.putInt("_index", index);

        promise.resolve(result);
    }

    @ReactMethod
    public void getAccounts(String accountType, Promise promise)
    {
        manager = AccountManager.get(_reactContext);

        Account[] accountsList = manager.getAccountsByType(accountType);
        WritableNativeArray result = new WritableNativeArray();

        for(Account account:accountsList)
        {
            WritableNativeMap acc = new WritableNativeMap();

            Integer index = indexForAccount(account);

            acc.putString("name", account.name);
            acc.putString("type", account.type);
            acc.putString("password", manager.getPassword(account));
            acc.putInt("_index", index);

            result.pushMap(acc);
        }

        promise.resolve(result);
    }

    @ReactMethod
    public void getUserData (ReadableMap accountObject, String key, Promise promise)
    {
        Account account = accounts.get(accountObject.getInt("_index"));

        if(account == null) {
            promise.reject("No account present!");
            return;
        }

        promise.resolve(manager.getUserData(account, key));
    }

    @ReactMethod
    public void setUserData (ReadableMap accountObject, String key, String data, Promise promise)
    {
        Account account = accounts.get(accountObject.getInt("_index"));

        if(account == null) {
            promise.reject("No account present!");
            return;
        }

        manager.setUserData(account, key, data);

        promise.resolve(null);
    }

}
