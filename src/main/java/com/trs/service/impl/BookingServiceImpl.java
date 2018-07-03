package com.trs.service.impl;

import com.trs.service.BookingService;
import com.trs.service.UserService;
import com.trs.domain.Booking;
import com.trs.domain.Hotel;
import com.trs.domain.HotelTable;
import com.trs.domain.User;
import com.trs.repository.BookingRepository;
import com.trs.repository.HotelRepository;
import com.trs.repository.HotelTableRepository;
import com.trs.repository.UserRepository;
import com.trs.security.SecurityUtils;
import com.trs.service.dto.BookingDTO;
import com.trs.service.mapper.BookingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Booking.
 */
@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final Logger log = LoggerFactory.getLogger(BookingServiceImpl.class);

    private final BookingRepository bookingRepository;
    private final HotelTableRepository hotelTableRepository;
    private final BookingMapper bookingMapper;
    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;

    public BookingServiceImpl(BookingRepository bookingRepository, BookingMapper bookingMapper,
     HotelTableRepository hotelTableRepository, UserRepository userRepository,HotelRepository hotelRepository) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
        this.hotelTableRepository = hotelTableRepository;
        this.userRepository = userRepository;
        this.hotelRepository = hotelRepository;
    }

    /**
     * Save a booking.
     *
     * @param bookingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BookingDTO save(BookingDTO bookingDTO) {
        log.debug("Request to save Booking : {}", bookingDTO);
        Booking booking = bookingMapper.toEntity(bookingDTO);
        HotelTable hotelTable = hotelTableRepository.getOne(bookingDTO.getHotelTableId());
        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        booking.setUser(user);
        //hotelTable.setStatus("Unavailable");
        hotelTable = hotelTableRepository.save(hotelTable);
        booking = bookingRepository.save(booking);
        return bookingMapper.toDto(booking);
    }

    /**
     * Get all the bookings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BookingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Bookings");
        return bookingRepository.findAll(pageable)
            .map(bookingMapper::toDto);
    }


    /**
     * Get one booking by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BookingDTO> findOne(Long id) {
        log.debug("Request to get Booking : {}", id);
        return bookingRepository.findById(id)
            .map(bookingMapper::toDto);
    }

    /**
     * Delete the booking by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Booking : {}", id);
        bookingRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BookingDTO> findAll(Pageable pageable, Long hotelId) {
        log.debug("Request to get all Bookings by Hotel");
        Hotel hotel = hotelRepository.getOne(hotelId);
        return bookingRepository.findAllByHotel(pageable, hotel)
            .map(bookingMapper::toDto);
    }
}
