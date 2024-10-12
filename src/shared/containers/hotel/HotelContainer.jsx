import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import styles from './HotelContainer.module.scss'
import Room from '../../components/room-list/Room';
import PlaceIcon from '@mui/icons-material/Place';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import StarIcon from '@mui/icons-material/Star';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import getLatLngFromAddress from "../../../api/ApiGoogleMap"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ViewImage from '../../components/room-list/ViewImage';
//slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import "./SlickSlider.scss"
//
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,

};
function Map({ lat, lng }) {
    return <GoogleMap zoom={15} center={{ lat: lat, lng: lng }} mapContainerClassName={styles['map-container']}>
        <Marker position={{ lat: lat, lng: lng }} />
    </GoogleMap>
}
const HotelContainer = () => {
    const { hotel } = useSelector(state => state.Home) || {}
    const { cart } = useSelector(state => state.Booking);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [showButton, setShowButton] = React.useState(false);
    const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

    const [image, setImage] = React.useState(false);
    const handleOpenViewImage = () => {
        setImage(true);
    };
    const handleCloseViewImage = () => {
        setImage(false);
    };

    useEffect(() => {
        if (Object.keys(cart?.rooms).length !== 0) {
            setShowButton(true);
        }
    }, [cart])
    const handleOpen = async () => {
        setOpen(true);
        try {
            const result = await getLatLngFromAddress(hotel?.address);
            setLatLng(result);
        } catch (error) {
            console.error(error);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })
    const handleStartFillInfo = () => {
        
    }
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <div>
            <Header />
            <div className={styles['content']}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {isLoaded && <Map lat={latLng.lat} lng={latLng.lng} />}
                    </Box>
                </Modal>
                <div className={styles['content-block']}>
                    <div className={`grid grid-cols-12 `}>
                        <div className='col-span-10'>
                            <div className={styles['title']}>
                                {hotel?.hotelName}
                            </div>
                            <div>
                                {Array.from({ length: hotel?.hotelType || 0 }).map((_, index) => (
                                    <StarIcon key={index} className='text-yellow-400' />
                                ))}
                            </div>
                            <p className='text-sm font-semibold'>
                                <PlaceIcon />
                                <span>{hotel?.address}</span>
                                <button className='text-xs text-cyan-500 ml-2' onClick={handleOpen}>Xem bản đồ</button>
                            </p>
                        </div>
                        <div className='col-span-2'>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='font-semibold mb-2' >Giá phòng mỗi đêm từ</div>
                                <div className='text-lg text-red-500 font-semibold mb-2'>{hotel?.minPrice.toLocaleString('vi-VN')} VNĐ</div>
                            </div>

                        </div>
                    </div>
                </div>

                <ViewImage
                  open={image}
                  onClose={handleCloseViewImage}
                  hotel={hotel}
                />

                <button className={styles['content-block']} onClick={() => handleOpenViewImage()}>
                    <div className='grid grid-cols-10 gap-2'>
                        <div className='col-span-6'>{hotel?.hotelImages?.[0] && <img src={hotel.hotelImages[0]} alt="" />}</div>
                        <div className='col-span-2'>
                            <div className='grid grid-rows-3 gap-2'>
                                <div className='row-span-1'>{hotel?.hotelImages?.[1] && <img src={hotel.hotelImages[1]} alt="" />}</div>
                                <div className='row-span-1'>{hotel?.hotelImages?.[2] && <img src={hotel.hotelImages[2]} alt="" />}</div>
                                <div className='row-span-1'>{hotel?.hotelImages?.[3] && <img src={hotel.hotelImages[3]} alt="" />}</div>
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <div className='grid grid-rows-3 gap-2'>
                                <div className='row-span-1'>{hotel?.hotelImages?.[4] && <img src={hotel.hotelImages[4]} alt="" />}</div>
                                <div className='row-span-1'>{hotel?.hotelImages?.[5] && <img src={hotel.hotelImages[5]} alt="" />}</div>
                                <div className='row-span-1'>{hotel?.hotelImages?.[6] && <img src={hotel.hotelImages[6]} alt="" />}</div>
                            </div>
                        </div>
                    </div>
                </button>

                <div className={`${styles['content-bg-gray']} ${styles['content-block']} w-full`}>
                    <div className={styles['block-title']}>Giới thiệu nơi cư trú</div>
                    <div >{hotel?.description}</div>
                </div>
                <div className={`w-full`}>
                    <div className='grid grid-cols-12 gap-2'>
                        <div className={`col-span-6 ${styles['content-bg-gray']} ${styles['content-block']}`}>
                            <div className={styles['block-title']}>Tiện ích</div>
                            <div className='flex flex-wrap w-full'>
                                {Array.from({ length: hotel?.hotelAmenities?.length || 0 })?.map((_, index) => (
                                    <div key={index} className='w-1/2'>
                                        <ChevronRightIcon className='pb-1 text-base text-green-500'/> 
                                        {hotel?.hotelAmenities[index]}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`col-span-6 ${styles['content-bg-gray']} ${styles['content-block']}`}>
                            <div className={styles['block-title']}>Khách nói gì về kì nghỉ của họ</div>
                            <div className={styles['slider-list']}>
                                <Slider {...settings}>
                                    {hotel?.reviews?.map((review, index) => (
                                        <div className={styles['slider-wrapper']}>
                                            <div key={index} className={`shadow-md bg-white ${styles['slider-item']}`}>
                                                <div >
                                                    <span><EmojiEmotionsIcon style={{ color: "#C9CC2C" }} className='text-base mb-1' /> <span className='text-base text-blue-600'>{review?.rate}</span></span>
                                                    <span className='text-base text-gray-400'>/10</span>
                                                </div>
                                                <div>
                                                    {review?.review}
                                                </div>
                                            </div>
                                        </div>

                                    ))}

                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles['content-bg-gray']} ${styles['content-block']} w-full`}>
                    {hotel?.roomList?.map((room, index) => (
                        <Room key={index} room={room} />
                    ))}
                </div>
                <div className={`${styles['content-block']} w-full flex justify-end`}>
                    {showButton &&
                        <Button variant='contained mb-2' className={styles['button-orange']}
                            onClick={() => { navigate('/book/fill-info') }}
                        >
                            Tiến hành đặt phòng
                        </Button>
                    }
                </div>

                <div className={`${styles['content-bg-gray']} ${styles['content-block']} w-full`}>
                    <div className={styles['block-title']}>Quy tắc chung</div>
                    <div className='flex flex-nowrap w-full m-4 '>
                        <div className='w-1/6 whitespace-wrap font-bold text-base '>{`Nhận phòng`}</div>
                        <div className='w-5/6 font-bold'>{`Từ ${hotel?.checkIn}`}</div>
                    </div>
                    <div className='flex flex-nowrap w-full m-4 '>
                        <div className='w-1/6 whitespace-wrap font-bold text-base '>{`Trả phòng`}</div>
                        <div className='w-5/6 font-bold'>{`Từ ${hotel?.checkOut}`}</div>
                    </div>
                    <div className='flex flex-nowrap w-full m-4 '>
                        <div className='w-1/6 whitespace-wrap font-bold text-base '>{`Các quy tắc khác`}</div>
                    </div>
                    {hotel?.rules?.map((rule, index) => (
                        <div key={index} className='flex flex-nowrap w-full m-4 '>
                            <div className='w-1/6 whitespace-wrap font-bold text-base '></div>
                            <div className='w-5/6 font-bold'>{rule}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
HotelContainer.defaultProps = {
    hotel: {
        id: null,
        hotelName: "",
        address: "",
        checkIn: "",
        checkOut: "",
        minPrice: null,
        description: '',
        hotelImages: [

        ],
        hotelAmenities: [

        ],
        extraServices: [

        ],
        roomList: [

        ],
        reviews: [

        ],
        rules: [

        ]
    }
}
export default HotelContainer;