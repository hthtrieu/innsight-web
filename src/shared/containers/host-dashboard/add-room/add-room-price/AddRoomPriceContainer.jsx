import React, { useState } from "react";
import styles from "./AddRoomPriceContainer.module.scss";
import { Link, useNavigate } from "react-router-dom";
import IcChevronLeft from "../../../../components/icons/home-icons/IcChevronLeft";
import { Box, Stack, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { addRoomTypePrice } from "../../../../../redux/host/slice";

const AddRoomPriceContainer = () => {
  const commission=10;
  const [price, setPrice] =useState (0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch({
      type: addRoomTypePrice,
      payload: price,  
    });

    navigate("/host/add-room-image");
  };
  return (
    <div className={` ${styles["add-room-price"]}`}>
      <div className={`${styles["content"]}`}>
        <div className="title">
          <h2 className="text-3xl overflow-hidden">
            Thiết lập giá mỗi đêm cho phòng này
          </h2>
        </div>
        <Box sx={{ border: "1px solid #dadada", width: "50%", padding:3, marginY: 3, borderRadius: 2,}}>
          <h2 className="text-xl pb-2">
            Quý vị muốn thu bao nhiêu tiền mỗi đêm?
          </h2>
          <Stack paddingX={3} paddingBottom={4}>
            <h3 className="pb-2">Số tiền khách trả</h3>
            <TextField
              id="price-room"
              type="number"
              helperText="Bao gồm các loại thuế, phí và hoa hồng"
              onChange={(e)=>{setPrice(e.target.value)}}
            />
          </Stack>
          <Stack paddingX={8} spacing={2}>
            <h3 className="text-gray-400 py-1">10% hoa hồng cho InnSight</h3>
            <Stack direction="row" spacing={1}>
              <CheckIcon />
              <h3 className="text-gray-400 py-1">
                Trợ giúp 24/7 bằng ngôn ngữ của Quý vị
              </h3>
            </Stack>
            <Stack direction="row" spacing={1}>
              <CheckIcon />
              <h3 className="text-gray-400 py-1">
                Tiết kiệm thời gian với đặt phòng được xác nhận tự động
              </h3>
            </Stack>
            <hr width="100%" />
            <h3>Doanh thu của Quý vị (bao gồm thuế): {price*(100-commission)/100} VND </h3>
          </Stack>
        </Box>
        <div className={`w-1/2 flex pt-7`}>
          <Link to="/host/add-room">
            <button className={`border-2 px-6 py-3 mr-2 flex-none rounded-md`}>
              <IcChevronLeft />
            </button>
          </Link>
          <button
            className={`border-2  font-bold text-2xl flex-grow rounded-md text-center  ${styles["btn-continue"]}`}
            onClick={onSubmit}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPriceContainer;
