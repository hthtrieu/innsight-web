import React from 'react'
import styles from './CardItem.module.scss'
const CardItem = ({ item, imgWidth, imgHeight }) => {
    return (
        <div
            className={`group relative overflow-hidden bg-white shadow-2xl ${styles['card']}`}
        >
            <div className="h-60">
                <img
                    src={item.img}
                    alt="City"
                    className="h-full w-full object-cover object-center "
                />
            </div>
            <div className="h-1/2 p-4 pl-3 pr-3 ">
                <h3 className="mb-2 text-base font-semibold">
                    <div className="font-bold text-black">
                        {item.name}
                    </div>
                </h3>
                <p className={styles['text-describe']}>{item.describe}</p>
                <div className="flex flex-row justify-between items-center text-xs mt-2">
                    <div className={`w-fit h-fit flex items-center`}>
                        <span className={` p-1 rounded-full ${styles['yellow']}`}>{item.score}/10</span>
                        {item.score > 9 ? " Xuất xắc" : ' Tuyệt vời'}
                    </div>

                    <p>{item.reviews} đánh giá</p>
                </div>
            </div>
        </div>


    )
}
CardItem.defaultProps = {
    imgWidth: 100,
    imgHeight: 24,
}
export default CardItem
