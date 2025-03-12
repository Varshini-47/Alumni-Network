package com.example.alumni.controller;

import com.example.alumni.model.GalleryItem;
import com.example.alumni.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "http://localhost:3000") 
public class GalleryController {

    @Autowired
    private GalleryRepository galleryRepository;

    @GetMapping("/folders")
    public List<GalleryItem> getFolders() {
        return galleryRepository.findAll();
    }

    @GetMapping("/folder/{folderName}")
    public ResponseEntity<?> getImagesByFolder(@PathVariable String folderName) {
        Optional<GalleryItem> folder = galleryRepository.findByFolderName(folderName);

        if (!folder.isPresent()) {
            return ResponseEntity.status(404).body("Folder not found");
        }

        return ResponseEntity.ok(folder.get().getImageUrls());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestBody Map<String, String> requestBody) {
        System.out.println("entered-1");
        String folderName = requestBody.get("folderName");
        String imageUrl = requestBody.get("imageUrl");
        Long userId = Long.parseLong(requestBody.get("userId"));
        System.out.println("entered-2");

        if (folderName == null || imageUrl == null || folderName.isEmpty() || imageUrl.isEmpty()) {
            return ResponseEntity.badRequest().body("Folder name and image URL are required.");
        }

        GalleryItem folder = galleryRepository.findByFolderName(folderName)
            .orElseGet(() -> {
                GalleryItem newFolder = new GalleryItem();
                newFolder.setFolderName(folderName);
                newFolder.setUserId(userId);
                newFolder.setImageUrls(new ArrayList<>());
                return galleryRepository.save(newFolder);
            });
            System.out.println("entered-3");
        folder.getImageUrls().add(imageUrl);
        System.out.println("entered-4");
        galleryRepository.save(folder);
        System.out.println("entered-5");
        return ResponseEntity.ok(folder);
    }
}
