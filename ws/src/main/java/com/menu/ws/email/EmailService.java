package com.menu.ws.email;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
// import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.menu.ws.configuration.MenuProperties;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    JavaMailSenderImpl mailSender;

    @Autowired
    MenuProperties menuProperties;

    @Autowired
    MessageSource messageSource;

    // @Value("${menu.email.host}")
    // String host;

    @PostConstruct
    private void initialize() {
        this.mailSender = new JavaMailSenderImpl();
        mailSender.setHost(menuProperties.getEmail().host());
        mailSender.setPort(menuProperties.getEmail().port());
        mailSender.setUsername(menuProperties.getEmail().username());
        mailSender.setPassword(menuProperties.getEmail().password());

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable", true);
    }

    String emailTemplate = """
                <html>
                    <body>
                        <h1>${title}</h1>
                        <a href="${url}">${clickHere}</a>
                    <body>
                </html>
            """;

    public void sendActivationEmail(String email, String activationToken) {
        var activationUrl = menuProperties.getClient().host() + "/activation/" + activationToken;

        var title = messageSource.getMessage("menu.mail.user.created.title", null, LocaleContextHolder.getLocale());
        var clickHere = messageSource.getMessage("menu.mail.click.here", null, LocaleContextHolder.getLocale());

        var mailBody = emailTemplate
                .replace("${url}", activationUrl)
                .replace("${title}", title)
                .replace("${clickHere}", clickHere);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

        try {
            message.setFrom(menuProperties.getEmail().from());
            message.setTo(email);
            message.setSubject(title);
            message.setText(mailBody, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        this.mailSender.send(mimeMessage);
    }

    public void sendPasswordResetToken(String email, String passwordResetToken) {
        var activationUrl = menuProperties.getClient().host() + "/password-reset/set?tk=" + passwordResetToken;

        var title = messageSource.getMessage("menu.mail.user.password.reset.title", null, LocaleContextHolder.getLocale());
        var clickHere = messageSource.getMessage("menu.mail.click.here", null, LocaleContextHolder.getLocale());

        var mailBody = emailTemplate
                .replace("${url}", activationUrl)
                .replace("${title}", title)
                .replace("${clickHere}", clickHere);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

        try {
            message.setFrom(menuProperties.getEmail().from());
            message.setTo(email);
            message.setSubject(title);
            message.setText(mailBody, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        this.mailSender.send(mimeMessage);
    }

}
