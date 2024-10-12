import axios from "axios";
const getLatLngFromAddress = async (address) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        );

        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { lat, lng };
        } else {
            throw new Error('Không tìm thấy địa chỉ.');
        }
    } catch (error) {
        throw new Error('Lỗi khi lấy dữ liệu vị trí.');
    }
};

export default getLatLngFromAddress;