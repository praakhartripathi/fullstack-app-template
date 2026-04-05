package com.template.app.modules.user.service;

import com.template.app.modules.user.dto.UserRequestDTO;
import com.template.app.modules.user.dto.UserResponseDTO;

import java.util.List;

/**
 * Service interface for User business logic.
 * Follows Interface Segregation — implementation is in UserServiceImpl.
 */
public interface UserService {

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO getUserById(Long id);

    UserResponseDTO createUser(UserRequestDTO request);

    UserResponseDTO updateUser(Long id, UserRequestDTO request);

    void deleteUser(Long id);
}
