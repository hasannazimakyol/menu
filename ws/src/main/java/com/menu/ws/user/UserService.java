package com.menu.ws.user;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.menu.ws.configuration.CurrentUser;
import com.menu.ws.email.EmailService;
import com.menu.ws.file.FileService;
import com.menu.ws.role.Role;
import com.menu.ws.role.RoleRepository;
import com.menu.ws.user.dto.AssignRole;
import com.menu.ws.user.dto.PasswordResetRequest;
import com.menu.ws.user.dto.PasswordUpdate;
import com.menu.ws.user.dto.UserUpdate;
import com.menu.ws.user.exception.ActivationNotificationException;
import com.menu.ws.user.exception.InvalidTokenException;
import com.menu.ws.user.exception.NotFoundException;
import com.menu.ws.user.exception.NotUniqueEmailException;
import com.menu.ws.user.exception.PasswordResetRequestNotificationException;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    // PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); created at
    // AppUserDetailsService

    @Autowired
    EmailService emailService;

    @Autowired
    FileService fileService;

    @Transactional(rollbackOn = MailException.class)
    public void save(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setActivationToken(UUID.randomUUID().toString());
            userRepository.saveAndFlush(user); // to discard the proxy service commit
            // userRepository.save(user);
            emailService.sendActivationEmail(user.getEmail(), user.getActivationToken());
        } catch (DataIntegrityViolationException e) {
            throw new NotUniqueEmailException();
        } catch (MailException ex) {
            throw new ActivationNotificationException();
        }
    }

    public void activateUser(String token) {
        User inDB = userRepository.findByActivationToken(token);
        if (inDB == null) {
            throw new InvalidTokenException();
        }
        inDB.setActive(true);
        inDB.setActivationToken(null);
        userRepository.save(inDB);
    }

    public Page<User> getUsers(Pageable pageable, CurrentUser currentUser) {
        if (currentUser == null) {
            return userRepository.findAll(pageable);
        }
        return userRepository.findByIdNot(currentUser.getId(), pageable);
    }

    public User getUser(long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(long id, UserUpdate userUpdate) {
        User inDB = getUser(id);
        inDB.setUsername(userUpdate.username());
        if (userUpdate.image() != null) {
            String fileName = fileService.saveBase64StringAsFile(userUpdate.image());
            fileService.deleteProfileImage(inDB.getImage());
            inDB.setImage(fileName);
        }
        return userRepository.save(inDB);
    }

    public void deleteUser(long id) {
        User inDB = getUser(id);
        if (inDB.getImage() != null) {
            fileService.deleteProfileImage(inDB.getImage());
        }
        userRepository.delete(inDB);
    }

    public void handleResetRequest(PasswordResetRequest passwordResetRequest) {
        User inDB = findByEmail(passwordResetRequest.email());
        if (inDB == null)
            throw new NotFoundException(0);
        inDB.setPasswordResetToken(UUID.randomUUID().toString());
        userRepository.save(inDB);
        try {
            emailService.sendPasswordResetToken(inDB.getEmail(), inDB.getPasswordResetToken());
        } catch (MailException ex) {
            throw new PasswordResetRequestNotificationException();
        }
    }

    public void updatePassword(String token, PasswordUpdate passwordUpdate) {
        User inDB = userRepository.findByPasswordResetToken(token);
        if (inDB == null)
            throw new InvalidTokenException();
        inDB.setPasswordResetToken(null);
        inDB.setPassword(passwordEncoder.encode(passwordUpdate.password()));
        inDB.setActive(true);
        userRepository.save(inDB);
    }

    public User addRoleToUser(AssignRole assignRole) {
        User inDB = userRepository.findByEmail(assignRole.email());
        if (inDB == null)
            throw new NotFoundException(0);
        Role role = roleRepository.findByName(assignRole.roleName())
                .orElseThrow(() -> new RuntimeException("Role cannot found"));

        inDB.getRoles().add(role);
        return userRepository.save(inDB);
    }

}
