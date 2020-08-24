package com.zzcedu.controller;

import com.zzcedu.service.NoteService;
import com.zzcedu.util.NoteResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class UpdateNoteController {
    @Resource
    private NoteService noteService;
    @RequestMapping("/note/update.do")
    public NoteResult execute(String noteId,String title,String body){
    return noteService.updateNote(noteId,title,body);
}
}
