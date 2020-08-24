package com.zzcedu.service;

import com.zzcedu.dao.NoteDao;
import com.zzcedu.entity.Note;
import com.zzcedu.util.NoteResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.SQLOutput;
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

    @Override
    public NoteResult loadnote(String noteId) {
        NoteResult result=new NoteResult();
        Note notes=noteDao.findById(noteId);

        result.setStatus(0);
        result.setMsg("加载完成");
        result.setData(notes);
        return result;
    }

    @Override
    public NoteResult updateNote(String noteId, String title, String body) {
        NoteResult rs=new NoteResult();
        Note note=new Note();
        note.setCn_note_id(noteId);
        note.setCn_note_body(body);
        note.setCn_note_title(title);

        //笔记修改时间
        note.setCn_note_last_modify_time(System.currentTimeMillis());
        int i= noteDao.updateNote(note);
        if (i == 1){
            rs.setStatus(0);
            rs.setMsg("修改成功");
            rs.setData(i);
        }else{
            rs.setStatus(1);
            rs.setMsg("修改失败");
        }

        return rs;
    }


}
