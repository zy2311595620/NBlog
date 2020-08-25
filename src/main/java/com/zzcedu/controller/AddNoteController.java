package com.zzcedu.controller;

import com.zzcedu.service.NoteService;
import com.zzcedu.util.NoteResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class AddNoteController {
    @Resource
    private NoteService noteService;
    @RequestMapping("/note/addnote.do")
    public NoteResult execute(String bookId,String title ,String userId){
        return noteService.save(bookId,title,userId);
    }
}
