package com.zzcedu.service;

import com.zzcedu.dao.BookDao;
import com.zzcedu.entity.Book;
import com.zzcedu.util.NoteResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BookServiceImpl implements BookService{
    @Resource
    private BookDao bookDao;
    @Override
    public NoteResult loadUserBooks(String userId) {
        NoteResult noteResult=new NoteResult();
        List<Book> books= bookDao.findByUserId(userId);
        noteResult.setStatus(0);
        noteResult.setMsg("查询笔记成功");
        noteResult.setData(books);
        return noteResult;
    }
}
