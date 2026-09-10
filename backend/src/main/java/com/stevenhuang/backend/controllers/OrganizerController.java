package com.stevenhuang.backend.controllers;

import com.stevenhuang.backend.models.Organizer;
import com.stevenhuang.backend.repositories.OrganizerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizers")
public class OrganizerController {

    private final OrganizerRepository organizerRepository;

    public OrganizerController(OrganizerRepository organizerRepository) {
        this.organizerRepository = organizerRepository;
    }

    // GET all > http://127.0.0.1:8080/api/organizers
    @GetMapping
    public List<Organizer> getAllOrganizers() {
        return organizerRepository.findAll();
    }

    // GET one > http://127.0.0.1:8080/api/organizers/{id}
    @GetMapping("/{id}")
    public Organizer getOrganizerById(@PathVariable int id) {
        return organizerRepository.findById(id).orElse(null);
    }

    // POST > http://127.0.0.1:8080/api/organizers
    @PostMapping
    public Organizer createOrganizer(@RequestBody Organizer organizer) {
        return organizerRepository.save(organizer);
    }

    // PUT > http://127.0.0.1:8080/api/organizers/{id}
    @PutMapping("/{id}")
    public Organizer updateOrganizer(@PathVariable int id, @RequestBody Organizer organizer) {
        if (organizerRepository.existsById(id)) {
            organizer.setId(id);
            return organizerRepository.save(organizer);
        }
        return null;
    }

    // DELETE > http://127.0.0.1:8080/api/organizers/{id}
    @DeleteMapping("/{id}")
    public void deleteOrganizer(@PathVariable int id) {
        organizerRepository.deleteById(id);
    }
}
