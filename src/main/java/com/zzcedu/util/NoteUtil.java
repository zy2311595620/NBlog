package com.zzcedu.util;

import com.alibaba.druid.util.Base64;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

public class NoteUtil {
    public static  String createId(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replace("-","");
    }
    //非对称加密算法
    public static String md5(String src) throws Exception {
        //将字符串信息采用md5处理
        MessageDigest md5=  MessageDigest.getInstance("MD5");
         byte[] digest= md5.digest(src.getBytes());
         //讲md5处理结果利用base64转换成字符串
        String s=Base64.byteArrayToBase64(digest);
        return s;
    }


    public static void main(String[] args) throws Exception{
        System.out.println(createId());
        System.out.println(md5("123456"));
    }
}
