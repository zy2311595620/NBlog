package com.zzcedu.service;

import com.zzcedu.util.NoteResult;

public interface NoteService {
    NoteResult loadNotes(String bookId);
    NoteResult loadnote(String noteId);
    NoteResult updateNote(String noteId,String title,String body);
    NoteResult save(String bookId,String title,String userId);
    NoteResult deleteNotes(String noteId);
    NoteResult moveNote(String noteId,String bookId);
}
