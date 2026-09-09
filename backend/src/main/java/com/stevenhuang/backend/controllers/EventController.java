package com.stevenhuang.backend.controllers;

import com.stevenhuang.backend.models.Event;
import com.stevenhuang.backend.repositories.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable int id) {
        return eventRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable int id, @RequestBody Event event) {
        if (eventRepository.existsById(id)) {
            return eventRepository.save(event);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable int id) {
        eventRepository.deleteById(id);
    }
}
