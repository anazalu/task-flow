package com.example.todo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping
    public Todo saveTodo(@Validated @RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @PutMapping
    public Todo putTodo(@Validated @RequestBody Todo todo) {
        Optional<Todo> todoOld = todoRepository.findById(todo.getId());
        if (todoOld.isPresent()) {
            todoOld.get().setReminder(todo.getReminder());
            return todoRepository.save(todoOld.get());
        }
        return new Todo();
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) throws Exception {
        Optional<Todo> todoOld = todoRepository.findById(id);
        if (todoOld.isPresent()) {
            todoRepository.delete(todoOld.get());
        } else {
            throw new Exception("id: " + id);
        }
    }
}
