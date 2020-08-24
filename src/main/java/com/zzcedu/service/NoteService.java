package com.zzcedu.service;

import com.zzcedu.util.NoteResult;

public interface NoteService {
    NoteResult loadNotes(String bookId);
    NoteResult loadnote(String noteId);
    NoteResult updateNote(String noteId,String title,String body);
}
