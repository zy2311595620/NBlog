package com.zzcedu.controller;

import com.zzcedu.service.ShareService;
import com.zzcedu.util.NoteResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class ShowNoteController {
    @Resource
    private ShareService shareService;
    @RequestMapping("/share/showNote.do")
    public NoteResult execute(String shareId){
            return shareService.findByShareId(shareId) ;
    }
}
