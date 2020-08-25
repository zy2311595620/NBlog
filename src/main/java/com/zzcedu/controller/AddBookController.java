package com.zzcedu.controller;

import com.zzcedu.service.BookService;
import com.zzcedu.util.NoteResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class AddBookController {
    @Resource
    private BookService bookService;
    @RequestMapping("/book/add.do")
    public NoteResult execute(String userId,String name) {
        return bookService.addBook(userId,name);
    }
}
