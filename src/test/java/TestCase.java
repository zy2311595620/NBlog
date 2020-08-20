import com.zzcedu.dao.UserDao;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestCase {
    @Test
    public  void test(){
        ApplicationContext ac=
        new ClassPathXmlApplicationContext("applicationContext.xml");
        UserDao userDao=ac.getBean("userDao",UserDao.class);
        System.out.println(userDao.findAll());
    }
}
