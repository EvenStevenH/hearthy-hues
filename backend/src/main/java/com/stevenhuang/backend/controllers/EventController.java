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

    // GET all > http://127.0.0.1:8080/api/events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // GET one > http://127.0.0.1:8080/api/events/{id}
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable int id) {
        return eventRepository.findById(id).orElse(null);
    }

    // POST > http://127.0.0.1:8080/api/events
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    // PUT > http://127.0.0.1:8080/api/events/{id}
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable int id, @RequestBody Event event) {
        if (eventRepository.existsById(id)) {
            event.setId(id);
            return eventRepository.save(event);
        }
        return null;
    }

    // DELETE > http://127.0.0.1:8080/api/events/{id}
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable int id) {
        eventRepository.deleteById(id);
    }
}
