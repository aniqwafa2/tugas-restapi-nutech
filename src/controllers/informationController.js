const Banner = require("../models/Banner");
const Service = require("../models/Service");

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.getAllBanners();
    const filteredDatas = banners.map(
      ({ banner_name, banner_image, description }) => ({
        banner_name,
        banner_image,
        description,
      })
    );

    res.json({
      status: 0,
      message: "sukses",
      data: filteredDatas,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan!", error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.getAllServices();
    const filteredDatas = services.map(
      ({ service_code, service_name, service_icon, service_tariff }) => ({
        service_code,
        service_name,
        service_icon,
        service_tariff,
      })
    );

    res.json({
      status: 0,
      message: "sukses",
      data: filteredDatas,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan!", error: error.message });
  }
};
