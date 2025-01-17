package com.menu.ws.file;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.menu.ws.configuration.MenuProperties;

@Service
public class FileService {

    @Autowired
    MenuProperties menuProperties;

    Tika tika = new Tika();

    public String saveBase64StringAsFile(String image) {
        String fileName = UUID.randomUUID().toString();
        // File file = new File(fileName);
        // Path path = Paths.get("uploads", "profile", fileName);
        Path path = getProfileImagePath(fileName);
        try {
            OutputStream outputStream = new FileOutputStream(path.toFile());
            byte[] base64Decoded = decodeImage(image);
            outputStream.write(base64Decoded);
            outputStream.close();
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String detectType(String value) {
        return tika.detect(decodeImage(value));
    }

    private byte[] decodeImage(String encodedImage) {
        return Base64.getDecoder().decode(encodedImage.split(",")[1]);
    }

    public void deleteProfileImage(String image) {
        if (image == null)
            return;
        Path path = getProfileImagePath(image);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Path getProfileImagePath(String filename) {
        return Paths.get(menuProperties.getStorage().getRoot(), menuProperties.getStorage().getProfile(),
                filename);
    }

}
