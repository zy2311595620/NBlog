package com.zzcedu.service;

import com.zzcedu.util.NoteResult;

public interface BookService {
    NoteResult loadUserBooks(String userId);
    NoteResult addBook(String userId,String name);
    NoteResult del(String bookId);
}
