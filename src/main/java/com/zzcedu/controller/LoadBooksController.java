package com.zzcedu.controller;

import com.zzcedu.service.BookService;
import com.zzcedu.util.NoteResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class LoadBooksController {
    @Resource
    private BookService bookService;
    @RequestMapping("/book/loadbooks.do")
    public NoteResult execute(String userId){
        return bookService.loadUserBooks(userId);
    }

}
