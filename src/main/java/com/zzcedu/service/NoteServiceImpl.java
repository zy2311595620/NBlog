package com.zzcedu.service;

import com.zzcedu.dao.NoteDao;
import com.zzcedu.entity.Note;
import com.zzcedu.util.NoteResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class NoteServiceImpl implements NoteService{
    @Resource
    private NoteDao noteDao;

    @Override
    public NoteResult loadNotes(String bookId) {
        NoteResult noteResult=new NoteResult();
        List<Note> note=noteDao.findByBookId(bookId);
        noteResult.setStatus(0);
        noteResult.setMsg("加载完成");
        noteResult.setData(note);
        return noteResult;
    }
}
