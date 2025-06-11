package com.atlantbh.cinemaapp.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler extends RuntimeException {

    @ExceptionHandler(ValidationErrorException.class)
    public ResponseEntity<?> handleFieldValidationException(final ValidationErrorException exception) {
        return ResponseEntity.badRequest().body(exception.getFieldErrors());
    }
}
