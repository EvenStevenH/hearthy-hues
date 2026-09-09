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

    @GetMapping
    public List<Organizer> getAllOrganizers() {
        return organizerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Organizer getOrganizerById(@PathVariable int id) {
        return organizerRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Organizer createOrganizer(@RequestBody Organizer organizer) {
        return organizerRepository.save(organizer);
    }

    @PutMapping("/{id}")
    public Organizer updateOrganizer(@PathVariable int id, @RequestBody Organizer organizer) {
        if (organizerRepository.existsById(id)) {
            return organizerRepository.save(organizer);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteOrganizer(@PathVariable int id) {
        organizerRepository.deleteById(id);
    }
}
