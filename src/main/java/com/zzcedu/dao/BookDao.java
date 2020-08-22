package com.zzcedu.dao;

import com.zzcedu.entity.Book;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BookDao {

    @Select("select * from cn_notebook where cn_user_id=#{userId}")
    List<Book> findByUserId(String userId);
}
