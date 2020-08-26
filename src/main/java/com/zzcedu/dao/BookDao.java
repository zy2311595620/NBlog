package com.zzcedu.dao;

import com.zzcedu.entity.Book;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BookDao {

    @Select("select * from cn_notebook where cn_user_id=#{userId}")
    List<Book> findByUserId(String userId);
    @Insert("insert into cn_notebook (cn_notebook_id,cn_user_id," +
            "cn_notebook_type_id,cn_notebook_name,cn_notebook_createtime)" +
            " values(#{cn_notebook_id},#{cn_user_id},'5',#{cn_notebook_name},#{cn_notebook_createtime})")
    void save(Book book);
    @Delete("delete cn_notebook_id,cn_user_id,cn_notebook_type_id,cn_notebook_name,cn_notebook_desc, cn_notebook_createtime" +
            "from cn_notebook where cn_notebook_id = #{bookId}")
    void del(String bookId);
}
