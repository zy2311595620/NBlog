package com.zzcedu.service;


import com.zzcedu.util.NoteResult;


import javax.annotation.Resource;


public interface UserService {
    public NoteResult checkLogin(String name,String password);

    NoteResult addUser(String name,String ncik,String password);


}
