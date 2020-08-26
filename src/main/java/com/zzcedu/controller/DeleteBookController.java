package com.zzcedu.controller;

import com.zzcedu.service.BookService;
import com.zzcedu.service.NoteService;

import com.zzcedu.util.NoteResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class DeleteBookController {
    @Resource
    private BookService bookService;
    @RequestMapping("/book/del.do")
    public NoteResult execute(String bookId){
        return bookService.del(bookId);
    }
}
