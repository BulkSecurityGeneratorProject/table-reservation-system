package com.trs.service;

import com.trs.domain.Cuisine;
import com.trs.domain.Hotel;
import com.trs.domain.enumeration.FoodType;
import com.trs.service.dto.CuisineDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Cuisine.
 */
public interface CuisineService {

    /**
     * Save a cuisine.
     *
     * @param cuisineDTO the entity to save
     * @return the persisted entity
     */
    CuisineDTO save(CuisineDTO cuisineDTO);

    /**
     * Get all the cuisines.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CuisineDTO> findAll(Pageable pageable);


    /**
     * Get the "id" cuisine.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CuisineDTO> findOne(Long id);

    /**
     * Delete the "id" cuisine.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    // custom method

    List<CuisineDTO> findAllByHotel(Long hotelId);
    Page<CuisineDTO> findAllByHotel(Pageable pageable,Long hotelId);
    Optional<CuisineDTO> findOneByTypeAndHotel(FoodType foodType, Long hotelId);
    
}
