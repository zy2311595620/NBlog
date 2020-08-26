package com.zzcedu.controller;

import com.zzcedu.service.ShareService;
import com.zzcedu.util.NoteResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class ShareNoteController {
    @Resource
    private ShareService shareService;
    @RequestMapping("/share/share.do")
    public NoteResult execute(String noteId){
        return shareService.ShareNote(noteId);
    }
}
