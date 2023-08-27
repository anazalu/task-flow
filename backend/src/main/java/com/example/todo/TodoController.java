package com.example.todo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todo")
public class TodoController {
 
    @Autowired
    private TodoRepository todoRepository;
        
    @GetMapping
    public List<Todo> findAllTodos() {
        return (List<Todo>) todoRepository.findAll();
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<Todo> findTodoById(@PathVariable(value = "id") long id) {
        Optional<Todo> todo = todoRepository.findById(id);
 
        if(todo.isPresent()) {
            return ResponseEntity.ok().body(todo.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
 
    @PostMapping
    public Todo saveTodo(@Validated @RequestBody Todo todo) {
        return todoRepository.save(todo);
    }
}
