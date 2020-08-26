package com.zzcedu.controller;

import com.zzcedu.service.NoteService;
import com.zzcedu.util.NoteResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class MoveNoteController {
    @Resource
    private NoteService noteService;
    @RequestMapping("/note/move.do")
    public NoteResult execute(String noteId,String bookId){
        return noteService.moveNote(noteId,bookId);
    }
}
