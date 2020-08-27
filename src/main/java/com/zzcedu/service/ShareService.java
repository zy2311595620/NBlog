package com.zzcedu.service;

import com.zzcedu.util.NoteResult;
import org.apache.ibatis.annotations.Select;

public interface ShareService {
    NoteResult ShareNote(String noteId);
    NoteResult searchShareNote(String keyword,Integer page );
    NoteResult findByShareId(String shareId);
}
