package com.zzcedu.service;

import com.zzcedu.dao.NoteDao;
import com.zzcedu.dao.ShareDao;
import com.zzcedu.entity.Note;
import com.zzcedu.entity.Share;
import com.zzcedu.util.NoteResult;
import com.zzcedu.util.NoteUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Service
public class ShareServiceImpl implements ShareService{
   @Resource
   private ShareDao shareDao;
    @Resource
    private NoteDao noteDao;
    @Override
    public NoteResult ShareNote(String noteId) {
        NoteResult noteResult = new NoteResult();
        Note note1 = noteDao.findById(noteId);
        if ("2".equals(note1.getCn_note_type_id())){
            noteResult.setStatus(1);
            noteResult.setMsg("笔记已经分享过了");
            return noteResult;
        }
        Note note=new Note();
        note.setCn_note_id(noteId);
        note.setCn_note_type_id("2");
        noteDao.updateNote(note);

        Share share = new Share();
        share.setCn_share_id(NoteUtil.createId());
        share.setCn_share_body(note1.getCn_note_body());
        share.setCn_share_title(note1.getCn_note_title());
        share.setCn_note_id(noteId);
        shareDao.save(share);
        noteResult.setStatus(0);
        noteResult.setMsg("分享成功");
        return noteResult;
    }

    @Override
    public NoteResult searchShareNote(String keyword, Integer page) {
       NoteResult noteResult=new NoteResult();
       String title = "%";

       if (keyword != null && !"".equals(keyword)){
           title = "%"+keyword+"%";
       }

       if (page < 1){
           page = 1;
       }
       int begin = (page-1)*5;
        List<Share> shareList= shareDao.fingLikeTitle(title,begin);
       noteResult.setStatus(0);
       noteResult.setMsg("查询成功");
       noteResult.setData(shareList);
        return noteResult;
    }

    @Override
    public NoteResult findByShareId(String shareId) {
        NoteResult noteResult = new NoteResult();
        Share share = new Share();

        share.setCn_share_id(shareId);

        Share byShareId = shareDao.findByShareId(share);
        noteResult.setStatus(0);
        noteResult.setMsg("加载成功");
        noteResult.setData(byShareId);
        return noteResult;
    }
}
