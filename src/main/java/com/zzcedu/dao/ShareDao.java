package com.zzcedu.dao;

import com.zzcedu.entity.Share;
import org.apache.ibatis.annotations.Insert;

public interface ShareDao {
    @Insert("insert into cn_share(cn_share_id,cn_share_title,cn_share_body,cn_note_id) values(#{cn_share_id},#{cn_share_title},#{cn_share_body},#{cn_note_id})")
    int save(Share share);
}
