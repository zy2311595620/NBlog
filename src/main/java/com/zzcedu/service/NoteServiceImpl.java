package com.zzcedu.service;

import com.zzcedu.dao.NoteDao;
import com.zzcedu.entity.Note;
import com.zzcedu.util.NoteResult;
import com.zzcedu.util.NoteUtil;
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

    @Override
    public NoteResult save(String bookId, String title,String userId) {
        NoteResult noteResult=new NoteResult();
        Note note = new Note();

        note.setCn_note_id(NoteUtil.createId());
        note.setCn_notebook_id(bookId);
        note.setCn_user_id(userId);
        note.setCn_note_title(title);
        note.setCn_note_last_modify_time(System.currentTimeMillis());
        note.setCn_note_create_time(System.currentTimeMillis());
        noteDao.save(note);
        noteResult.setStatus(0);
        noteResult.setMsg("创建成功");
        noteResult.setData(note);
        return noteResult;
    }

    @Override
    public NoteResult deleteNotes(String noteId) {
        NoteResult noteResult = new NoteResult();
        Note note = new Note();
        note.setCn_note_id(noteId);

        note.setCn_note_status_id("2");

        int i= noteDao.updateNote(note);
        if (i >= 1){
            noteResult.setStatus(0);
            noteResult.setMsg("删除成功");

        }else{
            noteResult.setStatus(1);
            noteResult.setMsg("删除失败");
        }
        return noteResult;
    }

    @Override
    public NoteResult moveNote(String noteId, String bookId) {
        NoteResult noteResult = new NoteResult();
        Note note = new Note();
        note.setCn_note_id(noteId);
        note.setCn_notebook_id(bookId);

        int i = noteDao.updateNote(note);
        if (i>=1){
            noteResult.setStatus(0);
            noteResult.setMsg("转移成功");
        }else {
            noteResult.setStatus(0);
            noteResult.setMsg("转移失败");
        }
        return noteResult;
    }


}
